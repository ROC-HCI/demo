import firebase from "firebase/app";
import React, { useRef, useState, useEffect } from "react";
import RecordRTC from "recordrtc";
import { NavLink } from "react-router-dom";
import "firebase/storage";
import { Container, Button } from "reactstrap";

const firebaseConfig = {
    apiKey: "AIzaSyBh950d6MYffytkSQts5FDeY6UzfPdgZjE",
    authDomain: "park3-a3a67.firebaseapp.com",
    databaseURL: "https://park3-a3a67.firebaseio.com",
    projectId: "park3-a3a67",
    storageBucket: "park3-a3a67.appspot.com",
    messagingSenderId: "238083710415",
    appId: "1:238083710415:web:3a8a34423698d5bb2386ba",
    measurementId: "G-1GXJD2VZEF",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const hasGetUserMedia = !!(
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

function CamRec(props) {
    //global states
    const [recordVideo, setRecordVideo] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [videoLocation, setVideoLocation] = useState("Initial Location");
    const [started, SetStarted] = useState(false);

    //global variables
    var myRef = useRef();
    var storageRef = firebase.storage().ref();
    var taskCount = props.taskCount;
    let ControlComponent;
    let FeedbackComponent;

    //equivalent of component did mount
    useEffect(() => {
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        //check if browser is supported
        if (!hasGetUserMedia) {
            alert(
                "Your browser cannot stream from your webcam. Please switch to Chrome or Firefox."
            );
            return;
        }
        requestUserMedia();
    }, []);

    //supporting functions
    function requestUserMedia() {
        getUserMedia((stream) => {
            myRef.current.srcObject = stream;
        });
    }

    function getUserMedia(callback) {
        navigator.getUserMedia(
            { audio: true, video: true },
            callback,
            (error) => alert(JSON.stringify(error))
        );
    }

    function getFileName(fileExtension) {
        var fullDate = new Date().toISOString().replace(/:|\./g, "-");

        return fullDate + "-task" + taskCount + "." + fileExtension;
    }

    var startRecord = () => {
        getUserMedia((stream) => {
            var recordVideoTemp = RecordRTC(stream, {
                type: "video",
                mimeType: "video/webm",
            });
            recordVideoTemp.startRecording();
            setRecordVideo(recordVideoTemp);
            //recordVideo.startRecording();
        });
        SetStarted(true);
    };

    var stopRecord = () => {
        SetStarted(false);
        recordVideo.stopRecording(() => {
            // recordVideo.save();
            //instead of saving you can simply upload the video to a bucket
            var blob = recordVideo.blob;
            var fileName = getFileName("webm");

            var fileObject = new File([blob], fileName, {
                type: "video/webm",
            });

            // now upload file to firebase bucket
            // Upload file and metadata to the object 'images/mountains.jpg'
            var uploadTask = storageRef
                .child("videos/" + fileObject.name)
                .put(fileObject);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function (snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log("Upload is paused");
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log("Upload is running");
                            break;
                    }
                },
                function (error) {
                    //print error
                },
                function () {
                    // Upload completed successfully, now we can get the download URL
                    // uploadTask.snapshot.ref
                    //     .getDownloadURL()
                    //     .then(function (downloadURL) {
                    //         console.log("File available at", downloadURL);
                    //     });

                    const url = new URL(
                        storageRef.child("videos/" + fileObject.name)
                    );

                    const currentVideoLocation = url.toString();

                    setVideoLocation(currentVideoLocation);
                }
            );
        });

        if (taskCount == 3) {
            setShowFeedback(true);
        }
    };

    if (!started) {
        ControlComponent = (
            <Button className="m-4" color="success" onClick={startRecord}>
                Start Record
            </Button>
        );
    } else {
        ControlComponent = (
            <Button className="m-4" color="danger" onClick={stopRecord}>
                Stop Record
            </Button>
        );
    }

    if (!showFeedback) {
        FeedbackComponent = <> </>;
    } else {
        FeedbackComponent = (
            <Button className="m-2" color="warning">
                <NavLink
                    to={{
                        pathname: "/results_buffer",
                        state: {
                            src: "from CamRec page",
                            url: videoLocation,
                        },
                    }}
                >
                    Show Results
                </NavLink>
            </Button>
        );
    }

    return (
        <Container>
            <div className="d-flex align-items-center flex-column">
                <video ref={myRef} height="auto" width="640" autoPlay muted />
                {ControlComponent}
                {FeedbackComponent}
            </div>
        </Container>
    );
}

export default CamRec;