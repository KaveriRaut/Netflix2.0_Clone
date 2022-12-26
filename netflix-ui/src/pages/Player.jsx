import React from 'react'
import styled from "styled-components"
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video3.mp4";
import { useNavigate } from 'react-router-dom';


export default function Player() {
    const navigate = useNavigate();
    
    return (
        <Container>
            <div className="player">
                <div className="back">
                    {/* To navigate to before page of video playing */}
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                {/* autoplay loop control muted */}
                <video src={video} autoPlay loop controls />

            </div>
        </Container>
    )
}

const Container = styled.div`
.player{
    width: 10vw;
    height: 100vh;
    .back{
        position: absolute;
        padding: 2rem;
        z-index:1;
        svg{
            font-size:3rem;
            cursor: pointer;
        }
    }
    video{
        height: 100vh;
        width: 100vw;
        object-fit: cover;
    }
}
`;