//this page is completely seperate from entire project==> making api calls in same page only to display movie data//

import React, { useEffect, useState } from "react"
// import "./HomeSlide.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import styled from "styled-components";

export default 
React.memo(function Home ({ movieData, isLiked = false })  {
        
    const [ popularMovies, setPopularMovies ] = useState([])

    //here tmdb api seperately we are calling => to directly render the movies slider directly
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=a19376533b9b5fa9f69db2d48edf2b46&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])
    
    return (
        <Container>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={2}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                           <>
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                                </>
                        ))
                    }
                </Carousel>
            </div>
        </Container>
    )
}
)

const Container = styled.div`
.posterImage{
    height: 100vh;
}

.posterImage > img {
    margin: auto;
    display: block;
    width: 100;
}

.posterImage__overlay {
    position: absolute;
    padding: 5rem;
    bottom: 0px;
    height: 70%;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    background-image: linear-gradient(rgb(0,0,0,0), rgb(0,0,0,1));
    opacity: 1;
    transition: opacity .3s;
}   

.posterImage__overlay:hover {
    opacity: 1;
}

.posterImage__title {
    font-weight: 900;
    font-size: 4rem;
    margin-bottom: 0.4rem;
    text-align: left;
}

.posterImage__runtime {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.posterImage__rating {
    margin-left: 3rem;
}

.posterImage__description {
    font-style: italic;
    font-size: 1rem;
    margin-bottom: 0.25rem;
    display: flex;
    text-align: left;
    width: 50%;
}

`;

