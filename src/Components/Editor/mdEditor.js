import React, { Component } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { githubLight } from '@uiw/codemirror-theme-github';
import Markdown from 'markdown-to-jsx';
import './mdEditor.css'
export default class mdEditor extends Component {
    constructor(props) {
        super(props);
        let ht = (this.props.styleProp) ? this.props.styleProp.height : "auto"
        this.state = {
            mdCode: this.props.mdCode || '#This is heading \n1. List 1 \n2. List 2',
            mdPrev: '',
            style: this.props.styleProp || {},
            height: ht,
            identifier: this.props.identifier.toString() || "createQues",
            widthStyle: this.props.widthStyle || "col-md-12",
        }



    }


    componentDidMount = () => {
        if (localStorage.getItem(this.state.identifier)) {
            this.setState({ ...this.state, mdCode: localStorage.getItem(this.state.identifier) })
        }


    }


    render() {
        return (
            <div className='custom_editor'>
                <div className='row' >
                    <div className={this.state.widthStyle}>
                        <div className='card'>
                            <CodeMirror style={this.state.style} height={this.state.height} className='mdCode' value={this.state.mdCode} theme={githubLight} onChange={(value) => {
                                let regex = /(<([^>]+)>)/ig;
                                const result = value.replace(regex, '');
                                this.setState({ ...this.state, mdCode: result });
                                localStorage.setItem(this.state.identifier, result.toString());
                                this.props.updateParentCode(value);
                            }} extensions={[loadLanguage('tsx')]} />

                        </div>
                    </div>
                    <div className={this.state.widthStyle}>
                        <div className='md-parsed mdPrev' style={{ ...this.state.style, border: ' 1px solid #ccc' }}>
                            <div className='card-body ' >
                                <Markdown>{this.state.mdCode}</Markdown>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
