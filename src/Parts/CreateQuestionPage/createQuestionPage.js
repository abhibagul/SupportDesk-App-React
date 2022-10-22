import React, { Component } from 'react'
import './createQuestionPage.css'
import MdEditor from '../../Components/Editor/mdEditor';
import axios from 'axios';

export default class createQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorCode: "",
            questionName: this.props.questionName || "",
            buttonName: "Post question",
            isPosting: { display: "none" },
            isWorking: false
        }

    }

    makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    postQuestion = async () => {

        //first check everything!
        let edtor;
        if (this.state.editorCode.length < 1) {
            edtor = localStorage.getItem('createQues');
        } else {
            edtor = this.editorCode;
        }

        if (!edtor || edtor.length < 50) {
            alert("Please describe the question in at least 50 characters.")
            return;
        }

        if (this.state.questionName.length < 10) {
            alert("Question name can not be less than 10 characters")
            return
        }

        if (this.state.isWorking) {
            alert('Article creation is already in progress..');
            return;
        }

        this.setState({ ...this.state, isWorking: true, isPosting: { display: "inline-block" }, buttonName: "Saving" })

        //generate post uri from name
        let postURI = this.state.questionName;
        postURI = postURI.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        postURI = postURI.substr(0, 50);
        postURI = postURI + '-' + this.makeid(10);


        //date formatting
        let dt = new Date();
        let mt = (dt.getUTCMonth()) + 1;
        dt = dt.getFullYear() + '-' + mt + '-' + dt.getUTCDate();


        await axios.post(`/API/question/create-new`, {
            postName: this.state.questionName,
            postUri: postURI,
            postContent: edtor,
            postBy: "Abhishek",
            postRatings: 5,
            questionDate: dt,
            postCommets: []
        }).then(res => {
            if (res.status === 200) {
                console.log(`/question/${res.data.postUri}`)
                this.props.navigation(`/question/${res.data.postUri}`);
            }
        }).catch(err => {

            alert("Something went wrong! " + err.message);
            this.setState({ ...this.state, isWorking: false, isPosting: { display: "none" }, buttonName: "Post question" })
            return;
        })

        setTimeout(() => {
            this.setState({ ...this.state, isWorking: false, isPosting: { display: "none" }, buttonName: "Post question" })

        }, 2000)
    }

    modParentCode = (val) => {
        this.setState({ ...this.state, editorCode: val })
    }

    render() {

        return (
            <div className="container">
                <div className='card create-question'>
                    <div className="card-body">
                        {/* <h5>Ask question,</h5> */}

                        <div className='form-group'>
                            <label htmlFor='quesName'>Question: </label>
                            <input type="text" id="quesName" className="form-control questionName" name="questionName" onChange={(e) => { this.setState({ ...this.state, questionName: e.target.value }) }} value={this.state.questionName} placeholder="Question Title"></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='quesDesc'>Description: </label>
                            <div className='card'>

                                <MdEditor updateParentCode={this.modParentCode} id="quesDesc" identifier="createQues" widthStyle="col-sm-12 col-md-6" mdCode={this.state.editorCode} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6 button-clear'>
                                <button className='btn btn-primary' onClick={this.postQuestion}>
                                    <div className="spinner-border spinner-border-sm text-light mr-3" style={this.state.isPosting} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    {this.state.buttonName}
                                </button>
                            </div>
                            <div className='col-sm-6'>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

