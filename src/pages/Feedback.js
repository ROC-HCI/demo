import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Spinner, Container, Row, Col } from "reactstrap";
import axios from "axios";

function Feedback() {
    const [features, setFeatures] = useState();
    const [feature1, setFeature1] = useState();
    const [feature2, setFeature2] = useState();
    const [feature3, setFeature3] = useState();
    const [feature4, setFeature4] = useState();
    const [inference, setInference] = useState();
    const [inference1, setInference1] = useState();
    const [inference2, setInference2] = useState();
    const [inference3, setInference3] = useState();
    const [inference4, setInference4] = useState();
    const [display, setDisplay] = useState(false);
    const [displayInference, setDisplayInference] = useState(false);

    let location = useLocation();
    let videoLocation = ['gs://park3-a3a67.appspot.com/test/1.webm', 'gs://park3-a3a67.appspot.com/test/2.webm', 'gs://park3-a3a67.appspot.com/test/3.webm', 'gs://park3-a3a67.appspot.com/test/4.webm'];
    let videoTest = ['gs://park3-a3a67.appspot.com/test/3.webm']
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
    const videoURL = "https://image-pipeline-bsniz3romq-ue.a.run.app"
    const inferenceMimicURL = "https://inference-bsniz3romq-ue.a.run.app/mimic";
    const inferenceAudioURL = "https://inference-bsniz3romq-ue.a.run.app/fox";
    const plotURL = "https://inference-bsniz3romq-ue.a.run.app/plot";
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const post1URL = audioURL;
    const post2URL = inferenceMimicURL;
    const post3URL = videoURL;

    useEffect(() => {
        getFeedback();
    }, []);

    function getFeedback() {
        var data = JSON.stringify({"uri":videoLocation,"use_fast":true});
        console.log("Sending for Feedback ...");
        
        // POST request using axios inside useEffect React hook
        const videoForFeedback = {
            method: 'post',
            url: 'https://image-pipeline-bsniz3romq-ue.a.run.app',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            
        };

        axios(videoForFeedback)
            .then((response) => {
                console.log(response.data.features);
                //setFeatures(response.data.features); //TODO: Object is not a react child error
                setFeature1(response.data.features['1']);
                setFeature2(response.data.features['2']);
                setFeature3(response.data.features['3']);
                setFeature4(response.data.features['4']);
                setDisplay(true);
                console.log(response.data);
                console.log("SUCCESS");
            })
            .catch((error) => {
                console.error("There was an error in 1st post!", error);
            });
    }

    function getInference() {
        console.log("Sending  for Inference 1...");
        console.log(feature1);
        axios
            .post(post2URL, feature1)
            .then((response) => {
                console.log(response.data);
                setInference1(response.data);
                setDisplayInference(true);
            })
            .catch((error) => {
                console.error("There was an error in 2nd post !", error);
            });
            console.log("Sending  for Inference 2...");
            axios
            .post(post2URL, feature2)
            .then((response) => {
                console.log(response.data);
                setInference2(response.data);
                setDisplayInference(true);
            })
            .catch((error) => {
                console.error("There was an error in 2nd post !", error);
            });
            console.log("Sending  for Inference 3...");

            axios
            .post(post2URL, feature3)
            .then((response) => {
                console.log(response.data);
                setInference3(response.data);
                setDisplayInference(true);
            })
            .catch((error) => {
                console.error("There was an error in 2nd post !", error);
            });
            console.log("Sending  for Inference 4...");
            axios
            .post(inferenceAudioURL, feature4)
            .then((response) => {
                console.log(response.data);
                setInference4(response.data);
                setDisplayInference(true);
            })
            .catch((error) => {
                console.error("There was an error in 2nd post !", error);
            });
    }

    if (display) {
        var allFeatures;
        for (var key in feature1) {
            // console.log("Key: " + key);
            console.log("Feature: " + feature1[key]);
            allFeatures = feature1[key];
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
            if (key === "shap") {
                shap = inference[key]["1.wav"];
            } else if (key === "prediction") {
                prediction = inference[key]["1.wav"];
            } else if (key === "confidence") {
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

    return (
        <div>
            {feedback}
        </div>
    );
}

export default Feedback;
