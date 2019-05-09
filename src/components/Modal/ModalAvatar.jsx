import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { changeAvatar } from '../../actions/authActions';
import { showModal } from '../../actions/modalActions';

import Icon from '../Icon/Icon';

const Modal = styled.form`
    width: 400px;
    height: 250px;
    background: #333840;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    &:before {
        content: 'Change avatar';
        position: absolute;
        top: -45px;
        color: #ffffff;
        font-size: 26px;
        font-family: 'PT Serif', serif;
    }
`

const ModalWrapper = styled.div`
    display: flex;
`

const ModalAvatarImage = styled.img`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: 1px solid #ffffff;
`

const ModalInput = styled.input`
    color: #fff;
    width: 200px;
    align-self: flex-end;
    margin-left: 5px;
`

const ModalButton = styled.button`
    width: 120px;
    height: 40px;
    background: #21242A;
    color: #ffffff;
    font-family: 'PT Serif', serif;
    font-size: 18px;
    border: none;
    margin-top: 30px;
    cursor: pointer;
    outline: none;
    position: relative;

    &:after {
        content: '';
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        left: 0;
        top: 0;
        position: absolute;
        cursor: default;
        display: ${({disabled}) => (disabled ? 'block' : 'none')};
    }
`

const ModalClose = styled.button`
    position: absolute;
    left: -10px;
    top: -10px;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
`

const ModalAvatar = ({profile, process, changeAvatar, showModal}) => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarFileURL, setAvatarFileURL] = useState(null);

    const handleChangeAvatar = e => {
        if (avatarFile) {
            e.preventDefault();
            changeAvatar(avatarFile);
        } else {
            e.preventDefault();
        }
    }

    const handleFileChange = e => {
        if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png') {
            setAvatarFile(e.target.files[0]);
            setAvatarFileURL(window.URL.createObjectURL(e.target.files[0]));
        } else {
            setAvatarFile(null);
            setAvatarFileURL(null);
            e.target.value = null;
        }
    }

    const closeModal = e => {
        e.preventDefault();
        showModal(null);
    }

    return (
        <Modal>
            <ModalClose onClick={closeModal} type="button">
                <Icon type="close" color="#bbb" />
            </ModalClose>
            <ModalWrapper>
                <ModalAvatarImage src={avatarFileURL ? avatarFileURL : profile.avatar} alt="" />
                <ModalInput onChange={handleFileChange} accept="image/png, image/jpeg" type="file"/>
            </ModalWrapper>
            <ModalButton disabled={process} onClick={handleChangeAvatar}>Change</ModalButton>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        profile: state.firebase.profile,
        process: state.notesReducer.process
    }
}

export default connect(mapStateToProps, { changeAvatar, showModal })(ModalAvatar);