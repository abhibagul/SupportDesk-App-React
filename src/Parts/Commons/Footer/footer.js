import React, { Component } from 'react'
import './footer.css'
export default class footer extends Component {

    getYear() {
        return (new Date().getFullYear())
    }

    render() {
        return (
            <footer className='footer text-center'>
                <hr />
                (C) {this.getYear()} Copytight {this.props.appName}, All Rights Reserved
            </footer>
        )
    }
}
