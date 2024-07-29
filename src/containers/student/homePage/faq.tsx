import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import * as React from 'react';
import {
    faqBoxStyles,
    innerBoxStyles,
    listStyles,
    listItemIconStyles,
    listItemTextStyles,
    FaqTitle,
} from './styles';

export const Faq: React.FC = () => {
    const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>({});

    const handleClick = (item: string) => {
        setOpenItems(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));
    };
    return (
        <Box sx={faqBoxStyles}>
            <Box sx={innerBoxStyles}>
                <Typography sx={FaqTitle} component="span">
                    Perguntas Frequentes
                </Typography>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item1')}>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={listItemIconStyles}/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='O que é um teste vocacional?' />
                        {openItems['item1'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item1']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='Um teste vocacional é uma ferramenta que ajuda a
                                        identificar suas aptidões, interesses e habilidades, sugerindo possíveis carreiras e áreas de estudo que se alinham com seu perfil.' />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item2')}>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={listItemIconStyles}/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='Como funciona o teste vocacional?' />
                        {openItems['item2'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item2']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='O teste consiste em uma série de perguntas sobre seus
                                        interesses, habilidades e preferências. Com base nas suas respostas, ele gera um relatório com sugestões de carreiras e cursos
                                        adequados para você.' />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item3')}>
                        <ListItemIcon >
                            <QuestionAnswerIcon sx={listItemIconStyles} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='Como posso entrar em contato com uma universidade específica?' />
                        {openItems['item3'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item3']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='Cada página de universidade inclui detalhes de contato,
                                        como endereço, telefone e e-mail. Você também pode encontrar links para os sites oficiais das universidades.' />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item4')}>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={listItemIconStyles} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='Como criar uma conta no site?' />
                        {openItems['item4'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item4']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='Clique no botão "Cadastre-se" no centro da primeira
                                         página e preencha o formulário com suas informações pessoais.' />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
                <Box sx={listStyles}>
                    <ListItemButton onClick={() => handleClick('item5')}>
                        <ListItemIcon>
                            <QuestionAnswerIcon sx={listItemIconStyles}/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }}
                            primary='Como posso salvar minhas pesquisas e resultados de testes?' />
                        {openItems['item5'] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openItems['item5']} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ sx: listItemTextStyles }} primary='Após criar uma conta, fazer login e realizar um
                                        teste você terá salvo em sua página os resultados do testes, acessível a qualquer momento.'/>
                            </ListItemButton>
                        </List>
                    </Collapse>
                </Box>
            </Box>
        </Box >
    );
};

export default Faq;
