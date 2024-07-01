import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled, { keyframes } from 'styled-components';
import banner from '../../assets/img/banner.png';

const slide = keyframes`
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(-100%);
    }
`;

const AnnouncementBarContainer = styled(Box)`
    width: 100%;
    background-color: #ff9800;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const SlidingImage = styled.div`
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
    animation: ${slide} 10s linear infinite;
`;

const StyledImage = styled.img`
    max-width: none;
    max-height: 70px;
    width: auto;
    height: auto;
    display: block;
`;

const CloseButton = styled(IconButton)`
    position: absolute;
    right: 300px;
    bottom: 25px; 
`;

interface AnnouncementBarProps {
    imageUrl: string;
    onClose: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onClose }) => {
    return (
        <AnnouncementBarContainer>
            <SlidingImage>
                <StyledImage src={banner} alt="Cursos Pré-Vestibular" />
            </SlidingImage>
            <Tooltip title='Fechar'>
                <CloseButton onClick={onClose} color="inherit">
                    <CloseIcon />
                </CloseButton>
            </Tooltip>
        </AnnouncementBarContainer>
    );
};

export default AnnouncementBar;
