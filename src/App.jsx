
  // const [applications,setapplications]=useState([
  //   {id:1,company:'Google',role:'Software Engineer',status:'Applied'},
  //   {id:2,company:'Facebook',role:'Data Scientist',status:'Interview'},
  //   {id:3,company:'Amazon',role:'Product Manager',status:'Offer'},
  //   {id:4,company:'Microsoft',role:'UX Designer',status:'Rejected'}
  // ]);

  // function addApplication(newApp){
  //   setapplications([...applications,newApp]);
  // }

  // function deleteApplication(id){
  //   setapplications(applications.filter(app=>
  //     app.id !== id
  //   ))
  // }

  // function updateApplication(id,newStatus){
  //   setapplications(applications.map(app=>
  //     app.id===id ?{...app,status:newStatus}:app
  //   ))
  // }

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ApplicationList from './components/ApplicationList';
import AddApplicationForm from './components/AddApplicationForm';
import AuthPage from './components/AuthPage';
import FilterBar from './components/FilterBar';
import './App.css';

const API = 'http://localhost:5000';

function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [activeFilter, SetActiveFilter] = useState('All')

  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token]); // re-runs when token changes — so after login it fetches immediately

  async function fetchApplications() {
    try {
      const response = await fetch(`${API}/applications`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  }

  async function addApplication(newApp) {
    try {
      const response = await fetch(`${API}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newApp)
      });
      const data = await response.json();
      setApplications([...applications, data]);
    } catch (error) {
      console.error('Error adding application:', error);
    }
  }

  async function deleteApplication(id) {
    try {
      await fetch(`${API}/applications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setApplications(applications.filter(app => app._id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  }

  async function updateApplication(id, newStatus) {
    try {
      const response = await fetch(`${API}/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      setApplications(applications.map(app =>
        app._id === id ? { ...app, status: data.status } : app
      ));
    } catch (error) {
      console.error('Error updating application:', error);
    }
  }

  function handleLogin(newToken, name) {
    setToken(newToken);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setToken('');
  }

  if (!token) {
    return (
      <div className="app-container">
        <AuthPage onLogin={handleLogin} />
      </div>
    );
  }

  function filter(filter){
    SetActiveFilter(filter)
  }

  const activeApplications= activeFilter==="All" ? applications : applications.filter(app=>app.status===activeFilter)

  return (
    <div className="app-container">
      <Navbar onLogout={handleLogout} />
      <main className="main-content">
        <Dashboard applications={applications}/>
        <FilterBar  applyFilter={filter} activeFilter={activeFilter}/>
        <AddApplicationForm onAdd={addApplication} />
        {loading
          ? <p className="loading-text">Loading applications...</p>
          : <ApplicationList
              applications={activeApplications}
              onDelete={deleteApplication}
              onStatusChange={updateApplication}
            />
        }
      </main>
    </div>
  );
}

export default App;