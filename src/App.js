import React,{useEffect,useState} from 'react'
import './App.css';
import Login from './Login'
import Player from './Player'
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from "./DataLayer";
const spotify=new SpotifyWebApi();
function App() {
  const [{user,token},dispatach]= useDataLayerValue()
  useEffect(() => {
    const hash=getTokenFromUrl();
    window.location.hash="";
const _token=hash.access_token;
if(_token){
  dispatach({
    type:'SET_TOKEN',
    token:_token
  })
  spotify.setAccessToken(_token);
  spotify.getMe().then(user=>{
    dispatach({
      type:'SET_USER',
      user:user
    });
  });
  spotify.getUserPlaylists().then((playlists)=>{
    dispatach({
      type:'SET_PLAYLISTS',
      playlists:playlists
    })
  })
  spotify.getPlaylist("37i9dQZEVXcIJazRV9ISoM").then((response) =>{
    dispatach({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
})
}

}, [])

  return (
    <div className="App">
      {
        token?(<Player spotify={spotify}/>):(<Login/>)
      }
     
    </div>
  );
}

export default App;
