import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaSearch, FaPowerOff } from "react-icons/fa";
import { firebaseAuth } from '../utils/firebase-config';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Navbar({ isScrolled }) {

    const links = [
        { name: "Home", link: "/" },
        { name: "TVShows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "MyList", link: "/mylist" },
        // { name: "HomeSlider", link: "/homeslider" }, //************ */
    ];

    const [showSearch, setShowSearch] = useState(false); //for showing and hiding the search
    const [inputHover, setInputHover] = useState(false); //for hover over the search input

    return (
        <Container>
            <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
                <div className="left flex a-center">
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="Logo" />
                    </div>
                    <ul className="links flex">
                        {/* link array ko distructured kiya map use karke */}
                        {links.map(({ name, link }) => {
                            return (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button
                            // onClick={()=>{
                            //     alert("Hello signOutButton");
                            // }
                            onFocus={() => setShowSearch(true)}
                            onBlur={() => {
                                if (!inputHover) setShowSearch(false);
                            }}>
                            <FaSearch />
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)}
                            onBlur={() => {
                                setShowSearch(false);
                                setInputHover(false);
                            }}
                        />
                    </div>
                    <button onClick={() => {signOut(firebaseAuth)}}>
                        <FaPowerOff />
                    </button>
                </div>
            </nav>
        </Container>
    );
}

const Container = styled.div`
.scrolled{
    background-color: black;
}
nav{
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding:0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left{
        gap: 2rem;
        .brand{
            img{
                height: 4rem;
            }
        }
        .links{
            list-style-type: none;
            gap: 2rem;
            li{
                a{
                    color:white;
                    text-decoration: none;
                }
            }
        }
    }
    .right{
        gap: 1rem;
        button{
            background-color: transparent;
            border: none;
            cursor: pointer;
            &:focus{
                outline: none;
            }
            svg{
                color: #f34242;
                font-size: 1.2rem;
            }
        }
        .search{
            display: flex;
            gap: 0.4rem;
            align-items: center;
            justify-content: center;
            padding : 0.2rem;
            padding-left: 0.5rem;
            button{
                background-color: transparent;
                svg{
                    color: white;
                }
            }
            input{
                width: 0;
                opacity: 0;
                visibility: hidden;
                transition: 0.3s ease-in-out;
                background-color: transparent;
                border: none;
                color: white;
                &:focus{
                    outline: none;
                }
            }
        }
        .show-search{
            border: 1px solid white;
            background-color: rgba(0,0,0,0.6);
            input{
                opacity: 1;
                visibility: visible;
                padding :0.3rem;
                width: 100%;
            }
        }
    }
}
`;




//<nav className={`flex`}></nav>  //flex is rendered dynamically heance used ``