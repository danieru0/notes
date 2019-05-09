import React from 'react';
import styled from 'styled-components';

import Circle from '../Circle/Circle';

const NoteContainer = styled.div`
    width: 100%;
    height: 160px;
    border-top: 2px solid #373B44;
    border-bottom: 2px solid #17181D;
    display: flex;
    align-items: center;
    cursor: pointer;

    background: ${({activeNoteId, noteId}) => ( activeNoteId === noteId ? '#444951' : 'unset' )}
`

const StyledCircle = styled(Circle)`
    align-self: flex-start;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 29px;
`

const NoteWrapper = styled.div`
    position: relative;
    font-family: 'PT Serif', serif;
    width: 90%;
`

const NoteTitle = styled.p`
    margin: 0;
    color: #ffffff;
    font-size: 20px;
`

const NoteDescription = styled.p`
    margin: 0;
    color: #9FA3A7;
    font-size: 13px;
    margin-top: 15px;
    height: 72px;
    word-break: break-all;
`

const NoteDate = styled.p`
    position: absolute;
    margin: 0;
    color: #7C8889;
    font-size: 13px;
    right: 15px;
    top: 5px;
    
    @media (max-width: 1438px) {
        display: none;
    }
`

const Note = ({title, description, date, color, activeNoteId, noteId}) => {

    if (description.length > 140) {
        description = description.substring(0, 140)+'...';
    }

    return (
        <NoteContainer title={title} activeNoteId={activeNoteId} noteId={noteId}>
            <StyledCircle color={color} size="small" />
            <NoteWrapper>
                <NoteTitle>{title}</NoteTitle>
                <NoteDescription>{description}</NoteDescription>
                <NoteDate>{date}</NoteDate>
            </NoteWrapper>
        </NoteContainer>
    );
};

export default Note;