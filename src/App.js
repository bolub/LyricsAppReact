import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    data:'',
    Artist:'',
    export:'',
    spinner: false
  }

  onSubmitHandler = (event)=>{
    event.preventDefault();
    let text = this.refs.text.value;
    let Artist = this.refs.Artist.value;
    this.setState({data:text, Artist: Artist, spinner: true})
  } 

  componentDidUpdate(){
    axios.get("https://api.lyrics.ovh/v1/" + this.state.Artist + "/" + this.state.data)
      .then(response => {
        this.setState({ export: response.data.lyrics, spinner: false });
      } )
      .catch(e =>{
        this.setState({ export: "Please try again", spinner: false });
      })
    ;
  }

  showLyricsHandler = ()=>{
    const doesShow = this.state.showLyrics;
    this.setState({showLyrics:!doesShow})
  }

  render() {
    let showSpinner = null; 

    if(this.state.showSpinner){
      showSpinner = (
        <div className="spinner mt-5"></div>
      )
    }
    
    return (
      <div className="App">
        <h1>Lyrics App</h1>

        <form onSubmit={this.onSubmitHandler} className="form">
          <input type="text" placeholder="Song name" className="one py-3" ref="text" />
          <input type="text" placeholder="Artist name" className="two py-3" ref="Artist" />
          <button type="submit" className="three py-3 btn">Search<i className="fal fa-search"></i></button>
        </form>

        <div className="card my-5">
          {showSpinner}
          <p>
            {this.state.export}
          </p>
        </div> 
      </div>
    );
  }
}

export default App;
