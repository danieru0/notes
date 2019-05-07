import React from 'react';
import styled from 'styled-components';

const CircleComponent = styled.div`
    width: ${({size}) => (size === 'big' ? '18px' : '12px' )};
    height: ${({size}) => (size === 'big' ? '18px' : '12px' )};
    background: ${({color}) => color};
    border-radius: 50%;
`

const Circle = ({color, size, className, onClick}) => {
    return (
        <CircleComponent onClick={onClick} color={color} size={size} className={className} />
    );
};

export default Circle;