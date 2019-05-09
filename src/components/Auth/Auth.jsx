import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signIn, signUp } from '../../actions/authActions';
import styled from 'styled-components';

import Loader from '../Loader/Loader';

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
    height: ${({registerActive}) => ( registerActive ? '500px' : '400px' )};
    background: #21242A;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0px 0px 5px 0px #000;
    border-radius: 5px;
    position: relative;

    &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        background: rgba(0,0,0,0.2);
        opacity: ${({authActive}) => ( authActive ? '1' : '0' )};
        visibility: ${({authActive}) => ( authActive ? 'visible' : 'hidden' )};
        transition: opacity .2s, visibility .2s;
    }

    @media (max-height: 500px) {
        height: 90%;
    }
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

const AuthErrorMessage = styled.p`
    color: red;
    font-family: 'PT Serif', serif;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    top: 10px;
`

const StyledLoader= styled(Loader)`
    opacity: ${({authActive}) => ( authActive ? '1' : '0' )};
    visibility: ${({authActive}) => ( authActive ? 'visible' : 'hidden' )};
    transition: opacity .2s, visibility .2s;
`

const Auth = ({authError, authRun, signIn, signUp}) => {
    const [isRegisterActive, setLoginState] = useState(false);
    const [email, setEmailState] = useState(null);
    const [password, setPasswordState] = useState(null);
    const [nick, setNickState] = useState(null)

    const toggleAuth = () => {
        setLoginState(!isRegisterActive);
    }

    const handleEmailInput = e => {
        setEmailState(e.target.value);
    }

    const handlePasswordInput = e => {
        setPasswordState(e.target.value);
    }

    const handleNickInput = e => {
        setNickState(e.target.value);
    }

    const register = e => {
        if (email && password && nick) {
            e.preventDefault();
            signUp(email, password, nick);
        } else {
            e.preventDefault();
        }
    }

    const login = e => {
        if (email && password) {
            e.preventDefault();
            signIn(email, password);
        }
    }

    return (
        <>
            <AuthBackground />
            <AuthContainer>
                <AuthForm registerActive={isRegisterActive} authActive={authRun}>
                    <StyledLoader authActive={authRun} />
                    <AuthErrorMessage>{authError}</AuthErrorMessage>
                    {
                        isRegisterActive ? (
                            <AuthInput onChange={handleNickInput} placeholder="Nick" required />
                        ) : (
                            ''
                        )
                    }
                    <AuthInput onChange={handleEmailInput} placeholder="Email" required/>
                    <AuthInput onChange={handlePasswordInput} placeholder="Password" type="password" required/>
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

const mapStateToProps = state => {
    return {
        authError: state.authReducer.authError,
        authRun: state.authReducer.authRun
    }
}

export default connect(mapStateToProps, { signIn, signUp })(Auth);