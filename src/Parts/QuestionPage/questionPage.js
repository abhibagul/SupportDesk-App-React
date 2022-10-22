import React, { Component } from 'react'
import './questionPage.css'
import Markdown from 'markdown-to-jsx';
import MdEditor from '../../Components/Editor/mdEditor';
import LoginForm from '../../Components/LoginForm/loginForm';
import axios from 'axios';

export default class questionPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            questionId: this.props.params.questionId || null,
            buttonName: "Post answer",
            posting: false,
            isPosting: { display: "none" },
            article: {
                postName: "",
                postUri: "",
                postContent: "",
                postBy: "",
                postRatings: "",
                questionDate: "",
                postCommets: []
            },
            replyDetails: {
                replyValue: ""
            }

        }

    }

    componentDidMount() {

        const getPostData = async () => {
            //axios
            const response = await axios.get(`/API/question/${this.state.questionId}`);
            const article = response.data;
            this.setState({ ...this.state, article })
        }
        getPostData();
    }

    componentDidUpdate() {

    }

    calculateTimeDifference(postedTime) {
        let currentTime = new Date();

        if (currentTime.getFullYear() !== postedTime.getFullYear()) {
            return (currentTime.getFullYear() - postedTime.getFullYear()) + ' year(s) ago';
        }

        if (currentTime.getUTCMonth() !== postedTime.getUTCMonth()) {
            return (currentTime.getMonth() - postedTime.getMonth()) + ' month(s) ago';
        }

        if (currentTime.getUTCDate() !== postedTime.getUTCDate()) {

            return (currentTime.getUTCDate() - postedTime.getUTCDate()) + ' day(s) ago';

        }

        return " on Today";
    }

    generateRating(rating, type) {
        let score = "";
        for (let i = 0; i < rating; i++) {
            score += type
        }
        return score
    }

    postQuestion = async () => {


        //disable posting
        if (this.state.posting) {
            return;
        }

        //if empty check if storage has any of it
        if (this.state.replyDetails.replyValue.length < 1) {
            if (localStorage.getItem(this.state.questionId)) {
                this.setState({ ...this.state, replyDetails: { ...this.state.replyDetails, replyValue: localStorage.getItem(this.state.questionId) } })
            } else {
                alert("Unable to save empty message.");
                return;
            }
        }


        this.setState({ ...this.state, posting: true, isPosting: { display: "inline-block" }, buttonName: "Saving" })

        //date formatting
        let dt = new Date();
        let mt = (dt.getUTCMonth()) + 1;
        dt = dt.getFullYear() + '-' + mt + '-' + dt.getUTCDate();


        //secondary empty check
        let comment;
        if (this.state.replyDetails.replyValue.length < 1) {
            comment = localStorage.getItem(this.state.questionId);
        } else {
            comment = this.state.replyDetails.replyValue;
        }

        //check if it is still empty
        if (!comment) {
            this.setState({ ...this.state, article, posting: false, isPosting: { display: "none" }, buttonName: "Post answer" })
            alert("Unable to save empty message.");
            return;
        }

        //Todo: update to the real user name
        const response = await axios.post(`/API/articles/respond/${this.state.questionId}`, {
            postedBy: 'Abhishek',
            comment: comment,
            date: dt
        }).catch(err => {

            alert("Something went wrong! " + err.message);
            this.setState({ ...this.state, posting: false, isPosting: { display: "none" }, buttonName: "Post answer" })
            return;
        })

        const article = response.data;

        this.setState({ ...this.state, article, posting: false, isPosting: { display: "none" }, buttonName: "Posted" })


        setTimeout(() => {
            if (!this.state.posting) {
                this.setState({ ...this.state, buttonName: "Post answer" })
            }
        }, 2000)


    }

    modParentCode = (val) => {
        this.setState({ ...this.state, replyDetails: { ...this.state.replyDetails, replyValue: val } })
    }

    render() {

        return (
            <div className='container'>
                <div className='row'>


                    <main className='post_main col-md-8'>
                        <div className='card question-body'>
                            <div className='card-body'>
                                <span className='no-padding'>
                                    <span className='rating'>
                                        <span className="rated stars">{this.generateRating(this.state.article.postRatings, "★")}</span><span className='unrated stars'>{this.generateRating(5 - this.state.article.postRatings, "☆")}</span>
                                    </span>
                                </span>
                                <h2 className="card-title"> {this.state.article.postName}</h2>

                                <p className='no-padding'>

                                    <span className='article-meta'>Posted by <b>{this.state.article.postBy}</b>,  <i>- {this.calculateTimeDifference(new Date(this.state.article.questionDate))} </i></span>
                                </p>
                                <hr />
                                <div className='post-content-question'>
                                    <Markdown>{this.state.article.postContent}</Markdown>
                                </div>

                                {(this.state.article.postCommets.length > 0) && <div className='comment-thread'>
                                    <hr />


                                    { /**
                                     * 
                                     * TODO Comment listing
                                     * 
                                     * */
                                        this.state.article.postCommets.map((e, i) => {
                                            return (
                                                <div className='response' key={i}>
                                                    <div className='card'>
                                                        <div className='card-body'>
                                                            <p className='no-padding'>
                                                                <span className='article-meta'><b>{e.postedBy}</b> said, <i>- {this.calculateTimeDifference(new Date(e.date))} </i></span>
                                                            </p>
                                                            <hr />
                                                            <div className='card-body markup-little-mod'>
                                                                <Markdown >{e.comment}</Markdown>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>}


                                <div className='comment-input'>
                                    <h5>Write your answer, </h5>
                                    <MdEditor updateParentCode={this.modParentCode} identifier={this.state.questionId} widthStyle="col-sm-12" styleProp={{ height: "300px", overflowY: "auto", minHeight: "300px" }} mdCode={"Add your response here "} />
                                    {/* {<!-- Add button-->} */}
                                    <button className='btn btn-primary btn-addpost' onClick={this.postQuestion}>
                                        <div className="spinner-border spinner-border-sm text-light mr-3" style={this.state.isPosting} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        {this.state.buttonName}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <aside className='col-md-4'>
                        <div className='card  question-body keep-sticky'>
                            {/*Todo*/}
                            <div className="card-body">
                                <LoginForm />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        )
    }
}

