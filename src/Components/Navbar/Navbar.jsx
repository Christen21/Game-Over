import logo from '../../Assets/logo (1).png'
import { Link } from 'react-router-dom';



export default function Navbar({userData , logOut}) {

  return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <img src={logo}  width={80} height={60} />
    <Link className="navbar-brand" to="/">Game Over</Link>

    {userData !== null ? <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
          <Link className="nav-link" to="home">Home</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="allgames">All</Link>
        </li>
        
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Platforms</Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="platforms/pc">PC</Link></li>
            <li><Link className="dropdown-item" to="platforms/browser">Browser</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort-by
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="sorted/release-date">release-date</Link></li>
            <li><Link className="dropdown-item" to="sorted/popularity">popularity</Link></li>
            <li><Link className="dropdown-item" to="sorted/alphabetical">alphabetical</Link></li>
            <li><Link className="dropdown-item" to="sorted/relevance">relevance</Link></li>
          </ul>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="categories/racing">racing</Link></li>
            <li><Link className="dropdown-item" to="categories/sports">sports</Link></li>
            <li><Link className="dropdown-item" to="categories/social">social</Link></li>
            <li><Link className="dropdown-item" to="categories/shooter">shooter</Link></li>
            <li><Link className="dropdown-item" to="categories/openWorld">open-world</Link></li>
            <li><Link className="dropdown-item" to="categories/zombie">zombie</Link></li>
            <li><Link className="dropdown-item" to="categories/fantasy">fantasy</Link></li>
            <li><Link className="dropdown-item" to="categories/actionRpg">action-rpg</Link></li>
            <li><Link className="dropdown-item" to="categories/action">action</Link></li>
            <li><Link className="dropdown-item" to="categories/flight">flight</Link></li>
            <li><Link className="dropdown-item" to="categories/battle">battle-royale</Link></li>
          </ul>
        </li>
      </ul>
    </div> : null}
    

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        {userData === null? <> <li className="nav-item">
            <Link className="nav-link me-3" to="/login">Login</Link>
          </li>
          <li>
            <button className='btn mx-2 border-1 border-info'><Link to='/register' className='text-decoration-none text-info'>Join Free</Link></button>
          </li> </> : <li>
                        <button onClick={logOut} className='btn border-1 border-info'><Link className='text-decoration-none text-info'>Logout</Link></button>
                      </li> }
      
      </ul>
    </div>
  </div>
</nav>
  </>

  }
