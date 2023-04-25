import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Login from './Components//Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Allgames from './Components/Allgames/Allgames.jsx';
import GameDetails from './Components/GameDetails/GameDetails.jsx';
import Home from './Components/Home/Home.jsx';
import Layout from './Components/Layout/Layout.jsx';
import Pc from './Components/Pc/Pc.jsx';
import Browser from './Components/Browser/Browser.jsx';
import ReleaseDate from './Components/ReleaseDate/ReleaseDate.jsx';
import Popularity from './Components/Popularity/Popularity.jsx';
import Relevance from './Components/Relevance/Relevance.jsx';
import Alphabetical from './Components/Alphabetical/Alphabetical.jsx';
import Racing from './Components/Racing/Racing.jsx';
import Action from './Components/Action/Action.jsx';
import ActionRpg from './Components/ActionRpg/ActionRpg.jsx';
import Shooter from './Components/Shooter/Shooter.jsx';
import Social from './Components/Social/Social.jsx';
import Sports from './Components/Sports/Sports.jsx';
import OpenWorld from './Components/OpenWorld/OpenWorld.jsx';
import Zombie from './Components/Zombie/Zombie.jsx';
import Fantasy from './Components/Fantasy/Fantasy.jsx';
import Flight from './Components/Flight/Flight.jsx';
import Battle from './Components/Battle/Battle.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import axios from 'axios';


function App() {

  const [games, setgames] = useState([]);
  
  async function getPlatformGames(platform) {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: {
        platform: `${platform}`,
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    
    let response = await axios.request(options).catch( (error)=>{
      console.log(error);
    })

    setgames(response.data)
    console.log(response.data);
    };

  async function getSortedGames(releaseDate) {
      const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: {
          'sort-by': `${releaseDate}`
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
      
      let response = await axios.request(options).catch( (error)=>{
        console.log(error);
      })
  
      setgames(response.data)
      console.log(response.data);
    };

  async function getCategoryGames(category) {
      const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        params: {
          category : `${category}`
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
      
      let response = await axios.request(options).catch( (error)=>{
        console.log(error);
      })
  
      setgames(response.data)
      console.log(response.data);
    };

  const [userData, setuserData] = useState(null);

  function saveUserData(){
    let encodeToken = localStorage.getItem('userToken');
    let decodeToken = jwtDecode(encodeToken);
    setuserData(decodeToken);
  }

  function logOut() {
    setuserData(null);
    localStorage.removeItem("userToken");
    <Navigate to='/login'/>;
  }

  let routers = createBrowserRouter([
    {path : '' , element: <Layout logOut={logOut} userData={userData} setuserData={setuserData} /> , children :[
      {index : true , element : <Login/>},
      {path : 'home' , element : <ProtectedRoute> <Home/> </ProtectedRoute>},
      {path : 'login' , element : <Login saveUserData={saveUserData}/>},
      {path : 'register' , element : <Register/>},
      {path : 'allgames' , element : <ProtectedRoute> <Allgames/> </ProtectedRoute>},
      {path : 'platforms/pc' , element : <ProtectedRoute> <Pc getGames={getPlatformGames} games={games}/> </ProtectedRoute>},
      {path : 'platforms/browser' , element : <ProtectedRoute> <Browser getGames={getPlatformGames} games={games}/> </ProtectedRoute>},
      {path : 'sorted/release-date' , element : <ProtectedRoute> <ReleaseDate getGames={getSortedGames} games={games}/> </ProtectedRoute>},
      {path : 'sorted/popularity' , element : <ProtectedRoute> <Popularity getGames={getSortedGames} games={games}/> </ProtectedRoute>},
      {path : 'sorted/alphabetical' , element : <ProtectedRoute> <Alphabetical getGames={getSortedGames} games={games}/> </ProtectedRoute>},
      {path : 'sorted/relevance' , element : <ProtectedRoute> <Relevance getGames={getSortedGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/racing' , element : <ProtectedRoute> <Racing getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/sports' , element : <ProtectedRoute> <Sports getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/social' , element : <ProtectedRoute> <Social getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/shooter' , element : <ProtectedRoute> <Shooter getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/openWorld' , element : <ProtectedRoute> <OpenWorld getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/zombie' , element : <ProtectedRoute> <Zombie getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/fantasy' , element : <ProtectedRoute> <Fantasy getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/actionRpg' , element : <ProtectedRoute> <ActionRpg getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/action' , element : <ProtectedRoute> <Action getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/flight' , element : <ProtectedRoute> <Flight getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'categories/battle' , element : <ProtectedRoute> <Battle getGames={getCategoryGames} games={games}/> </ProtectedRoute>},
      {path : 'gamedetails/:id' , element : <ProtectedRoute> <GameDetails/> </ProtectedRoute>},
      {path : '*' , element : <NotFound/>}
    ]}
  ])

  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
