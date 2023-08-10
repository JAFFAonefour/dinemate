import React from 'react';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/login';
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand ml-3" href="/home">
                    DINE MATE
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-3">
                        {user ? (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-user mr-2"></i>
                                    {user.name}
                                </a>
                                <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="navbarDropdownMenuLink"
                                >
                                    <a className="dropdown-item" href="/profile">
                                        Profile
                                    </a>
                                    
                                    <a className="dropdown-item" href="#" onClick={logout}>
                                        Logout
                                    </a>
                                </div>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/register">
                                        Register
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">
                                        Login
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
