import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    gHUsers: []
  }
  componentDidMount() {
    let users = [];
    //get my info from api
    axios.get('https://api.github.com/users/vincesanders')
      .then(res => {
        const gHUser = {
          name: res.data.name,
          image: res.data.avatar_url,
          username: res.data.login,
          location: res.data.location,
          profilePage: res.data.html_url,
          followers: res.data.followers,
          following: res.data.following,
          bio: res.data.bio
        }
        users = [...users, gHUser];
        this.setState({gHUsers: [gHUser]});
        return res.data.followers_url;
      }).then(res => {
        //get the login for my followers
        axios.get(res).then(res => {
          return res.data.map(follower => follower.login); //returns an array of my followers' logins
        }).then(res => {
          res.forEach(login => {
            //get the info for all my followers from the api
            axios.get(`https://api.github.com/users/${login}`)
            .then(res => {
              const gHUser = {
                name: res.data.name,
                image: res.data.avatar_url,
                username: res.data.login,
                location: res.data.location,
                profilePage: res.data.html_url,
                followers: res.data.followers,
                following: res.data.following,
                bio: res.data.bio
              }
              users = [...users, gHUser];
              this.setState({gHUsers: users});
            }).catch(err => {
              console.log("followers' user info request error: ", err);
            });
          })
        }).catch(err => {
          console.log('followers_url axios request error: ', err);
        });
      }).catch(err => {
        console.log(err);
      });
  }
  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="header">
          <img src={require("./assets/lambdalogo.png")} alt="Lambda Logo"/>
          <p>❤️'s</p>
          <img src={require("./assets/githublogo.png")} alt="GitHub Logo" />
        </div>
      </div>
    );
  }
}

export default App;
