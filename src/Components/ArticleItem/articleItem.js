import React, { Component } from 'react'
import {
    Link
} from "react-router-dom";
import './articleItem.css';
// import Markdown from 'markdown-to-jsx';

export default class articleItem extends Component {

    calculateTimeDifference(postedTime) {
        let currentTime = new Date();

        if (currentTime.getFullYear() !== postedTime.getFullYear()) {
            return (currentTime.getFullYear() - postedTime.getFullYear()) + ' year(s) ago';
        }

        if (currentTime.getMonth() !== postedTime.getMonth()) {
            return (currentTime.getMonth() - postedTime.getMonth()) + ' month(s) ago';
        }

        if (currentTime.getUTCDate() !== postedTime.getUTCDate()) {
            return (currentTime.getUTCDate() - postedTime.getUTCDate()) + ' day(s) ago';
        }

        return " on Today "
    }

    generateRating(rating, type) {
        let score = "";
        for (let i = 0; i < rating; i++) {
            score += type
        }
        return score
    }

    render() {
        return (
            <article className='card article-item' >
                <Link to={`/question/${this.props.article.postUri}`}>
                    <div className='card-body'>

                        <h5 className="card-title"> {this.props.article.postName}</h5>

                        {this.props.article.postSnippet && <p className="card-text">{this.props.article.postSnippet}</p>}

                        {
                            this.props.article.postContent && <p className="card-text">{this.props.article.postContent.substr(0, 500)}</p>
                        }

                        <p className='no-padding'>
                            <span className='rating'>
                                <span className="rated stars">{this.generateRating(this.props.article.postRatings, "★")}</span><span className='unrated stars'>{this.generateRating(5 - this.props.article.postRatings, "☆")}</span>
                            </span>
                            <br />
                            <span className='article-meta'>Posted by <b>{this.props.article.postBy}</b>,  <i>- <time dateTime={this.props.article.questionDate}>{this.calculateTimeDifference(new Date(this.props.article.questionDate))}</time> </i></span>
                        </p>

                    </div>
                </Link>
            </article >
        )
    }
}
