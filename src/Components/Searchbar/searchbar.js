import React, { Component } from 'react'

export default class searchbar extends Component {

  constructor(props) {
    super(props);
    this.searchTerm = '';
  }

  render() {
    return (
      <div className='text-center'>
        <div className="input-group mb-3">
          <input type="text" className="form-control" value={this.props.searchTerm} onChange={(e) => this.props.searchTerm = e.target.value} placeholder={this.props.serachPlaceholder} aria-label={this.props.serachPlaceholder} aria-describedby={this.props.serachPlaceholder} />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2">{this.props.searchButtonText}</button>
        </div>
      </div>
    )
  }
}
