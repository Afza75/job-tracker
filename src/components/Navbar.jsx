function Navbar({onLogout}){
    const name=localStorage.getItem('name')
    return(
        <nav className="navbar">
            <h2 className="navbar-title">Job Tracker</h2>
            <div className="navbar-user">
                <span>{name}</span>
                <button className="logout-btn" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </nav>

    );

}

export default Navbar;