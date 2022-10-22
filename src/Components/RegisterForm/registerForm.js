import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";
import './registerForm.css';
export default class registerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailAddr: '',
            password: '',
            confPassword: '',
            buttonText: 'Register',
            isProgress: { display: "none" },
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ ...this.state, isProgress: { display: "inline-block" }, buttonText: 'Please wait' })

        setTimeout(() => {
            this.setState({ ...this.state, isProgress: { display: "none" }, buttonText: 'Register' })

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
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={(e) => this.setState({ ...this.state, confPassword: e.target.value })} id="exampleInputPassword2" />
                </div>
                <button type="submit" className="btn btn-primary">
                    <div className="spinner-border spinner-border-sm text-light mr-3" style={this.state.isProgress} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    {this.state.buttonText}
                </button>
                &nbsp; &nbsp;
                <Link className='btn btn-outline-secondary' to="/login">Try Login</Link>
            </form>
        )
    }
}
