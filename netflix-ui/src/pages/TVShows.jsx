import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import MovieLogo from "../assets/homeTitle.webp";
import SelectGenre from '../components/SelectGenre';
import Slider from '../components/Slider';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/firebase-config';
import backgroundImage from '../assets/home.jpg';

export default function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const dispatch = useDispatch();
  // console.log(movies); //all movies stored in it
  // console.log(genres); //all genres stored in it

  useEffect(() => {
    // console.log("in use effect");
    if (!genres.length) dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ genres, type: "tv" }));
  }, [genresLoaded]);

  const [user, setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      { /* this section is directly taken from homePage Netflix.js to render the movie poster on movie page */}
      <div className="hero">
        <img
          src={backgroundImage}
          alt="background"
          className='background-image' />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            {/* by onClick on Play button will nevigate to player page */}
            <button onClick={() => navigate('/player')} className='flex j-center a-center' >
              <FaPlay /> Play
            </button>
            <button className='flex j-center a-center'>
              <AiOutlineInfoCircle /> More
            </button>
          </div>
        </div>
      </div>
      { /* this section is directly taken from homePage Netflix.js to render the movie poster on movie page */}
      <div className="data">
        <SelectGenre genres={genres} type="tv" />
        {
          movies.length ? (
            <> <Slider movies={movies} />
            </>
          ) : (
            <h1 className="not-available"> No TV Shows avaialble for the selected genre. Please select a different genre. </h1>
          )
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
    .data{
        margin-top: 5rem;
        .not-available{
            text-align: center;
            color: white;
            margin-top: 4rem;
        }
    }

    
/* this section is directly taken from homePage Netflix.js to render the movie poster on movie page */
.hero{
  position: relative;
  .background-image{
    filter: brightness(70%);
  }
  img{
    height: 100vh;
    width: 100vw;

  }
  .container{
    position: absolute;
    bottom: 0.7rem;
    .logo{
      img{
        width: 90%;
        height:100%;
        margin-left: 3rem;
      }
    }
    .buttons{
      margin: 5rem;
      margin-left: 6rem;
      gap:2rem;
      button{
        font-size:1.4rem;
        gap:1rem;
        border-radius:0.2rem;
        padding: 0.5rem;
        padding-left:2rem;
        padding-right:2.4rem;
        border:none;
        cursor: pointer;
        transistion: 0.3s ease-in-out;
        &:hover{
          opacity: 0.8;
        }
        &:nth-of-type(2){
          background-color: rgba(109,109,110,0.7);
          color: white;
          svg{
            font-size: 1.8rem;
          }
        }
      }
    }
  }
`;
