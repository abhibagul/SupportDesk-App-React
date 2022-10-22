import React, { Component } from 'react'
import LoginForm from '../../Components/LoginForm/loginForm'
import './loginPage.css'

export default class loginPage extends Component {


    render() {
        return (
            <div className='container'>
                <div className='login-box'>
                    <div className='row'>

                        <div className="col-sm-12 col-md-5 col-lg-4 col-md-auto">
                            <div className="card">
                                <div className="card-body">
                                    <LoginForm />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
