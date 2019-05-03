import React from 'react';
import styled from 'styled-components';

const CircleComponent = styled.div`
    width: ${({size}) => (size === 'big' ? '18px' : '10px' )};
    height: ${({size}) => (size === 'big' ? '18px' : '10px' )};
    background: ${({color}) => color};
    border-radius: 50%;
`

const Circle = ({color, size}) => {
    return (
        <CircleComponent color={color} size={size} />
    );
};

export default Circle;