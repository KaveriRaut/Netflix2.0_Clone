//code is similar to 'Signup.jsx' partially

import React, { useState } from 'react'
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from "../utils/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  //to maintain the states of form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogIn = async () => {
    //now we are sending the users form info to firebase
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.log(err.code);
    }
  };

  onAuthStateChanged(firebaseAuth, (CurrentUser) => {
    if (CurrentUser) navigate("/"); //if current user exists redirect to homepage
  })

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex-column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button onClick={handleLogIn}>Login to your account</button>

            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

// const Container = styled.div``;
const Container = styled.div`
    position : relative;
    .content{
        position: absolute;
        top: 0;
        left:0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0,0,0,0.5);
        display: grid;
        grid-template-rows: 15vh 85vh;
          .form-container{
            gap : 2rem;
            heioght : 85vh;
            .form{
              padding : 2rem;
              background-color: #00000b0;
              background-color: rgba(0,0,0,.6);
              color: #fff;
              width: 25vw;
              gap: 2rem;
              color: white;
              .container{
                gap: 2rem;
                input{
                  padding: 0.5rem 1rem;
                  width: 15rem;
                }
                button{
                  padding: 0.5rem 1rem;
                  background-color: #e50914;
                  border: none;
                  cursor: pointer;
                  color: white;
                  border-radius: 0.2rem;
                  font-weight: bolder;
                  font-size:1.05rem;
                }
              }
            }
          }
        }
    }
`;