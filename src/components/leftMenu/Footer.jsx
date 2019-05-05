import React from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

const FooterContainer = styled.div`
    width: 100%;
    height: 130px;
    border-top: 2px solid #333840;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #21242A;

    @media (max-height: 580px) {
        position: relative;
    }

    @media (max-width: 650px) {
        width: ${({menuActive}) => ( menuActive ? '100%' : '0' )};
        position: ${({dropdownActive}) => ( dropdownActive ? 'relative' : 'absolute' )}
        overflow: hidden;
    }
`

const FooterAvatar = styled.img`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid #ffffff;

    @media (max-width: 1490px) {
        display: none;
    }

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

    @media (max-width: 1490px) {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    }
`

const FooterButton = styled.button`
    background: none;
    cursor: pointer;
    border: none;
    font-size: 20px;
    color: #4D4F54;
    outline: none;
`

const Footer = ({avatar, email, menuActive, dropdownActive}) => {
    return (
        <FooterContainer menuActive={menuActive} dropdownActive={dropdownActive}>
            <FooterAvatar src={avatar} />
            <FooterWrapper>
                <FooterNick>{email ? email.split('@')[0] : ''}</FooterNick>
                <FooterSaveStatus>Saved</FooterSaveStatus>
            </FooterWrapper>
            <FooterWrapperButtons>
                <FooterButton data-tip="Sign out">
                    <span className="fa fa-sign-out-alt"></span>
                </FooterButton>
                <FooterButton data-tip="Change avatar">
                    <span className="fa fa-user-circle"></span>
                </FooterButton>
                <ReactTooltip type="dark" effect="solid"/>
            </FooterWrapperButtons>
        </FooterContainer>
    );
};

export default Footer;