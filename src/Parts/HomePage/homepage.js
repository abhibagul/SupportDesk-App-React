import React, { Component } from 'react'
import Header from './Header/header'
import ArticleList from '../../Components/ArticlesList/articlesList'
import ArticleSelectType from '../../Components/ArticleTypeSelector/articleTypeSelector';

import {
    Routes,
    Route,
    Link
} from "react-router-dom";

export default class homepage extends Component {

    constructor(props) {
        super(props);

        this.currentStage = "";


    }

    componentDidMount() {
        if (window.location.href.indexOf('/latest') > -1) {
            this.currentStage = "Latest";
        } else {
            this.currentStage = "Popular";
        }
    }

    changeStage = (stage) => {
        this.currentStage = stage;
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
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <Link className={this.currentStage === "Latest" ? "nav-link active text-primary" : "nav-link text-secondary"} aria-current="page" onClick={() => this.changeStage("Latest")} to="/questions/latest">Latest</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={this.currentStage === "Popular" ? "nav-link active text-primary" : "nav-link text-secondary"} onClick={() => this.changeStage("Popular")} to="/questions/popular">Popular</Link>
                    </li>
                </ul>
                <Routes>
                    <Route path="/" exact element={<ArticleList orderType="Latest" />} />
                    <Route path="/latest" element={<ArticleList orderType="Latest" />} />
                    <Route path="popular" element={<ArticleList orderType="Popular" />} />
                    <Route path="*" element={<ArticleSelectType />} />
                </Routes>

            </div>
        )
    }
}
