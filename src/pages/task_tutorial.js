import React, { useState } from "react";
import ReactPlayer from "react-player";
import CamRec from "../Tools/CamRec";
import { Button, Box, Grid, Typography, Container, makeStyles, Fab } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
    panel: {
        height: '100vh'
    },
    title: {
        fontWeight: 500
    },
    round: {
        borderRadius: '1rem',
        overflow: "hidden"
    },
    media: {
        height: '100%',
        width: '100%'
    }
}));

function Task_tutorial(props) {
    const [count, setCount] = useState(1);
    const [complete, setComplete] = useState(false);
    const [buttonName, setButtonName] = useState("Start Task");
    const classes = useStyle();
    const taskName = "TASK" + count;

    let Player;
    if (complete) {
        Player = <CamRec taskCount={count} />;
    } else if (count === 1) {
        Player = <ReactPlayer className={classes.round} url="https://youtu.be/uRjPKH_SgAM" />;
    } else if (count === 2) {
        Player = <ReactPlayer className={classes.round} url="https://youtu.be/kL757TueRVE" />; 
    } else if (count === 3) {
        Player = <ReactPlayer className={classes.round} url="https://youtu.be/xjsbZp3DrlQ" />;
    } else {
        Player = <ReactPlayer className={classes.round} url="https://youtu.be/eG2vrNFcpRM" />;
    }
    const toggle = () => {
        setComplete(!complete);
        if (complete) {
            setCount(count + 1);
            setButtonName("Start Task");
        } else {
            setButtonName("Next Task");
        }
    };

    let buttonElement = (
        <Fab color="primary" variant="extended" onClick={toggle}>
            <Typography>{buttonName}</Typography>
        </Fab>
    );

    if (count === 4 && complete) {
        buttonElement = <> </>;
    }



    return (
        <Container>
            <Box className={classes.panel} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box m={1}/>
                {Player}
                <Box m={1}/>
                {buttonElement}
            </Box>
        </Container>
    );
}

export default Task_tutorial;
