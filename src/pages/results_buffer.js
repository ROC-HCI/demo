import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import Lottie from 'react-lottie'
import load from '../lotties/loading';

class results_buffers extends Component {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: load,
            rendererSettings: {
                preserveAspectRation: "xMidYMid slice"
            }
        };
        return (
            <div style = {{display: 'flex', flexDirection: 'column', backgroundColor: 'white', height:'100vh'}}>
                <div style = {{textAlign: 'center'}}>
                <h1 style = {{color: 'gray'}}>YOUR RESULTS ARE LOADING</h1></div>
                <Lottie 
                    options = {defaultOptions}
                    height = {400}
                    width = {400} 
                    />
                    
                {/* <Button style = {{color: 'gray', component:{Link}, to: "/results", fontSize: '3vh'}}>
    To Results
  </Button> */}

            </div>
        )
    }
}

export default results_buffers
