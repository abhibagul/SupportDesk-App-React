import React, { Component } from 'react'
import ArticleItem from '../ArticleItem/articleItem';
import axios from 'axios';
import {
  Link
} from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';

export class articlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loadMore: [],
      typeSort: this.props.orderType || "Latest",
      pageNum: 1,
      nextPage: 2,
      prevPage: null,
      perPage: 1,
      needsUpdate: true,
      isInfinite: false,
      hasScroll: true
    }



  }

  componentDidMount = () => {
    // this.setState({ ...this.state, loadMore: [], pageNum: 1, nextPage: 2, typeSort: this.props.orderType })
    // console.log('updated?')
    // this.setState({ ...this.state, typeSort: this.props.orderType })
    // const loadArticles = async () => {
    //   let response = await axios.get(`/API/articles/latest/${this.state.pageNum}/${this.state.perPage}/${this.props.orderType}`);
    //   const posts = response.data;
    //   this.setState({ ...this.state, posts })
    // }
    // loadArticles();
  }

  componentDidUpdate = () => {

    const loadArticles = async () => {
      console.log('isLooped?')
      this.setState({ ...this.state, loadMore: [], pageNum: 1, nextPage: 2, typeSort: this.props.orderType, hasScroll: true })
      // this.setState({ ...this.state, typeSort: this.props.orderType })
      // let response = await axios.get(`/API/articles/latest/${this.state.pageNum}/${this.state.perPage}/${this.props.orderType}`);
      // const posts = response.data;
      // this.setState({ ...this.state, posts })
    }
    if (this.state.typeSort !== this.props.orderType) {

      loadArticles();
    }


  }


  loadFuncAsync = async () => {

    if (this.state.isInfinite) {
      return;
    }

    if (this.state.pageNum === this.state.nextPage) {

      return;
    }

    this.setState({ ...this.state, typeSort: this.props.orderType, isInfinite: true })

    console.log('requested at:', `/API/articles/${this.props.orderType}/${this.state.pageNum}/${this.state.perPage}/`)

    let response = await axios.get(`/API/articles/${this.props.orderType}/${this.state.pageNum}/${this.state.perPage}/`);
    const loadMore = response.data;
    if (loadMore.length > 0) {
      this.setState({ ...this.state, loadMore: [...this.state.loadMore, ...loadMore], pageNum: this.state.nextPage, nextPage: (this.state.nextPage + 1), isInfinite: false })
      // console.log(this.state);
    } else {
      //set current page same as next page
      this.setState({ ...this.state, pageNum: this.state.nextPage, nextPage: (this.state.nextPage), isInfinite: false, hasScroll: false })
      console.log(response);
    }



    // console.log(this.state)

  }




  render() {
    return (
      <>

        {(this.props.orderType == "Latest" || this.props.orderType == "Popular") && <ul className="nav nav-tabs justify-center">
          <li className="nav-item">
            <Link className={(this.props.orderType == "Latest") ? "nav-link active text-primary" : "nav-link text-secondary"} to="/questions/latest">Latest</Link>
          </li>
          <li className="nav-item">
            <Link className={(this.props.orderType == "Popular") ? "nav-link active text-primary" : "nav-link text-secondary"} to="/questions/popular">Popular</Link>
          </li>
        </ul>}

        {this.state.posts && this.state.posts.map((e) => {
          return (
            <ArticleItem article={e} key={e.postUri} />
          )
        })}


        {/* // TODO: INFINITE  SCROLL         */}
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadFuncAsync}
          hasMore={this.state.hasScroll}
          loader={<div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>}
          useWindow={true}
        >
          {this.state.loadMore && this.state.loadMore.map((e, i) => {
            return (
              <ArticleItem article={e} key={i} />
            )
          })}
        </InfiniteScroll>

      </>
    )
  }

}

export default articlesList
