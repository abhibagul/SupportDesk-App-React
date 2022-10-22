import React, { Component } from 'react'
import Homepage from './Parts/HomePage/homepage';
import NavigationMenu from './Parts/Commons/Navigation/navigationMenu';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import CreateQuestionPageWithNavigate from './Parts/CreateQuestionPage/createQuestionPageWithNavigate';
import Footer from './Parts/Commons/Footer/footer';
import QuestionPageParamConv from './Parts/QuestionPage/questionPageParamConv';
import LoginPage from './Parts/LoginPage/loginPage';
import RegisterPage from './Parts/RegisterPage/registerPage';
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.appName = 'SupportDesk';

  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          {/**
           * Navigation menu
           *   */}
          <NavigationMenu appName={this.appName} />

          {/**
           * Page Contents
           *   */}
          <Routes>
            <Route path="/" exact element={<Homepage appName={this.appName} />} />
            <Route path="/login" element={<LoginPage appName={this.appName} />} />
            <Route path="/register" element={<RegisterPage appName={this.appName} />} />
            <Route path='/questions/*' element={<Homepage appName={this.appName} />} />
            <Route path="/question/:questionId" element={<QuestionPageParamConv />} />
            <Route path="/create-question" element={<CreateQuestionPageWithNavigate appName={this.appName} />} />
          </Routes>

          {/**
           * Footer
           *   */}
          <Footer appName={this.appName} />

        </div>
      </BrowserRouter>
    );
  }
}

