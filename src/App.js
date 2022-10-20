import React, { Component } from 'react'
import Homepage from './Parts/HomePage/homepage';
import NavigationMenu from './Parts/Commons/Navigation/navigationMenu';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CreateQuestionPage from './Parts/CreateQuestionPage/createQuestionPage';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.appName = 'SupportDesk';

  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavigationMenu appName={this.appName} />
          <Routes>
            <Route path="/" exact element={<Homepage appName={this.appName} />} />
            <Route path='/questions/*' element={<Homepage appName={this.appName} />} />
            <Route path="/create-question" element={<CreateQuestionPage appName={this.appName} />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

