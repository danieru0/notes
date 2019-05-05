import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getAllNotes, getStarNotes, getTrashNotes, getTagNotes } from '../../actions/notesActions';

import Icon from '../Icon/Icon';
import Nav from './Nav';
import Note from './Note';

const MiddleMenuContainer = styled.div`
    width: 16%;
    height: 100vh;
    background: #333840;

    @media (max-width: 1300px) {
        width: 220px;
    }

    @media (max-width: 1110px) {
        overflow-y: auto;
        z-index: 1;
        left: 250px;
        width: ${({menuActive}) => ( menuActive ? '250px' : '0' )};
        position: ${({menuActive}) => ( menuActive ? 'absolute' : 'none' )};
    }

    @media (max-width: 700px) {
        left: 200px;
    }

    @media (max-width: 650px) {
        left: auto;
        right: 0;
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

class MiddleMenu extends Component {
    constructor() {
        super();
        this.state = {
            isMenuActive: false
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

    render() {
        const { notes } = this.props;
        return (
            <MiddleMenuContainer menuActive={this.state.isMenuActive}>
                <MiddleMenuShowButton onClick={this.toggleMenu}>
                    <StyledIcon color="#545962" type="hamburger" />
                </MiddleMenuShowButton>
                <Nav />
                <MiddleMenuList>
                    {
                        notes ? (
                            Object.keys(notes).map(item => {
                                let note = notes[item];
                                return (
                                    <MiddleMenuItem>
                                        <Note key={item} title={note.name} description={note.value} color={note.color} date="Aug. 24" />
                                    </MiddleMenuItem>
                                )
                            })
                        ) : (
                            ''
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
        notes: state.notesReducer.notes
    }
}

export default connect(mapStateToProps, { getAllNotes, getStarNotes, getTrashNotes, getTagNotes })(MiddleMenu);