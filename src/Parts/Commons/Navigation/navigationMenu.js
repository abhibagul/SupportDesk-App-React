import React, { Component } from 'react'
import {
    Link,
    NavLink
} from "react-router-dom";
import SearchBar from '../../../Components/Searchbar/searchbar';
import './NavigationMenu.css'
export default class navigationMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchButtonText: "Search",
            serachPlaceholder: "Ask me..",
            buttonText: 'Logout',
            isProgress: { display: "none" },
        }
    }

    userLoggingOut = (e) => {
        e.preventDefault();
        this.setState({ ...this.state, isProgress: { display: "inline-block" }, buttonText: 'Please wait' })

        setTimeout(() => {
            this.setState({ ...this.state, isProgress: { display: "none" }, buttonText: 'Logout' })

        }, 2000)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{this.props.appName}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">


                        <SearchBar serachPlaceholder={this.state.serachPlaceholder} searchButtonText={this.state.searchButtonText} />

                        <div className="d-flex" role="search">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink activeClassName="active" className="nav-link" to="/create-question">Ask Question</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Account
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li><a className="dropdown-item" href="#">My Questions</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <a className="dropdown-item" onClick={this.userLoggingOut} >
                                                <div className="spinner-border spinner-border-sm text-primary mr-3" style={this.state.isProgress} role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                {this.state.buttonText}
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        )
    }
}
