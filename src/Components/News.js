import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  articles = [

  ]

  constructor() {
    super();
    // console.log("Hello I am a constructor from news components")
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,

    }

  }

  async componentDidMount() {
    console.log("cnd");
    let url = "https://newsapi.org/v2/top-headlines?country=In&apiKey=e6e356601ec24f2d9f6ebc85602e9234&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalarticles:parsedData.totalarticles })

  }

  handlePreviousclick = async () => {
    console.log("previous")
    let url = `https://newsapi.org/v2/top-headlines?country=In&apiKey=e6e356601ec24f2d9f6ebc85602e9234&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    // this.setState({ articles: parsedData.articles })
    this.setState({
      page:this.state.page - 1,
      articles: parsedData.articles



    })



  }
   handlenextClick =  async () => {
    console.log("next")
    let url = `https://newsapi.org/v2/top-headlines?country=In&apiKey=e6e356601ec24f2d9f6ebc85602e9234&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    // this.setState({ articles: parsedData.articles })
    this.setState({
      page:this.state.page + 1,
      articles: parsedData.articles



    })
  }
  
  render() {
    return (
      <div>
        <div className="container my-3">
          <h2>NewsMonkey - Top Headlines of India</h2>
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} descreption={element.description} Imageurl={element.urlToImage} newsurl={element.url} />
              </div>

            })}
          </div>
          <div className="d-flex justify-content-between my-3">
            <button disabled = {this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}> 	&larr; Previous</button>
            <button   type="button" className="btn btn-dark" onClick={this.handlenextClick}> Next  &rarr; </button>
          </div>

        </div>

      </div>
    );
  }
}

export default News;
