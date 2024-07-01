import styled, { keyframes } from 'styled-components';
// import { Box, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';

// export const Subtitle = styled.h1`
//     font-size: 25px;
//     margin-bottom: 20px;
// `;

// export const TextButton = styled.p`
//     font-size: 20px;
//     color: black;
//     margin: 0px;
//     text-align: center;
// `;

export const SquareDisplay = styled.p`
    width: 180px;
    height: 100px;
    border-radius: 50px;
    text-decoration: none;
    background-color: #DFDFE6; 
    font-size: 16px;
    color: #3E3E40;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// export const SquareButton = styled.a`
//     width: 300px;
//     height: 200px;
//     border-radius: 10px;
//     padding: 20px;
//     text-decoration: none;
//     border: 2px solid #BABABF;
//     background-color: transparent;
//     font-size: 16px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;

//     &:hover {
//         background-color: #f0f0f0;
//         transition: 0.5s;
//     }

//     &:hover ${TextButton} {
//         color: #3E3E40;
//     }
// `;

export const slide = keyframes`
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

// const AnnouncementBarContainer = styled(Box)`
//     width: 100%;
//     background-color: #ff9800;
//     color: #fff;
//     text-align: center;
//     padding: 10px 0;
//     position: relative;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     overflow: hidden;
// `;

// const SlidingImage = styled.div`
//     display: inline-block;
//     white-space: nowrap;
//     will-change: transform;
//     animation: ${slide} 10s linear infinite;
// `;

// const StyledImage = styled.img`
//     max-width: none;
//     max-height: 150px;
//     width: auto;
//     height: auto;
//     display: block;
// `;

// const CloseButton = styled(IconButton)`
//     position: absolute;
//     right: 10px;
// `;

export const Subtitle = styled.h1`
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
    color: #1b1f27;
`;

export const SquareButton = styled(Button)`
    width: 250px;
    height: 250px;
    background-color: #ffffff;
    border: 2px solid #5479f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
        background-color: #e6e6e6;
    }
`;

export const TextButton = styled.span`
    font-size: 1.2rem;
    color: #1b1f27;
    margin-bottom: 10px;
    text-align: center;
`;

export const CardContentBox = styled.div`
    width: 100%;
    margin-top: 10px;
`;

export const TestButton = styled(Button)`
    background-color: #5479f7;
    border-radius: 20px;
    padding: 20px 40px;
    font-size: 18px;
    font-weight: bold;

    &:hover {
        background-color: #415bc4;
    }
`;