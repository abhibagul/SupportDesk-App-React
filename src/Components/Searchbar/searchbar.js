import React, { Component } from 'react'

export default class searchbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.searchTerm || '',
      serachPlaceholder: this.props.serachPlaceholder || 'Search here',
      searchButtonText: this.props.searchButtonText || 'Search',
    }
  }

  render() {
    return (
      <div className='text-center searchbar'>
        <div className="input-group">
          <input type="text" className="form-control form-control-sm" value={this.state.searchTerm} onChange={(e) => this.setState({ ...this.state, searchTerm: e.target.value })} placeholder={this.state.serachPlaceholder} aria-label={this.state.serachPlaceholder} aria-describedby={this.state.serachPlaceholder} />
          <button className="btn btn-outline-secondary  btn-light " type="button" id="button-addon2">{this.state.searchButtonText}</button>
        </div>
      </div>
    )
  }
}
