import React, { Component } from "react";
import "./App.css";

const defaultStyle = {
  color: "#fff"
};

const fakeServerData = {
  user: {
    name: "Antonijo",
    playlists: [
      {
        name: "Favorites",
        songs: [
          { name: "Let it be", duration: 192 },
          { name: "Angel", duration: 210 },
          { name: "Suspicious Minds", duration: 220 }
        ]
      },
      {
        name: "Weekly",
        songs: [
          { name: "Hallelujah", duration: 232 },
          { name: "All I want for Christmas is you", duration: 196 },
          { name: "Christmas Song", duration: 222 }
        ]
      },
      {
        name: "Monthly",
        songs: [
          { name: "Hallelujah", duration: 232 },
          { name: "All I want for Christmas is you", duration: 196 },
          { name: "Christmas Song", duration: 222 }
        ]
      },
      {
        name: "Top",
        songs: [
          { name: "Let it be", duration: 192 },
          { name: "Angel", duration: 210 },
          { name: "Suspicious Minds", duration: 220 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    const allSongs = this.props.playlists.reduce(
      (songs, eachPlaylist) => songs.concat(eachPlaylist.songs),
      []
    );
    const totalDuration = allSongs.reduce((sum, eachSong) => sum + eachSong.duration, 0);
    return (
      <div style={{ ...defaultStyle, width: "40%", display: "inline-block" }}>
        <h2>{Math.round(totalDuration / 60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)} />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    const playlist = this.props.playlist;
    return (
      <div style={{ ...defaultStyle, display: "inline-block", width: "25%" }}>
        <img />
        <h3>{playlist.name}</h3>
        <ul>{playlist.songs.map(song => <li>{song.name}</li>)}</ul>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ""
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData
      });
    }, 1000);
  }
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ? (
          <div>
            <h1 style={{ ...defaultStyle, "font-size": "54px" }}>
              {this.state.serverData.user.name}'s Playlist
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user.playlists} />
            <Filter onTextChange={text => this.setState({ filterString: text })} />
            {this.state.serverData.user.playlists
              .filter(playlist => playlist.name.toLowerCase().includes(this.state.filterString))
              .map(playlist => <Playlist playlist={playlist} />)}
          </div>
        ) : (
          <h1 style={defaultStyle}>Loading...</h1>
        )}
      </div>
    );
  }
}

export default App;
