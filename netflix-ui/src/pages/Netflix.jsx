import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/home10.jpg';
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { useDispatch, useSelector } from "react-redux";
import Slider from '../components/Slider';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

//****// */
import Home from '../components/HomeSlide'
//**** */

export default function Netflix() {

  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genre = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres())
  }, [])

  useEffect(() => {
    // console.log(genresLoaded);
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  // console.log(movies);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <Home></Home>
        <div className="hero">
          {/* <img
          src={backgroundImage}
          alt="background"
          className='background-image' /> */}
          <div className="container">
            <div className="logo">
              {/* <img src={MovieLogo} alt="Movie Logo" /> */}
            </div>
      {/* by onClick on Play button will nevigate to player page */}
            <div className="buttons flex">
              {/* <button className='flex j-center a-center' onClick={() => navigate('/player')}>
                <FaPlay /> Play
              </button>
              <button className='flex j-center a-center'>
                <AiOutlineInfoCircle /> More
              </button> */}
            </div>
          </div>
        </div>
      
      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
background-color: black;
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
    bottom: 5rem;
    .logo{
      img{
        width: 90%;
        height:100%;
        margin-left: 5rem;
      }
    }
    .buttons{
      margin: 5rem;
      margin-left: 9rem;
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
}
`;