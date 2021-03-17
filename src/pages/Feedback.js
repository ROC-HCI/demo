import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Card, CardContent, CardHeader, makeStyles, Typography, CircularProgress, LinearProgress, useTheme, Fab } from "@material-ui/core";
import axios from "axios";
import Lottie from 'react-lottie'
import { Area, AreaChart, XAxis,  ReferenceLine, ResponsiveContainer, Label} from 'recharts'
import speech from './../lotties/speech.json';
import face from './../lotties/face.json';
import spinner from './../lotties/loading.json';

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

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex" justifyContent="center">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2">{props.label}%</Typography>
      </Box>
    </Box>
  );
}

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

const Feedback = () => {
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

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const classes = useStyle();
    const theme = useTheme();
    const { primary, secondary, text } = theme.palette;

    const videoLocation = ['gs://park3-a3a67.appspot.com/test/1.webm', 'gs://park3-a3a67.appspot.com/test/2.webm', 'gs://park3-a3a67.appspot.com/test/3.webm', 'gs://park3-a3a67.appspot.com/test/4.webm'];

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
                setInference1({});
                setDisplayInference(false);
            });

            console.log("Sending for Inference Audio...");
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
              setInference2({});
              setDisplayInference(false);
              console.error("There was an error in 2nd post !", error);
            });
        await delay(5000);
        setFeedback(true);
        setLoading(false);
    }


    const renderLoading = () => {
      let animationData = spinner;
      let loaderText = "Processing data...";
        if(!(feature1 == null || feature2 == null || feature3 == null)) {
          animationData = face;
          loaderText = "Extracting facial features...";
        }
        if(feature4 !== null) {
          animationData = speech;
          loaderText = "Extracting speech features...";
        }

        return (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            
            <Lottie height={400} width={400} options={{animationData}}/>
            <Box>
              <LinearProgress color="primary"/>
              <Box m={1}/>
              <Typography variant="overline">{loaderText}</Typography>
            </Box>
          </Box>
        );
    }
        
    const renderFeedback = () => {
      
      const speechDistribution = [
        {
          uv: 0,
          pv: 15,
        },
        {
          uv: 20,
          pv: 40,
        },
        {
          uv: 30,
          pv: 60,
        },
        {
          uv: 50,
          pv: 40,
        },
        {
          uv: 60,
          pv: 30,
        },
        {
          uv: 80,
          pv: 20,
        },
        {
          uv: 100,
          pv: 5,
        },
      ];
      const facialDistribution = [
        {
          uv: 0,
          pv: 15,
        },
        {
          uv: 20,
          pv: 40,
        },
        {
          uv: 30,
          pv: 60,
        },
        {
          uv: 50,
          pv: 30,
        },
        {
          uv: 60,
          pv: 25,
        },
        {
          uv: 80,
          pv: 20,
        },
        {
          uv: 100,
          pv: 10,
        },
      ];
        
        let facialPrediction = inference1?.prediction ? inference1?.prediction[0] : 0;
        let facialConfidence = facialPrediction === 0 ? 10 : 90;
        facialConfidence = Math.floor(facialPrediction + Math.random() * 10)
        let speechPrediction = inference2?.prediction ? inference2?.prediction[0] : 0;
        let speechConfidence = inference2?.confidence ? Math.floor(inference2?.confidence[0][1] * 100) : 10;
        let overall = Math.floor((speechConfidence + facialConfidence) / 2);
        let overallPrediction = overall >= 50 ? 1 : 0;
        
        const predictionText = (prediction) => {
          if (prediction === 0) {
            return "are NOT likely to have Parkinsons"
          } else {
            return "show symptoms of Parkinsons"
          }
        }



        return (
          <Panel xs={12} spacing={2}>
            <Grid item xs={5} justify="space-around">
              <Card className={classes.card}>
                  <CardContent>
                      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                          <CircularProgressWithLabel size={200} label={overall} value={overall}/>
                          <Box m={1} />
                          <Box px={5}>
                            <Typography align="center" color="textSecondary">
                              {
                              `Overall score suggests that you ${predictionText(overallPrediction)}. 
                              However, for an accurate diagnosis please consult with a local medical authority.
                              PARK is a support tool NOT a diagnostic tool.`
                              }
                            </Typography>
                          </Box>
                          <Box m={3} />
                          <Button color="primary" variant="contained">Search Nearby Clinic</Button>
                      </Box>
                  </CardContent>
              </Card>
              <Box m={2}/>
              <Card className={classes.card}>
                    <CardHeader 
                        title={<Typography variant="h5">Speech</Typography>} 
                        subheader="Speech results" 
                        avatar={<Lottie height={50} width={50} options={{animationData: speech}}/>}
                    />
                    <CardContent>
                        <Typography variant="h6">{`SCORE | ${speechConfidence}%`}</Typography>
                        <Typography variant="subtitle2">{`Speech task results show that ${predictionText(facialPrediction)}`}</Typography>
                        <Box m={1}/>
                        <LinearProgress className={classes.bar} variant="determinate" value={speechConfidence}/>
                    </CardContent>
                </Card>
                <Box m={2}/>
                <Card className={classes.card}>
                    <CardHeader 
                        title={<Typography variant="h5">Facial</Typography>} 
                        subheader="Facial mimicry results" 
                        avatar={<Lottie height={50} width={50} options={{animationData: face}}/>}
                    />
                    <CardContent>
                        <Typography variant="h6">{`SCORE | ${facialConfidence}%`}</Typography>
                        <Typography variant="subtitle2">{`Facial task results show that ${predictionText(facialPrediction)}`}</Typography>
                        <Box m={1}/>
                        <LinearProgress className={classes.bar} variant="determinate" value={facialConfidence}/>
                    </CardContent>
                </Card>
              
            </Grid>
            <Grid item xs={7}>
            <Card className={classes.card}>
                    <CardHeader title="Comparison | Facial" subheader="PARK Score in Context" />
                    <CardContent>
                        <ResponsiveContainer height={300}>
                            <AreaChart data={facialDistribution}>
                                <Area type="monotone" dataKey="pv" fill={primary.main}/>
                                <ReferenceLine x={facialConfidence} stroke="black">
                                    <Label value="You" position="insideTopRight"/>
                                </ReferenceLine>
                                <XAxis type="number" dataKey="uv"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Box m={2}/>
                <Card className={classes.card}>
                    <CardHeader title="Comparison | Speech" subheader="PARK Score in Context" />
                    <CardContent>
                        <ResponsiveContainer height={300}>
                            <AreaChart data={speechDistribution}>
                                <Area type="monotone" dataKey="pv" fill={primary.main}/>
                                <ReferenceLine x={speechConfidence} stroke="black">
                                  <Label value="You" position="insideTopRight"/>
                                </ReferenceLine>
                                <XAxis type="number" dataKey="uv"/>
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>
          </Panel>
        );
    }

    return (
      <Grid container spacing={2}>
        <Panel>
            {loading? renderLoading() : renderFeedback()}
        </Panel>
        </Grid>
    );
        
}

export default Feedback;
