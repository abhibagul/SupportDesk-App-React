import React, { Component } from 'react'
import RegisterForm from '../../Components/RegisterForm/registerForm'
export default class registerPage extends Component {
    render() {
        return (
            <div className='container'>
                <div className='login-box'>
                    <div className='row'>

                        <div className="col-sm-12 col-md-5 col-lg-4 col-md-auto">
                            <div className="card">
                                <div className="card-body">
                                    <RegisterForm />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
