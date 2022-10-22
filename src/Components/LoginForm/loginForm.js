import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";
import './loginForm.css'
export default class loginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddr: '',
            password: '',
            buttonText: 'Login',
            isProgress: { display: "none" },
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ ...this.state, isProgress: { display: "inline-block" }, buttonText: "Please wait" })

        setTimeout(() => {
            this.setState({ ...this.state, isProgress: { display: "none" }, buttonText: "Login" })

        }, 2000)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={(e) => this.setState({ ...this.state, emailAddr: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={(e) => this.setState({ ...this.state, password: e.target.value })} id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">
                    <div className="spinner-border spinner-border-sm text-light mr-3" style={this.state.isProgress} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    {this.state.buttonText}
                </button>
                &nbsp;
                <Link className='btn btn-outline-secondary' to="/register">Create Account</Link>
            </form>
        )
    }
}
