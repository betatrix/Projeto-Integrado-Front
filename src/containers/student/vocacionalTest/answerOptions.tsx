import React from 'react';
import { IconButton, Tooltip, useMediaQuery } from '@mui/material';
import EmojiVoquinhoChorando from '../../../assets/img/emoji-voquinho-chorando.png';
import EmojiVoquinhoTriste from '../../../assets/img/emoji-voquinho-triste.png';
import EmojiVoquinhoNeutro from '../../../assets/img/emoji-voquinho-neutro.png';
import EmojiVoquinhoFeliz from '../../../assets/img/emoji-voquinho-feliz.png';
import EmojiVoquinhoApaixonado from '../../../assets/img/emoji-voquinho-apaixonado.png';

interface AnswerOptionsProps {
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ value, onChange, disabled }) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const icons = [
        { id: 'emoji1', value: 1, src: EmojiVoquinhoChorando, label: 'Não me identifico com isso de forma alguma' },
        { id: 'emoji2', value: 2, src: EmojiVoquinhoTriste, label: 'Isso não reflete muito quem eu sou' },
        { id: 'emoji3', value: 3, src: EmojiVoquinhoNeutro, label: 'Não tenho uma opinião definida sobre isso' },
        { id: 'emoji4', value: 4, src: EmojiVoquinhoFeliz, label: 'Tenho uma conexão razoável com isso' },
        { id: 'emoji5', value: 5, src: EmojiVoquinhoApaixonado, label: 'Isso reflete muito quem eu sou!' },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            {icons.map((iconData) => (
                <Tooltip title={iconData.label} key={iconData.value}>
                    <span>
                        <IconButton
                            onClick={() => onChange(iconData.value)}
                            color={value === iconData.value ? 'primary' : 'default'}
                            disabled={disabled}
                            style={{
                                marginLeft: '23px',
                                marginRight: '23px',
                                transition: 'filter 0.2s ease',
                                filter: value === iconData.value ? 'brightness(0.35)' : 'brightness(1)',
                            }}
                            id={iconData.id}
                        >
                            <img src={iconData.src} alt={iconData.label}
                                style={{
                                    width: isMobile ? '40px' : '57px',
                                    marginTop: isMobile ? '25px' : '0px',
                                    marginBottom: isMobile ? '20px' : '0px'
                                }} />
                        </IconButton>
                    </span>
                </Tooltip>
            ))}
        </div>
    );
};

export default AnswerOptions;
