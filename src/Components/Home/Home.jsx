import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Home() {

  const [games, setgames] = useState([]);

  async function getPopularGames () {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: {
        tag: '3d.mmorpg.fantasy.pvp',
        platform: 'pc'
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

    let randomGame = games[Math.floor(Math.random() * games.length)];

    setgames(response.data.slice(randomGame , 3))
    console.log(response.data);
    };

  useEffect ( () => {

    getPopularGames();

  } , []);

  return <>
    <div className="container-fluid home">
      <div className='homeContent py-5 text-center'>
        <h1 className='text-muted pt-4'>Find & track the best <span className='text-info'>free-to-play</span> games!</h1>
        <p className='text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
        <button className='btn bg-transparent border-1 border-info fs-5 mb-4'> <Link to='/allgames' className='text-decoration-none text-muted'>Browse Games</Link> </button>
      </div>

      <div className='container py-5'>
        <h2 className='text-muted pb-5'>Personalize Recommendations</h2>
        <div className="row gy-4">
          {games.map((game) => <div key={game.id} className="col-md-4 cursorPointer">
            <Link to={'/gamedetails/' +game.id} className='text-decoration-none text-black'>
              <div className="card border-0 rounded-2">
                <img className="card-img-top" src={game.thumbnail} alt="Title"/>
                <div className="card-body d-flex justify-content-between bg-secondary">
                  <h4 className="card-title align-self-center">{game.title.split(" ").slice(0 , 2).join(" ")}</h4>
                  <span className="badge bg-info text-white align-self-center fs-6">Free</span>
                </div>
              </div>
            </Link>
          </div>
          )}       vv
          

          {/* <div className="col-md-4">
            <div className="card border-0 rounded-2">
              <img className="card-img-top" src={image} alt="Title"/>
              <div className="card-body d-flex justify-content-between bg-secondary">
                <h4 className="card-title align-self-center">Naruto Online</h4>
                <span className="badge bg-info text-white align-self-center fs-6">Free</span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 rounded-2">
              <img className="card-img-top" src={image} alt="Title"/>
              <div className="card-body d-flex justify-content-between bg-secondary">
                <h4 className="card-title align-self-center">Naruto Online</h4>
                <span className="badge bg-info text-white align-self-center fs-6">Free</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </>
}
