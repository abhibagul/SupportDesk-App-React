import React, { Component } from 'react'
import SearchBar from '../../../Components/Searchbar/searchbar'
import './header.css';
export default class header extends Component {
  constructor(props) {
    super(props);
    this.searchButtonText = "Search"
    this.serachPlaceholder = "Where are you stucked at?"
  }

  render() {
    return (
      <div className='card header'>
        <div className="card-body text-center">
          <h1 className='header-title'> Welcome to <mark>{this.props.appName}</mark></h1>
          <SearchBar serachPlaceholder={this.serachPlaceholder} searchButtonText={this.searchButtonText} />
        </div>
      </div>
    )
  }
}
