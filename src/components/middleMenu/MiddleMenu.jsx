import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getAllNotes, getStarNotes, getTrashNotes, getTagNotes, getSpecificNote } from '../../actions/notesActions';

import Icon from '../Icon/Icon';
import Nav from './Nav';
import Note from './Note';
import Loader from '../Loader/Loader';

const MiddleMenuContainer = styled.div`
    width: 16%;
    height: 100vh;
    background: #333840;
    box-shadow: -2px 0px 20px -5px #000000;
    z-index: 1;
    position: relative;

    @media (max-width: 1300px) {
        width: 220px;
    }

    @media (max-width: 1110px) {
        overflow-y: auto;
        z-index: 1;
        left: 250px;
        width: ${({menuActive}) => ( menuActive ? '250px' : '0' )};
        position: ${({menuActive}) => ( menuActive ? 'absolute' : 'initial' )};
    }

    @media (max-width: 700px) {
        left: 200px;
    }

    @media (max-width: 650px) {
        left: auto;
        right: 0;
    }

    &:before {
        content: '';
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: absolute;
        z-index: 2;
        top: 0;
        display: ${({removingTag}) => ( removingTag ? 'block' : 'none' )};
    }
`

const MiddleMenuList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    height: calc(100% - 130px);
    overflow-y: auto;
    padding-right: 1px;
    position: relative;


    &:after {
        content: '';
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        position: absolute;
        top: 0;
        display: ${({notes}) => ( notes ? 'none' : 'block' )};
    }
`

const MiddleMenuItem = styled.li`
    width: 100%;
`

const MiddleMenuShowButton = styled.button`
    display: none;

    @media (max-width: 1110px) {
        z-index: 1;
        position: absolute;
        color: #fff;
        display: block;
        background: none;
        border: none;
        cursor: pointer;
        outline: none;
        top: 21px;
    }

    @media (max-width: 650px) {
        right: 0;
        top: 22px;
    }
`

const StyledIcon = styled(Icon)`
    font-size: 25px;
`

const StyledLoader = styled(Loader)`
    position: absolute;
    left: 0;
    top: 20px;
    right: 0;
    margin: auto;
`

class MiddleMenu extends Component {
    constructor() {
        super();
        this.state = {
            isMenuActive: false,
            clickedNoteId: null,
            searchedNotes: null
        }
    }

    componentDidMount() {
        this.props.getAllNotes();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.activeRoute !== this.props.activeRoute) {
            switch(this.props.activeRoute) {
                case 'all':
                    this.props.getAllNotes();
                    break;
                case 'star':
                    this.props.getStarNotes();
                    break;
                case 'trash':
                    this.props.getTrashNotes();
                    break;
                default: this.props.getTagNotes(this.props.activeRoute);
            }
        }
    }

    toggleMenu = () => {
        this.setState({ isMenuActive: !this.state.isMenuActive });
    }

    handleNoteClick = id => {
        if (this.props.activeNote) {
            if (this.props.activeNote.id !== id) {
                this.props.getSpecificNote(id);
                this.setState({ clickedNoteId: id })
            }
        } else {
            this.props.getSpecificNote(id);
            this.setState({ clickedNoteId: id })
        }
    }

    searchNotes = value => {
        if (value) {
            this.setState({
                searchedNotes: this.props.notes.filter(item => item.name.includes(value))
            })
        } else {
            this.setState({
                searchedNotes: null
            })
        }
    }

    render() {
        const { notes, activeRoute, profile, removingTag, activeNote } = this.props;

        return (
            <MiddleMenuContainer removingTag={removingTag} menuActive={this.state.isMenuActive}>
                <MiddleMenuShowButton onClick={this.toggleMenu}>
                    <StyledIcon color="#545962" type="hamburger" />
                </MiddleMenuShowButton>
                <Nav handleSearch={this.searchNotes} tag={profile.isLoaded ? profile.tags[activeRoute] : null} activeRoute={activeRoute} number={notes ? notes.length : ''}/>
                <MiddleMenuList notes={notes}>
                    {
                        this.state.searchedNotes ? (
                            Object.keys(this.state.searchedNotes).map(item => {
                                let note = this.state.searchedNotes[item];
                                return (
                                    <MiddleMenuItem onClick={() => this.handleNoteClick(note.id)} key={item}>
                                        <Note noteId={note.id} clickedNoteId={this.state.clickedNoteId} title={note.name} description={note.value} color={note.color} date={note.date} />
                                    </MiddleMenuItem>
                                )
                            })
                        ) : (
                            notes ? (
                                Object.keys(notes).map(item => {
                                    let note = notes[item];
                                    return (
                                        <MiddleMenuItem onClick={() => this.handleNoteClick(note.id)} key={item}>
                                            <Note activeNoteId={activeNote ? activeNote.id : null} noteId={note.id} title={note.name} description={note.value} color={note.color} date={note.date} />
                                        </MiddleMenuItem>
                                    )
                                })
                            ) : (
                                <StyledLoader />
                            )
                        )
                    }
                </MiddleMenuList>
            </MiddleMenuContainer>
        )
    }
};

const mapStateToProps = state => {
    return {
        activeRoute: state.routesReducer.activeRoute,
        activeNote: state.notesReducer.activeNote,
        routeChanging: state.routesReducer.routeChanging,
        notes: state.notesReducer.notes,
        profile: state.firebase.profile,
        removingTag: state.notesReducer.removingTag
    }
}

export default connect(mapStateToProps, { getAllNotes, getStarNotes, getTrashNotes, getTagNotes, getSpecificNote })(MiddleMenu);