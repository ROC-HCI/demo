import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import Lottie from 'react-lottie'
import "./home.css";
import ParkHomepageImage from "./ParkHomepageImage.png"

class home extends Component {

    render() {
        const StyledButton = {
            fontSize: '3vh',
            color: '#0261FF'
        };
        return (
            
            <div style={{ display: 'flex', backgroundColor: 'white', flexDirection: 'column' }}>
                <div style={{ flexDirection: 'row' }}>
                    <h1 style={{ textAlign: 'left', float: 'left', color: '#0261FF', fontSize: '6vh' }} > PARK </h1>
                    <h2 style={{ textAlign: 'center', float: 'center' }}>
                    <Button style={{ color: '#0261FF', component: { Link }, to: "/home", fontSize: '3vh'}}>
                            <b>Home</b>
                        </Button>
                        <Button style={{ color: '#0261FF', component: { Link }, to: "/About", fontSize: '3vh' }}>
                            <b>About</b>
                        </Button>
                        <Button style={{ color: '#0261FF', component: { Link }, to: "/FAQ", fontSize: '3vh' }}>
                            <b>FAQ</b>
                        </Button>
                        <Button style={{ color: '#0261FF', component: { Link }, to: "/Contact", fontSize: '3vh' }}>
                            <b>Contact</b>
                        </Button>  </h2>
                        </div>
                <div style={{ display: 'flex', flexDirection: 'column', height: '90vh', background: 'linear-gradient(to right, #0161FC, #529E36)' }} >
                    <h3 style ={{ color: 'white', fontSize: '5.5vh'}}> The PARK system enables  <br /> the measurement of  <br /> Parkinson's disease for <br />
                        <em>anyone, anywhere -</em> <br />- via webcam</h3>
                    <br></br>
                    <div style = {{display: 'flex', flexDirection: 'row'}}>
                    <div style = {{display: 'flex', flexDirection: 'column'}}>
                    <button id="startStudy"
                        className="btn btn-circle btn-xl" >
                        Start Study
                  </button>
                    <br />
                    <br />
                    <h4 style = {{color: 'white'}}>
                        We ask that only those with Parkinson's
                        complete the study at this time.
                     </h4>
                    </div>
                    <h5 style = {{alignitems: 'right'}}><img className= "photo" src={ParkHomepageImage}></img></h5>
                </div>
                </div>
                <div>
               
                </div>
            </div>

        )

    }
}

export default home
