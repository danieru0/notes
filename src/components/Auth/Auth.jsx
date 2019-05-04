import React, { useState } from 'react';
import styled from 'styled-components';

const AuthBackground = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1;
    display: block;
    background: url('https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-88878.jpg');
    background-size: cover;
    transform: scale(1.1);
    width: 100%;
    height: 100vh;
    filter: blur(5px);
`

const AuthContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AuthForm = styled.form`
    width: 400px;
    height: 400px;
    background: #21242A;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 0px 5px 0px #000;
    border-radius: 5px;
`

const AuthInput = styled.input`
    width: 80%;
    height: 60px;
    background: #333840;
    border: none;
    outline: none;
    color: #ffffff;
    font-family: 'PT Serif', serif;
    font-size: 20px;
    padding-left: 15px;
    margin: 15px 0px;

    &:focus {
        background: #444951;
    }
`

const AuthSubmitButton = styled.button`
    width: 80%;
    height: 60px;
    background: none;
    border: 2px solid #2D3139;
    color: #ffffff;
    font-size: 20px;
    font-family: 'PT Serif', serif;
    cursor: pointer;
    margin-top: 15px;
    outline: none;

    &:focus,
    &:hover {
        background: #1C2028;
    }
`

const AuthChangeTypeButton = styled.button`
    background: none;
    border: none;
    font-family: 'PT Serif', serif;
    color: #8D8E91;
    cursor: pointer;
    outline: none;
    margin-top: 10px;
`

const Auth = () => {
    const [isRegisterActive, setLoginState] = useState(false);

    const toggleAuth = () => {
        setLoginState(!isRegisterActive);
    }

    const register = () => {
        alert('register button');
    }

    const login = () => {
        alert('login button');
    }

    return (
        <>
            <AuthBackground />
            <AuthContainer>
                <AuthForm>
                    <AuthInput placeholder="Email" required/>
                    <AuthInput placeholder="Password" type="password" required/>
                    <AuthSubmitButton onClick={isRegisterActive ? register : login}>
                        {
                            isRegisterActive ? 'Register' : 'Login'
                        }
                    </AuthSubmitButton>
                    <AuthChangeTypeButton onClick={toggleAuth} type="button">
                        {
                            isRegisterActive ? 'Already registered? Log in' : 'Not registered? Create an account'
                        }
                    </AuthChangeTypeButton>
                </AuthForm>
            </AuthContainer>
        </>
    );
};

export default Auth;