import { Box, Collapse, Grid, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import * as React from 'react';
import {
    faqBoxStyles,
    gridContainerStyles,
    innerBoxStyles,
    listStyles,
    listItemIconStyles,
    listItemTextStyles,
    dividerBoxTestFaqStyles,
    FaqTitle,
} from './styles';
import { useTranslation } from 'react-i18next';

export const Faq: React.FC = () => {
    const [openItems, setOpenItems] = React.useState<{ [key: string]: boolean }>({});
    const{ t } = useTranslation();

    const handleClick = (item: string) => {
        setOpenItems(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));
    };
    return (
        <>
            <Box sx={faqBoxStyles}>
                <Grid alignItems="colum" justifyContent="flex-start" sx={gridContainerStyles}>
                    <Typography variant="h3" sx={FaqTitle}>
                        {t('faqTitle')}
                    </Typography>
                    <Box sx={dividerBoxTestFaqStyles} />
                    <Box sx={innerBoxStyles}>
                        <List sx={listStyles}>
                            <ListItemButton onClick={() => handleClick('item1')}>
                                <ListItemIcon sx={listItemIconStyles}>
                                    <QuestionAnswerIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '1.5rem'}} primary={t('faqTitleText1')}/>
                                {openItems['item1'] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openItems['item1']} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primaryTypographyProps={{ fontSize: '1.3rem'}} primary={t('faqText1')} />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={() => handleClick('item2')}>
                                <ListItemIcon sx={listItemIconStyles}>
                                    <QuestionAnswerIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '1.5rem'}} primary={t('faqTitleText2')} />
                                {openItems['item2'] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openItems['item2']} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primaryTypographyProps={{ fontSize: '1.3rem'}} primary={t('faqText2')} />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={() => handleClick('item3')}>
                                <ListItemIcon sx={listItemIconStyles}>
                                    <QuestionAnswerIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '1.5rem'}} primary={t('faqTitleText3')} />
                                {openItems['item3'] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openItems['item3']} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primaryTypographyProps={{ fontSize: '1.3rem'}} primary={t('faqText3')} />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={() => handleClick('item4')}>
                                <ListItemIcon sx={listItemIconStyles}>
                                    <QuestionAnswerIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '1.5rem'}} primary={t('faqTitleText4')} sx={listItemTextStyles} />
                                {openItems['item4'] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openItems['item4']} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primaryTypographyProps={{ fontSize: '1.3rem'}} primary={t('faqText4')} />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={() => handleClick('item5')}>
                                <ListItemIcon sx={listItemIconStyles}>
                                    <QuestionAnswerIcon />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '1.5rem'}} primary={t('faqTitleText5')} />
                                {openItems['item5'] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openItems['item5']} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon>
                                            <StarBorder />
                                        </ListItemIcon>
                                        <ListItemText primaryTypographyProps={{ fontSize: '1.3rem'}} primary={t('faqText5')} />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Grid>
            </Box >
        </>
    );
};

export default Faq;
