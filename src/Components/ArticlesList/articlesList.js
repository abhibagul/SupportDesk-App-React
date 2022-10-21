import React, { Component } from 'react'

import ArticleItem from '../ArticleItem/articleItem';

export class articlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [{
        postName: "What is lorem ipsum",
        postUri: "what-is-lorem-ipsum",
        postSnippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        postBy: "Lorem Community",
        postRatings: "5",
        questionDate: "2022-09-17",
        postCommets: [],
      }, {
        postName: "What is lorem ipsum again?",
        postUri: "what-is-lorem-ipsum-again",
        postSnippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        postBy: "Lorem Community",
        postRatings: "2",
        questionDate: "2022-10-12",
        postCommets: [],
      }]
    }

  }



  render() {
    return (
      <>

        {this.state.posts && this.state.posts.map((e) => {
          return (
            <ArticleItem article={e} key={e.postUri} />
          )
        })}

      </>
    )
  }

}

export default articlesList
