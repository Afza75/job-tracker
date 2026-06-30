// // temporary in-memory data (we replace this with MongoDB on Day 5)
// let applications = [
//   { id: 1, company: "Google", role: "SWE Intern", status: "Applied" },
//   { id: 2, company: "Meta", role: "Frontend Intern", status: "Interview" },
//   { id: 3, company: "Arbisoft", role: "Jr Developer", status: "Rejected" },
// ];

// // GET /applications — return all applications
// app.get('/applications', (req, res) => {
//   res.json(applications);
// });

// // POST /applications — add a new application
// app.post('/applications', (req, res) => {
//   const { company, role, status } = req.body; // data sent from frontend

//   const newApp = {
//     id: Date.now(),   // temporary unique id
//     company,
//     role,
//     status,
//   };

//   applications.push(newApp);        // add to our temporary array
//   res.status(201).json(newApp);     // send back the created application
// });

// // DELETE /applications/:id — delete one by id
// app.delete('/applications/:id', (req, res) => {
//   const id = Number(req.params.id); // :id comes from the URL as a string, convert to number
//   applications = applications.filter(app => app.id !== id);
//   res.json({ message: "Deleted successfully" });
// });

// // PUT /applications/:id — update status of one application
// app.put('/applications/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const { status } = req.body;

//   applications = applications.map(app =>
//     app.id === id ? { ...app, status } : app
//   );

//   res.json({ message: "Updated successfully" });
// });

// // start the server on port 5000
// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });



require('dotenv').config();         // loads .env file variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Application = require('./models/Application');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));


// ─── AUTH ROUTES (no token needed) ───────────────────────────


// POST /auth/signup — create a new user
app.post('/auth/signup',async(req,res)=>{

  try{
    const {name,email,password}=req.body;
    

    const existing = await User.findOne({email});

    // check if email already exists
    if(existing){
      return res.status(400).json({message:'User already exists'});
    }

    const hashedPassword= await bcrypt.hash(password,10);


    // save user with hashed password
    const user= await User.create({
      name,
      email,
      password:hashedPassword
    });

    const token = jwt.sign(
      { userId: user._id },           // payload — what we store in the token
      process.env.JWT_SECRET,          // secret key to sign it
      { expiresIn: '7d' }             // token expires in 7 days
    );

    res.status(201).json({ token, name: user.name });
  }
  catch(err){
    res.status(500).json({ message: "Server error" });
  }

})



// POST /auth/login — authenticate user and return token
app.post('/auth/login',async (req,res)=>{
  try{
    const {email,password}=req.body;

    const user= await User.findOne({email});

    // find user by email
     if(!user){
      res.status(400).json({message:'Invalid credentials'});
     }

     // compare provided password with hashed password in DB
     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
      res.status(400).json({message:'Invalid credentials'});
     }

     // generate JWT token
     const token=jwt.sign(
      {userId:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
     );

     res.json({token,name:user.name});  
  }
  catch(err){
    res.status(500).json({ message: "Server error" });
  }
})


// ─── APPLICATION ROUTES (token required) ─────────────────────
// authMiddleware runs first on every route below


// GET /applications — fetch all from database
app.get('/applications', authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.userId });  // only fetch applications for the logged-in user
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// POST /applications — save new application to database
app.post('/applications', authMiddleware, async (req, res) => {
  try {
    const { company, role, status } = req.body;
    const newApp = await Application.create({ 
      company, 
      role,
      status,
      userId: req.userId  // associate application with the logged-in user
    });
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



// DELETE /applications/:id — delete from database by id
app.delete('/applications/:id', authMiddleware, async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// PUT /applications/:id — update status in database
app.put('/applications/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }   // return the updated document, not the old one
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));