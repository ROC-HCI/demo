import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Spinner, Container, Row, Col } from "reactstrap";
import axios from "axios";

function Feedback() {
    const [features, setFeatures] = useState();
    const [inference, setInference] = useState();
    const [plot, setPlot] = useState();
    const [display, setDisplay] = useState(false);
    const [displayInference, setDisplayInference] = useState(false);
    const [displayPlot, setDisplayPlot] = useState(false);

    let location = useLocation();
    let videoLocation = location.state.url;
    let klot =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB9AAZRt20TQOrBFb6CVqxZtw7YR9C5a+QpcuBAAAAAACoBHQAAAAAAAAAqAR0AAAAAAAAAKgEdAAAAAAAAACoBHQAAAAAAAAAqAR0AAAAAAAAAKgEdAAAAAAAAACoBHQAAAAAAAAAqAR0AAAAAAAAAKgEdAAAAAAAAACoBHQAAAAAAAAAqAR0AAAAAAAAAAAAAAAqAR0AAAAAAAAAKgEdAAAAAAAAACoBHQAAAAAAAAAqAR0AAAAAAAAAKgEdAAAAAAAAACoBHQAAAAAAAAAqAR0AAAAAAAAAKgEdAAAAAAAAACoBHQAAAAAAAACq+htThoVSznchUgAAAABJRU5ErkJggg==";
    var feedback = (
        <Container className="my-4">
            <h4>Waiting for Feedback ...</h4>

            <Spinner
                className="mx-auto my-4"
                style={{ width: "10rem", height: "10rem" }}
                color="warning"
                type="grow"
            />
        </Container>
    );

    const audioURL = "https://audio-pipeline-bsniz3romq-ue.a.run.app/fox";
    const inferenceURL = "https://inference-bsniz3romq-ue.a.run.app/mimic";
    const plotURL = "https://inference-bsniz3romq-ue.a.run.app/plot";
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const post1URL = audioURL;
    const post2URL = inferenceURL;
    const post3URL = plotURL;

    useEffect(() => {
        getFeedback();
    }, []);

    function getFeedback() {
        console.log("Sending for Feedback ...");
        // POST request using axios inside useEffect React hook
        const videoForFeedback = {
            uri: [videoLocation],
        };

        axios
            .post(post1URL, videoForFeedback)
            .then((response) => {
                console.log(response.data.features);
                setFeatures(response.data.features);
                setDisplay(true);
            })
            .catch((error) => {
                console.error("There was an error in 1st post!", error);
            });
    }

    function getInference() {
        console.log("Sending  for Inference...");
        axios
            .post(post2URL, features)
            .then((response) => {
                console.log(response.data);
                setInference(response.data);
                setDisplayInference(true);
            })
            .catch((error) => {
                console.error("There was an error in 2nd post !", error);
            });

        axios
            .post(post3URL, features)
            .then((response) => {
                setPlot(response.data.plot);
                setDisplayPlot(true);
            })
            .catch((error) => {
                console.error("There was an error in 2nd post !", error);
            });
    }

    if (display) {
        var allFeatures;
        for (var key in features) {
            console.log("Key: " + key);
            allFeatures = features[key];
        }

        feedback = (
            <div>
                <h1>Features</h1>
                <Container>
                    <Row className="justify-content-md-center">
                        {Object.keys(allFeatures).map(function (key) {
                            return (
                                <Col xs="4">
                                    {key} : {allFeatures[key]}
                                </Col>
                            );
                        })}
                    </Row>
                    <Button color="primary" onClick={getInference}>
                        {" "}
                        Send For Inference{" "}
                    </Button>
                </Container>
            </div>
        );
    }

    let prediction;
    let confidence;
    let shap;
    if (displayInference) {
        Object.keys(inference).map(function (key) {
            if (key == "shap") {
                shap = inference[key]["1.wav"];
            } else if (key == "prediction") {
                prediction = inference[key]["1.wav"];
            } else if (key == "confidence") {
                confidence = inference[key]["1.wav"];
            }
        });

        feedback = (
            <Container>
                <h1>Inference</h1>
                <h4>Prediction:</h4>
                <Row>
                    <Col>{prediction}</Col>
                </Row>

                <h4> Confidence:</h4>
                <Row>
                    {confidence.map((value) => (
                        <Col>{value}</Col>
                    ))}
                </Row>

                <h4>Shap:</h4>
                <Row>
                    {shap.map((value) => (
                        <Col xs="3">{value}</Col>
                    ))}
                </Row>
                <br />
            </Container>
        );
    }

    var feedbackPlot = "";

    if (displayPlot) {
        console.log(plot);
        feedbackPlot = <img width="100%" src={plot["1.wav"]}></img>;
    }

    return (
        <div>
            {feedback}
            {feedbackPlot}
        </div>
    );
}

export default Feedback;
