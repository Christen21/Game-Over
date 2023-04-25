import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function Pc({getGames , games}) {

    useEffect(()=>{
        getGames('zombie');
    } , []);

  return <>
    <>
    <div className="container py-5 pc">
    
        <div className="row gy-4">
          {games.map((game) => <div key={game.id} className="col-md-3 cursorPointer" height={385}>
          <Link to={'/gamedetails/' +game.id} className='text-decoration-none text-black'>
              <div className="card border-0 rounded-2">
                <img className="card-img-top" src={game.thumbnail} alt="Title"/>
                <div className="card-body bg-secondary py-3 d-flex flex-column align-content-between">
                  <div className='d-flex justify-content-between'>
                    <h4 className="card-title align-self-center pt-3">{game.title.split(" ").slice(0 , 2).join(" ")}</h4>
                    <span className="badge bg-info text-white align-self-center fs-6">Free</span>
                  </div>

                  <p className='overflow-hidden text-overflow-clip pt-3'>{game.short_description.split(" ").slice(0 , 6).join(" ")}...</p>
                  
                  <div className='d-flex justify-content-between pt-3'>
                    <i className="fa-solid fa-circle-plus align-self-center"></i>
                    <div className='align-self-center'>
                      <span className='badge bg-dark me-2'>{game.genre}</span>
                      <i className="fa-brands fa-windows"></i>
                    </div>
                  </div>
                </div>
              </div>v
            </Link>
          </div>
          )}
        
        </div>
    </div>
  </>
  </>
}

