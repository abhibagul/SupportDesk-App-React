import React, { Component } from 'react'
import './questionPage.css'
import Markdown from 'markdown-to-jsx';
import MdEditor from '../../Components/Editor/mdEditor';

export default class questionPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questionId: this.props.params.questionId || null,
            article: {
                postName: "What is lorem ipsum",
                postUri: "what-is-lorem-ipsum",
                postContent: "This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\n\n\
\n\n\
In the project directory, you can run:\n\n\
\n\n\
### `npm start`\n\n\
\n\n\
Runs the app in the development mode.\n\n\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\n\n\
\n\n\
The page will reload when you make changes.\n\n\
You may also see any lint errors in the console.\n\n\
\n\n\
### `npm test`\n\n\
\n\n\
Launches the test runner in the interactive watch mode.\n\n\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.\n\n\
\n\n\
### `npm run build`\n\n\
\n\n\
Builds the app for production to the `build` folder.\n\n\
It correctly bundles React in production mode and optimizes the build for the best performance.\n\n\
\n\n\
The build is minified and the filenames include the hashes.\n\n\
Your app is ready to be deployed!",
                postBy: "Lorem Community",
                postRatings: "5",
                questionDate: "2022-09-17",
                postCommets: [],
            }

        }

    }

    calculateTimeDifference(postedTime) {
        let currentTime = new Date();

        if (currentTime.getFullYear() !== postedTime.getFullYear()) {
            return (currentTime.getFullYear() - postedTime.getFullYear()) + ' year(s)';
        }

        if (currentTime.getMonth() !== postedTime.getMonth()) {
            return (currentTime.getMonth() - postedTime.getMonth()) + ' month(s)';
        }

        if (currentTime.getUTCDate() !== postedTime.getUTCDate()) {
            return (currentTime.getUTCDate() - postedTime.getUTCDate()) + ' day(s)';
        }
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
            <div className='container'>
                <div className='post_header'>
                    <div className='card question-body'>
                        <div className='card-body'>
                            <span className='no-padding'>
                                <span className='rating'>
                                    <span className="rated stars">{this.generateRating(this.state.article.postRatings, "★")}</span><span className='unrated stars'>{this.generateRating(5 - this.state.article.postRatings, "☆")}</span>
                                </span>
                            </span>
                            <h2 className="card-title"> {this.state.article.postName}</h2>

                            <p className='no-padding'>

                                <span className='article-meta'>Posted by <b>{this.state.article.postBy}</b>,  <i>- {this.calculateTimeDifference(new Date(this.state.article.questionDate))} ago</i></span>
                            </p>
                            <hr />
                            <div className='post-content-question'>
                                <Markdown>{this.state.article.postContent}</Markdown>
                            </div>

                            {(this.state.article.postCommets.length > 0) && <div className='comment-thread'>
                                <hr />

                            </div>}
                            <hr />

                            <div className='comment-input'>
                                <MdEditor identifier={this.state.questionId} styleProp={{ height: "300px", overflowY: "auto", minHeight: "300px" }} mdCode={"Add your response here "} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

