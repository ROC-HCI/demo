import React, { useState } from "react";
import ReactPlayer from "react-player";
import CamRec from "../Tools/CamRec";
import { Container, Button } from "reactstrap";

function Task_tutorial(props) {
    const [count, setCount] = useState(1);
    const [complete, setComplete] = useState(false);
    const [buttonName, setButtonName] = useState("Start Task");
    const taskName = "Task" + count;
    let Player;
    if (complete) {
        Player = <CamRec taskCount={count} />;
    } else if (count == 1) {
        Player = <div className = "video"><ReactPlayer className="react-player" url="https://youtu.be/YbqR1kH_9YM" /></div>;
    } else if (count == 2) {
        Player = <ReactPlayer url="https://youtu.be/eG2vrNFcpRM" />;
    } else if (count == 3) {
        Player = <ReactPlayer url="https://youtu.be/eGSug9VdR78" />;
    } else {
        Player = <ReactPlayer url="https://youtu.be/C2GSwTR2Fts" />;
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
        <Button className="m-4" onClick={toggle} right>
            {buttonName}
        </Button>
    );

    if (count == 3 && complete) {
        console.log("inside this");
        buttonElement = <> </>;
    }

    return (
        <Container className="" fluid={true}>
            <div className="d-flex align-items-center flex-column">
                <h1 className="m-4">{taskName}</h1>
                {Player}
                {buttonElement}
            </div>
        </Container>
    );
}

export default Task_tutorial;
