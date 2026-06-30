function ApplicationCard({app,onDelete,onStatusChange}){
    return (
        <div className="application-card">
            <h3 className="company-name">{app.company}</h3>
            <p className="role">{app.role}</p>

            <select className={`status-badge status-${app.status.toLowerCase()}`}
            value={app.status} 
            onChange={(e)=>onStatusChange(app._id,e.target.value)}>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
            </select>

            <button className="delete-btn" onClick={()=>onDelete(app._id)}>
                Delete
            </button>
        </div>

    );
}

function ApplicationList({applications,onDelete,onStatusChange}){
    console.log(applications);
    if (applications.length === 0) {
        return (
        <div className="empty-state">
            <p>No applications yet. Add your first one above!</p>
        </div>
        );
   }


    return(
           <div className="application-list">
                <h2 className="list-title">My Applications</h2>
                {applications.map((app)=>(
                        <ApplicationCard 
                            key={app._id}
                            app={app}
                            // company={app.company}
                            // role={app.role}
                            // status={app.status}
                            // id={app.id}
                            onDelete={onDelete}
                            onStatusChange={onStatusChange}
                        />
                ))}
            </div>
    );
}



export default ApplicationList;