import React, { useState } from 'react'
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import { firebaseAuth } from "../utils/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const [showPassword, setShowPassword] = useState(false); //to toggle between password and 'get Started' button
    //to maintain the states of form values
    const [formValues, setFormValues] = useState({
        email: "", //only mail is setting not password
        password: "", //its like key and should remain unchanged // ...formValues 
    });

    const navigate = useNavigate();


    //form values states handling function
    //async ensures that the function returns a promise, and wraps non-promises in it.
    //An asynchronous function is any function that delivers its result asynchronously – for example, a callback-based function or a Promise-based function
    const handleSignIn = async () => {
        // console.log(formValues); //check and log the form values that we got
        //now we are sending the users form info to firebase
        try {
            const { email, password } = formValues; //restructuring the information only
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch (err) {
            console.log(err);
        }
    };

    //after getting authentication from firebase=>we do state change=>inbuilt function
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) navigate("/"); //if current user exists redirect to homepage
    })

    return (
        <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className="content">
                <Header login />
                <div className="body flex column a-centre j-center">
                    <div className="text flex column">
                    <h1>See What's Next</h1>
                        <h4>Unlimited movies, TV shows and more</h4>
                        <h4>Watch anywhere. Cancel anytime.</h4>
                        {/* <h6>Ready to watch? Enter your email to create or restart membership</h6> */}
                    </div>
                    <center>
                    <div className='form'>
                        <input
                            type="email"
                            placeholder="Email Address"
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues, //destructuring the form values
                                    [e.target.name]: e.target.value, //only setting the mail name to user given input value
                                })
                            }
                            name="email"
                            value={formValues.email}
                        />
                        {
                            showPassword && (
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues, //destructuring the form values
                                            [e.target.name]: e.target.value, //only setting the password name to user given input value
                                        })
                                    }
                                    name="password"
                                    value={formValues.password}
                                />
                            )
                        }
                        {
                            !showPassword && (<button onClick={() => setShowPassword(true)}>Get Started</button>)
                        }
                    </div>
                {showPassword && <button onClick={handleSignIn}>Register</button>}
                </center>
            </div>
        </div>
        </Container >
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
        .body{
            gap:1rem;
            .text{
                gap:1rem;
                font-size:2rem;
                text-align: center;
                
            }
            .form{
                display: grid;
                grid-template-column:${({ showPassword }) => showPassword ? "1fr 1fr" : "2fr 1fr"};
                width: 60%;
                input{
                    color: black;
                    border: none;
                    padding:0.5rem 1rem;
                    font-size: 1.2rem;
                    border: 1px solid black;
                    &:focus{
                        outline: none;
                    }
                }
                button{
                    padding: 0.5rem 1rem;
                    background-color: #e50914;
                    border: none;
                    cursor: pointer;
                    color: white;
                    font-weight: bolder;
                    font-size:1.05rem;
                }
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
`;