import React from 'react';
import './home.css';
import HeaderImage from '../img/head.svg';
import {Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Home () {
  return (
    <div className="home-container">
      <nav className="container top-nav">
        <div>
          <h3 style={{color: '#00C6C5', fontWeight: 'bold'}}>Lern</h3>
        </div>
        <div
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
        >
          <Link
            style={{fontWeight: 600, marginRight: 20}}
            to={{
              pathname: '/login',
            }}
            className="linkStyle"
          >
              Login
          </Link>
          <Link
            style={{fontWeight: 600}}
            to={{
              pathname: '/login',
            }}
            className="linkStyle"
          >
            <button className="btn btn-success">
              {' '}
              Register
            </button>
          </Link>
          {/* <p style={{marginRight: 10, fontWeight: 600}}>Sign up</p>
          <p style={{fontWeight: 600}}>Log in</p> */}
        </div>
      </nav>
      <div style={{height: '100%'}} className="container mt-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 d-flex align-items-center">
            <div>
              <h1 style={{color: '#1F4B6F', fontWeight: 'bold'}}>
                Online<br />Learning Platform
              </h1>
              <p>
                An Innovative, Educative and Engaging Platform To Learn Effectively.
              </p>
              <button className="btn btn-success">
                Get Started
              </button>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div>
              <Image src={HeaderImage} fluid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
