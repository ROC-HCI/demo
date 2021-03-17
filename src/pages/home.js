import React, { useState, useEffect, useRef } from 'react'
import Link from 'react-router-dom/Link'
import LandingImage from "./stock.png";
import { Button, Box, Grid,Typography, AppBar, makeStyles, Fab } from '@material-ui/core'
import "../home.css";

const useStyle = makeStyles(theme => ({
    panel: {
        height: '100vh'
    },
    title: {
        fontWeight: 600
    },
    media: {
        height: '100%',
        width: '100%'
    }
}));

export const Panel = (props) => {
    const classes = useStyle();
    return (
        <Grid 
            item container 
            className={classes.panel} 
            xs={props.xs} spacing={2} 
            justify={props.justify ?? "center"} 
            alignContent={props.alignContent ?? "center"}
        >
            {props.children}
        </Grid>
    );
}

const Home = (props) => {
    const classes = useStyle();
        
        return (
            <Grid container spacing={2}>
                <Panel xs={6}>
                    <Box m={1}>
                        <Box mb={5}>
                            <Typography className={classes.title} color="primary" variant="h1">PARK FRAMEWORK</Typography>
                            <Box m={1}/>
                            <Typography variant="h5">
                                The PARK system enables the measurement of Parkinson's disease for anyone, anywhere - via webcam
                            </Typography>
                        </Box>
                        <Link to="/task_tutorial">
                        <Fab color="primary" variant="extended">
                            Start Study
                        </Fab>
                        </Link>
                    </Box>
                </Panel>
                <Panel xs={6}>
                    <img alt="landing page" src={LandingImage}/>
                </Panel>    
            </Grid>
        );
}

export default Home;
