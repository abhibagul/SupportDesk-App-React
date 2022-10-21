import React, { Component } from 'react'
import './createQuestionPage.css'
import MdEditor from '../../Components/Editor/mdEditor';

export default class createQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorCode: "",
            questionName: this.props.questionName || "",
            buttonName: "Post question",
            isPosting: { display: "none" }
        }

    }

    postQuestion = () => {
        this.setState({ ...this.state, isPosting: { display: "inline-block" }, buttonName: "Saving" })

        setTimeout(() => {
            this.setState({ ...this.state, isPosting: { display: "none" }, buttonName: "Post question" })

        }, 2000)
    }

    render() {

        return (
            <div className="container">
                <div className='card create-question'>
                    <div className="card-body">
                        {/* <h5>Ask question,</h5> */}

                        <div className='form-group'>
                            <input type="text" className="form-control questionName" name="questionName" onChange={(e) => { this.setState({ ...this.state, questionName: e.target.value }) }} value={this.state.questionName} placeholder="Question Title"></input>
                        </div>
                        <div className='form-group'>
                            <div className='card'>
                                <MdEditor identifier="createQues" mdCode={this.state.editorCode} />
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

