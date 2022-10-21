import React, { Component } from 'react'
import Header from './Header/header'
import ArticleList from '../../Components/ArticlesList/articlesList'
import './homepage.css'
import {
    Routes,
    Route,
    NavLink
} from "react-router-dom";
import QuestionPageParamConv from '../QuestionPage/questionPageParamConv';
export default class homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }


    render() {
        return (
            <div className='container'>

                { /* Header */}
                <Header appName={this.props.appName} />

                {
                    /**
                     * Recent questions with router dom
                     *  @Latest , @Popular
                     */
                }
                <ul className="nav nav-tabs justify-center">
                    <li className="nav-item">
                        <NavLink className={"nav-link text-secondary"} activeClassName="nav-link active text-primary" to="/questions/latest">Latest</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className={"nav-link text-secondary"} activeClassName="nav-link active text-primary" to="/questions/popular">Popular</NavLink>
                    </li>
                </ul>
                <Routes>
                    <Route path="/" exact element={<ArticleList orderType="Latest" />} />
                    <Route path="/latest" element={<ArticleList orderType="Latest" />} />
                    <Route path="/popular" element={<ArticleList orderType="Popular" />} />
                    {/* <Route path="*" element={<SearchResults />} />//to do */}
                </Routes>

            </div >
        )
    }
}
