import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
    width: 100%;
    height: 130px;
    border-top: 2px solid #333840;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const FooterAvatar = styled.img`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid #ffffff;
`

const FooterWrapper = styled.div`
    font-family: 'PT Serif', serif;
    margin-left: 20px;
    cursor: default;
`

const FooterNick = styled.p`
    color: #ffffff;
    font-size: 24px;
    letter-spacing: 1px;
    margin: 0;
`

const FooterSaveStatus = styled.p`
    color: #5F6165;
    margin: 0;
    letter-spacing: 1px;
`

const FooterWrapperButtons = styled.div`
    margin-left: 40px;
`

const FooterButton = styled.button`
    background: none;
    cursor: pointer;
    border: none;
    font-size: 20px;
    color: #4D4F54;
    outline: none;
`

const Footer = () => {
    return (
        <FooterContainer>
            <FooterAvatar src="https://www.kinnarps.pl/contentassets/e61c223f7f8548c1968ad510a63ae4a4/13_portraitplaceholder.jpg?preset=?preset=portrait-quote" />
            <FooterWrapper>
                <FooterNick>Michael</FooterNick>
                <FooterSaveStatus>Saved</FooterSaveStatus>
            </FooterWrapper>
            <FooterWrapperButtons>
                <FooterButton>
                    <span className="fa fa-sign-out-alt"></span>
                </FooterButton>
                <FooterButton>
                    <span className="fa fa-user-circle"></span>
                </FooterButton>
            </FooterWrapperButtons>
        </FooterContainer>
    );
};

export default Footer;