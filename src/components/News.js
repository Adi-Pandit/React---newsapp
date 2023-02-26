import React, { Component } from 'react';
import NewsItem from './NewsItem';
import image from './hero-img7.png';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static deaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles : [],
      loading: false,
      page: 1,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b8c87377319b4bff9a04d2eabbea9cf0&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url); 
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles, totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({page: this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page + 1});
    this.updateNews();
  }
  

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: '30px 0px'}}>NewsMonkey - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner /> }
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : image} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
        })}
        </div>
        <div class="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark"> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
