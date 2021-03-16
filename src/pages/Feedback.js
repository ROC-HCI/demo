import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Spinner, Container, Row, Col } from "reactstrap";
import axios from "axios";
import ButtonM from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import Lottie from 'react-lottie'
import load from '../lotties/loading';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import {PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis} from 'recharts'

function Feedback() {
    const [features, setFeatures] = useState();
    const [feature1, setFeature1] = useState();
    const [feature2, setFeature2] = useState();
    const [feature3, setFeature3] = useState();
    const [feature4, setFeature4] = useState();
    const [inference, setInference] = useState();
    const [inference1, setInference1] = useState();
    const [inference2, setInference2] = useState();
    const [display, setDisplay] = useState(false);
    const [displayInference, setDisplayInference] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showFeedback, setFeedback] = useState(false);
    const [moreFace, setMoreFace] = useState(false);
    const [moreSpeech, setMoreSpeech] = useState(false);
    const [explainFace, setExplainFace] = useState(false);
    const [explainSpeech, setExplainSpeech] = useState(false);

    const delay = ms => new Promise(res => setTimeout(res, ms));

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
    const post4URL = inferenceAudioURL;

    useEffect(async () => {
        await getFeedback();
    }, []);

    useEffect(async () => {
        if (!(feature1 == null || feature2 == null || feature3 == null || feature4 == null)) {
            await getInference();
        }
    }, [feature1, feature2, feature3, feature4]);

    async function getFeedback() {
        var face_data = JSON.stringify({"uri":videoLocation.slice(0, 3),"use_fast":true});
        console.log("Sending Video for Feedback ...");
        
        // POST request using axios inside useEffect React hook
        const videoForFeedback = {
            method: 'post',
            url: 'https://image-pipeline-bsniz3romq-ue.a.run.app',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : face_data
            
        };

        await axios(videoForFeedback)
            .then((response) => {
                console.log(response.data.features);
                //setFeatures(response.data.features); //TODO: Object is not a react child error
                setFeature1(response.data.features['1']);
                setFeature2(response.data.features['2']);
                setFeature3(response.data.features['3']);
                setDisplay(true);
                console.log(response.data);
                console.log("SUCCESS");
            })
            .catch((error) => {
                console.error("There was an error in 1st post!", error);
            });


        var audio_data = JSON.stringify({"uri":videoLocation.slice(3,4),"use_fast":true});
        console.log("Sending Audio for Feedback ...");
        
        // POST request using axios inside useEffect React hook
        const audioForFeedback = {
            method: 'post',
            url: 'https://audio-pipeline-bsniz3romq-ue.a.run.app/fox',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : audio_data
            
        };
        
        await axios(audioForFeedback)
            .then((response) => {
                console.log("SUCCESS AUDIO");
                console.log(response.data.features);
                //setFeatures(response.data.features); //TODO: Object is not a react child error
                setFeature4(response.data.features);
            })
            .catch((error) => {
                console.error("There was an error in 1st post!", error);
            });


    }

    async function getInference() {
        console.log("Sending  for Inference Video...");
        const mimic_features = {"features" : [{"smile" : feature1, "disgust": feature2, "surprise": feature3}]};
        console.log(mimic_features);
        await axios
            .post(post2URL, mimic_features)
            .then((response) => {
                console.log(response.data);
                setInference1(response.data);
                setDisplayInference(false);
            })
            .catch((error) => {
                console.error("There was an error in 2nd post !", error);
            });

            /* let audio = {feature4["4.wav"]};
            console.log(typeof audio);
            Object.keys(audio).forEach(function(key) {
                  if (key.startsWith('mfcc')) {
                    delete audio[key];
                  }
                });
                console.log(audio); */
            
            console.log("Sending  for Inference Audio...");
            const audio = feature4["4.wav"];
            var a = [];
            a.push(audio);
            const audio_features = {"features" : a};
            console.log({"features" : a});
        await axios
            .post(post4URL, audio_features)
            .then((response) => {
                console.log(response.data);
                setInference2(response.data);
                setDisplayInference(false);
            })
            .catch((error) => {
                console.error("There was an error in 2nd post !", error);
            });
        await delay(5000);
        setFeedback(true);
        setLoading(false);
    }


    if(loading){

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: load,
            rendererSettings: {
                preserveAspectRation: "xMidYMid slice"
        }};

        feedback = (<div style = {{display: 'flex', flexDirection: 'column', backgroundColor: 'white', height:'100vh'}}>
        <div style = {{textAlign: 'center'}}>
        <h1 style = {{color: 'black'}}>YOUR RESULTS ARE LOADING</h1></div>
        <Lottie 
            options = {defaultOptions}
            height = {400}
            width = {400} 
            style = {{fill: 'red', stroke: 'black'}}
            />
        </div>);
    }


    if(showFeedback) {
        let prediction = inference2.prediction[0];
        let confidence = inference2.confidence[0][0] * 100;
        let shap = inference2.shap[0];
        confidence = Math.floor(confidence);

        console.log("CONFIDENCE");
        console.log(confidence);
        console.log("INFERNCE 1");
        console.log(inference1);
        console.log("INFERNCE 2");
        console.log(inference2);


        let handleOpenMoreFace = () => {
            setMoreFace(true);
          };
          let handleCloseMoreFace = () => {
            setMoreFace(false);
          };
          
          let handleOpenMoreSpeech = () => {
            setMoreSpeech(true);
          };
          let handleCloseMoreSpeech = () => {
            setMoreSpeech(false);
          };
    
          let handleOpenExplainFace = () => {
            setExplainFace(true);
          };
          let handleCloseExplainFace = () => {
            setExplainFace(false);
          };
          
          let handleOpenExplainSpeech = () => {
            setExplainFace(true);
          };
          let handleCloseExplainSpeech = () => {
            setExplainSpeech(false);
          };
        
          const COLORS = ['white','#003b71'];
          const face_data = [{"name":"face","value":confidence-8}]
          const speech_data = [{"name":"speech","value":confidence}]
          const overall_data = [
            {
              "name": "Group A",
              "value": 100-confidence,
            },
            {
                "name": "Group B",
                "value": confidence,
            },
          ];

        feedback = <div>
        <div>
            <h1 style={{textAlign: 'center', marginLeft: '60px'}}>YOUR RESULTS <p1 style={{fontSize: 14, color: 'red'}}>[rough sketch]</p1></h1>
        </div>
        <div id="cards" style={{display: 'flex', flexDirection: 'row', margin: 'auto', width: '60%'}}>
            <div id="main_score" style={{ width: '18rem', 
                                height: '75vh',
                                border: '1px solid', 
                                padding: '10px',
                                marginRight: '10px',
                                marginTop: '10px',
                                marginBottom: '10px',
                                boxShadow: '5px 10px midnightblue'}} 
                >
                        <h2>OVERALL </h2>
                        <p1>
                            {prediction === 0 ? "Initial analyzes show that you DO NOT have Parkinson's Disease. Please keep in mind this is not an official medical Diagnosis" 
                             : "Initial analyzes show that you may have Parkinson's Disease. Please keep in mind this is not an official medical Diagnosis. We reccomend you seek professional opinion"    
                            }
                        </p1>
                        <PieChart width={250} height={250}>
                        <text style={{fontSize: '2rem',
                                      fontFamily: 'Arial',
                                    }} 
                            x={125} y={125} 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            scaleToFit='true'>
                            {String(confidence)+"/100"}
                        </text>
                        <Pie
                            data={overall_data}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {overall_data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        </PieChart>
            </div>
            <div id="alt_scores" style={{display: 'flex', flexDirection: 'column'}}>
                <div id="task_scores" style={{display: 'flex', flexDirection: 'row'}}>
                    <div id="face_score" style={{ width: '18rem', 
                                height: '40vh',
                                border: '1px solid', 
                                padding: '10px',
                                margin: '10px',
                                boxShadow: '5px 10px midnightblue'}} >
                            <h2>
                                FACE
                            </h2>
                            <p1>
                            Here is the cumulative score of your facial tasks. 
                        </p1>
    <BarChart 
        data={face_data}
        layout="vertical"
        margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
        width={300} height={50}
        style={{marginTop: '20px', marginBottom: '20px'}}
        >
        <XAxis type="number" domain={[0, 5]} hide/>
        <YAxis type="category" width={15} dataKey="value" orientation="right" axisLine={false} tickLine={false} 
            style={{fontSize: '1.5rem',
                    fontFamily: 'Arial',
                }} tick={{fill: 'black'}}
        />
        <Bar 
            dataKey="value" 
            fill="#003b71"
        /> 
    </BarChart>
    <Button variant="contained" size='small' style= {{backgroundColor: "#003b71", color: 'white', marginRight: '10px', marginTop: '10px'}} onClick={handleOpenMoreFace}>
more info +
</Button>

    <Dialog
            open={moreFace}
            onClose={handleCloseMoreFace}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              Your Score in Relation to Others
            </DialogTitle>
            <DialogActions>
              <p1>this is where you'll find an relative diagnosis</p1>
            </DialogActions>
          </Dialog>

<Button variant="contained" size='small' style= {{backgroundColor: "#003b71", color: 'white', marginLeft: '65px', marginTop: '10px'}} onClick={handleOpenExplainFace}>
explain
</Button>

        <Dialog
            open={explainFace}
            onClose={handleCloseExplainFace}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              Your Facial Task Results Explained
            </DialogTitle>
            <DialogActions>
              <p1>this is where you'll find an explainable diagnosis</p1>
            </DialogActions>
          </Dialog>
                                
        </div>
        <div id="speech_score" style={{ width: '18rem', 
                                height: '40vh',
                                border: '1px solid', 
                                padding: '10px',
                                margin: '10px',
                                boxShadow: '5px 10px midnightblue'}} >
                            <h2>
                                SPEECH
                            </h2>
                            <p1>
                            Here is the cumulative score of your speech tasks. 
                        </p1>
    <BarChart 
        data={speech_data}
        layout="vertical"
        margin={{ top: 0, right: 50, left: 0, bottom: 0 }}
        width={300} height={50}
        style={{marginTop: '20px', marginBottom: '20px'}}
        >
        <XAxis type="number" domain={[0, 5]} hide/>
        <YAxis type="category" width={15} dataKey="value" orientation="right" axisLine={false} tickLine={false} 
            style={{fontSize: '1.5rem',
                    fontFamily: 'Arial',
                }} tick={{fill: 'black'}}
        />
        <Bar 
            dataKey="value" 
            fill="#003b71"
        /> 
    </BarChart>
    <Button variant="contained" size='small' style= {{backgroundColor: "#003b71", color: 'white', marginRight: '10px', marginTop: '10px'}} onClick={handleOpenMoreSpeech}>
more info +
</Button>

    <Dialog
            open={moreSpeech}
            onClose={handleCloseMoreSpeech}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              Your Score in Relation to Others
            </DialogTitle>
            <DialogActions>
              <p1>this is where you'll find an relative diagnosis</p1>
            </DialogActions>
          </Dialog>

<Button variant="contained" size='small' style= {{backgroundColor: "#003b71", color: 'white', marginLeft: '65px', marginTop: '10px'}} onClick={handleOpenExplainSpeech}>
explain
</Button>

        <Dialog
            open={explainSpeech}
            onClose={handleCloseExplainSpeech}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              Your Speech Task Results Explained
            </DialogTitle>
            <DialogActions>
              <p1>this is where you'll find an explainable diagnosis</p1>
            </DialogActions>
          </Dialog>
                                
        </div>
        </div>
                <div id="score_distributions" style={{ width: '37rem', 
                                height: '30vh',
                                border: '1px solid', 
                                padding: '10px',
                                margin: '15px',
                                boxShadow: '5px 10px midnightblue'}}>
                                    <h2>
                                DISTRIBUTION OF SCORES
                            </h2>
                        

                        <img width='400' height='120' src={shap}/>

                                </div>
            
            
            </div>

        </div>
            <Button color='inherit' component={Link} to="/">
                To Home
            </Button>
        </div>

    }

    return (
        <div>
            {feedback}
        </div>
    );
}

export default Feedback;
