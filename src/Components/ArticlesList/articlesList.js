import React, { Component } from 'react'

export class articlesList extends Component {

  render() {
    return (
      <div className='card'>
        <div className='card-body'>
          This are  {this.props.orderType} questions.
        </div>
      </div>
    )
  }

}

export default articlesList
