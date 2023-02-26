import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = this.pageSize;
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
        <BrowserRouter>
        <NavBar/>
          <LoadingBar
          height={3}
          color='#f11946'
          progress={this.state.progress}
          />
          
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="home" category="general"/>}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="business" category="business"/>}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="entertainment" category="entertainment"/>}/>
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="general" category="general"/>}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="health" category="health"/>}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="science" category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="sports" category="sports"/>}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" key="technology" category="technology"/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

