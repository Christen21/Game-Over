import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Allgames() {

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

    setgames(response.data)
    console.log(response.data);
    };

  useEffect ( () => {

    getPopularGames();

  } , []);

  return <>
   
      <div className='container py-5'>
        
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
          )}
        
        </div>
      </div>
    
  </>
}

