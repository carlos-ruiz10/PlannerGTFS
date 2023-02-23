import React from 'react'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="https://cdn-icons-png.flaticon.com/512/635/635705.png" alt="Bus" width="30" height="24" />
                </a>
                <a className="navbar-brand" href="#">Planner GTFS</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Docs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Autores</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <button className="btn btn-outline-success" type="submit">Above</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar