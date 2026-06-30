import { useState } from "react";

function AddApplicationForm({onAdd}){
    const [company,setCompany]=useState('');
    const [role,setRole]=useState('');
    const [status,setStatus]=useState('Applied');
    const [isOpen,setIsOpen]=useState(false);
    const [msg,setMsg]=useState('');

    function handleSubmit(){
        if(!company || !role) 
            {
                setMsg("Please fill in all fields");
                return;
            }

        const newApp={
            id:Date.now(),
            company:company,
            role:role,
            status:status
        }

        onAdd(newApp);
        setCompany('');
        setRole('');
        setStatus('Applied');
        setIsOpen(false);

    }
    return(
        <div className="form-container">
            <button className="toggle-form-btn" onClick={() => setIsOpen(true)}>
                {isOpen ? "Cancel" : "+ Add New Application"}
            </button>

            {isOpen && (
                <div className="form-box">
                    <input
                        className="form-input"
                        placeholder="Company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <input
                        className="form-input"
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <select
                        className="form-input"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offer</option>
                        <option>Rejected</option>
                    </select>
                    {msg && (
                        <p className="error-msg">{msg}</p>
                    )}
                    <button className="submit-btn" onClick={handleSubmit}>
                        Add Application
                    </button>
                </div>
            )}
        </div>
    );
} 


export default AddApplicationForm;