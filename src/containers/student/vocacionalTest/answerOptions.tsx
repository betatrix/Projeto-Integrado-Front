import React from 'react';
import { IconButton, Tooltip } from '@mui/material';

interface AnswerOptionsProps {
    value: number;
    onChange: (value: number) => void;
    disabled: boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ value, onChange, disabled }) => {
    const icons = [
        { value: 1, src: 'src/assets/img/SVG-emoji-voquinho-chorando.svg', label: 'Não me identifico com isso de forma alguma' },
        { value: 2, src: 'src/assets/img/SVG-emoji-voquinho-triste.svg', label: 'Isso não reflete muito quem eu sou' },
        { value: 3, src: 'src/assets/img/SVG-emoji-voquinho-neutro.svg', label: 'Não tenho uma opinião definida sobre isso' },
        { value: 4, src: 'src/assets/img/SVG-emoji-voquinho-feliz.svg', label: 'Tenho uma conexão razoável com isso' },
        { value: 5, src: 'src/assets/img/SVG-emoji-voquinho-apaixonado.svg', label: 'Isso reflete muito quem eu sou!' },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '30px' }}>
            {icons.map((iconData) => (
                <Tooltip title={iconData.label} key={iconData.value}>
                    <span>
                        <IconButton
                            onClick={() => onChange(iconData.value)}
                            color={value === iconData.value ? 'primary' : 'default'}
                            disabled={disabled}
                            style={{
                                margin: '0 10px',
                                transition: 'filter 0.2s ease',
                                filter: value === iconData.value ? 'brightness(0.7)' : 'brightness(1)', // Escurece a imagem selecionada
                            }}
                        >
                            <img src={iconData.src} alt={iconData.label} style={{ width: '175px', borderRadius: '8px' }} />
                        </IconButton>
                    </span>
                </Tooltip>
            ))}
        </div>
    );
};

export default AnswerOptions;
