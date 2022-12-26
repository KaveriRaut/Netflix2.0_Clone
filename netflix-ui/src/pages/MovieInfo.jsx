import React, {useEffect, useState} from "react"
// import "./MovieInfo.css"
import { useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import styled from "styled-components"

const MovieInfo = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }

    return (
        <Container>
        {/* <Navbar/> */}
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                </div>
            </div>
        </div>
        </Container>
    )
}

const Container = styled.div`
.movie {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction:column;
    align-items: center;
}

.movie__intro {
    width: 80%;
}

.movie__backdrop {
    width: 100%;
    height: 500px;
    object-fit:cover;
    object-position: 0 35%;
}

.movie__detail {
    align-items: center;
    width: 75%;
    display: flex;
    position: relative;
    bottom: 225px;
}

.movie__detailLeft {
    margin-right: 30px;
}

.movie__poster {
    width:300px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.86) 0px 22px 40px 6px;
}

.movie__detailRight {
    color: white;
    display: flex;
    flex-direction: column;
    height: 450px;
    justify-content:space-between ;
}

.movie__detailRightTop > div{
    text-shadow: 0px 0px 5px #000000;
    margin-bottom: .5rem;
}

.movie__name {
    font-weight: 600;
    font-size: 3rem;
}

.movie__voteCount {
    margin-left: 1rem;
}

.movie__genres {
    margin: 1.25rem 0;
}

.movie__genre {
    padding: .5rem;
    border: 2px solid white;
    border-radius: 20px;
    margin-right: 1rem;
}


.movie__detailRightBottom {
    margin: 2rem 0;
    flex: 0.8;
}

.synopsisText {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
    font-weight: 600;
    display: flex;
    position: relative;
    align-items: center;
}
.synopsisText > div:last-of-type {
    margin-left: auto;
}

.movie__links {
    position: relative;
    bottom: 120px;
    display: flex;
    justify-content: space-between;
    width: 75%;
}

.movie__heading {
    font-size: 2.2rem;
}

.movie__Button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.8rem 2rem;
    border-radius: 20px;
    cursor: pointer;
    width: 150px;
    color: black;
    font-weight: bold;
}

.movie__homeButton {
    background-color:rgb(255, 0, 0);
    
}

.movie__imdbButton {
    background-color:#f3ce13;
}

.newTab {
    margin-left: 1.4rem;
}

.movie__production {
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 4rem;
}


.movie__productionComapany {
    width: 200px;
    margin: 2rem;
}

.productionCompanyImage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
`;

export default MovieInfo;