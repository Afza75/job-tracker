function Dashboard({applications}){
    const total=applications.length;
    const interviewed = applications.filter(app=>app.status==="Interview").length;
    const offers = applications.filter(app=>app.status==="Offer").length;
    const rejected = applications.filter(app=>app.status==="Rejected").length;
    const responseRate = total === 0 ? 0 : Math.round(
    (applications.filter(app =>
      app.status === 'Interview' ||
      app.status === 'Offer' ||
      app.status === 'Rejected'
    ).length / total) * 100
  );

    return(
        <div className="dashboard">

            <div className="stat-card">
                <h3>{total}</h3>
                <p>Total Applications</p>
            </div>

            <div className="stat-card">
                <h3>{interviewed}</h3>
                <p>Interviewed</p>
            </div>

            <div className="stat-card">
                <h3>{offers}</h3>
                <p>Offers</p>
            </div>

            <div className="stat-card">
                <h3>{rejected}</h3>
                <p>Rejected</p>
            </div>

            <div className="stat-card">
                <h3>{responseRate}%</h3>
                <p>Response Rate</p>
            </div>

        </div>
    );
}

export default Dashboard;