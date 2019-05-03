import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
    color: ${({color}) => color};
    font-size: 24px;
`

const Icon = ({color, type, className}) => {
    const fontAwesomeIcon = {
        notes: 'fa fa-book-open',
        star: 'fa fa-star',
        tags: 'fa fa-tag',
        trash: 'fa fa-trash',
        dropdown: 'fa fa-angle-down'
    }
    return (
        <IconContainer className={className} color={color}>
            <span className={fontAwesomeIcon[type]}></span>
        </IconContainer>
    );
};

export default Icon;