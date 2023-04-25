import axios from 'axios';
import { getActiveElement } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';


export default function GameDetails() {

  let {id} = useParams();
  const [games, setgames] = useState()

  async function getDetails(){
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
      params: {id : `${id}`},
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    let response = await axios.request(options).catch( (error)=>{
      console.log(error);
    });

    setgames(response.data)
    console.log(response.data);
    };

useEffect(()=>{

  getDetails();

}, [])


return <> {games? <div className='container'>
<div className="row">

<div className="col-md-4">
  <img src={games.thumbnail}/>

  <div className='row mt-3'>
    <div className="col-md-3 d-flex">
      <span className='btn btn-dark w-100 '>Free</span>
    </div>

    <div className="col-md-9">
      <Link className='text-decoratin-none bg-info text-white w-100 btn' to={games.freetogame_profile_url}>Play Now</Link>
    </div>
  </div>

</div>

<div className="col-md-8 text-muted">
  <div>
    <h1>{games.title}</h1>
    <h3>About {games.title}</h3>
    <p className='fs-4'>{games.description}</p>
    <h2 className='text-info pb-2'>Minimum System Requirements</h2>
    <p className='fw-bold'>graphics : {games.minimum_system_requirements.graphics}</p>
    <p className='fw-bold'>memory :{games.minimum_system_requirements.memory}</p>
    <p className='fw-bold'>os : {games.minimum_system_requirements.os}</p>
    <p className='fw-bold'>processor : {games.minimum_system_requirements.processor}</p>
    <p className='fw-bold'>storage : {games.minimum_system_requirements.storage}</p>
  </div>

  <div>
    <h3 className='text-info pb-3'>{games.title} Screenshots</h3>

    <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="500">
          <img src={games.screenshots[0].image} className="d-block w-100" />
        </div>
        <div className="carousel-item" data-bs-interval="500">
          <img src={games.screenshots[1].image} className="d-block w-100" />
        </div>
        <div className="carousel-item" data-bs-interval="500">
          <img src={games.screenshots[2].image} className="d-block w-100" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <h3 className='text-info pb-3'>Additional Information</h3>

    <div className="row">
      <div className="col-md-4">
        <div>
          <h5 className='text-warning'>Title</h5>
          <p>{games.title}</p>
        </div>

        <div>
          <h5 className='text-warning'>Release Date</h5>
          <p>{games.release_date}</p>
        </div>
      </div>

      <div className="col-md-4">
        <div>
          <h5 className='text-warning'>Developer</h5>
          <p>{games.developer}</p>
        </div>

        <div>
          <h5 className='text-warning'>Genre</h5>
          <p>{games.genre}</p>
        </div>
      </div>

      <div className="col-md-4">
        <div>
          <h5 className='text-warning'>Puplisher</h5>
          <p>{games.publisher}</p>
        </div>

        <div>
          <h5 className='text-warning'>Platform</h5>
          <p>{games.platform}</p>
        </div>
      </div>
    </div>
    
  </div>
</div>
</div>
  </div>:""}

</>
}
