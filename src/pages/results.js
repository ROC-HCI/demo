import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Link from 'react-router-dom/Link'
import {PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis} from 'recharts'

class results extends Component {
    state = {
        moreFace: false,
        moreSpeech: false,
        explainFace: false,
        explainSpeech: false,
      };

      handleOpenMoreFace = () => {
        this.setState({ moreFace: true });
      };
      handleCloseMoreFace = () => {
        this.setState({ moreFace: false });
      };
      
      handleOpenMoreSpeech = () => {
        this.setState({ moreSpeech: true });
      };
      handleCloseMoreSpeech = () => {
        this.setState({ moreSpeech: false });
      };

      handleOpenExplainFace = () => {
        this.setState({ explainFace: true });
      };
      handleCloseExplainFace = () => {
        this.setState({ explainFace: false });
      };
      
      handleOpenExplainSpeech = () => {
        this.setState({ explainSpeech: true });
      };
      handleCloseExplainSpeech = () => {
        this.setState({ explainSpeech: false });
      };  

    render() {
        const COLORS = ['white','#00205b'];
        var x = 3;
        const face_data = [{"name":"face","value":4}]
        const speech_data = [{"name":"speech","value":2}]
        const overall_data = [
            {
              "name": "Group A",
              "value": 5-x,
            },
            {
                "name": "Group B",
                "value": x,
            },
          ];
        return (
            <div>
            <div>
                <h1 style={{textAlign: 'center'}}>YOUR RESULTS</h1>
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
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p1>
                            <PieChart width={250} height={250}>
                            <text style={{fontSize: '2rem',
                                          fontFamily: 'Arial',
                                        }} 
                                x={125} y={125} 
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                scaleToFit='true'>
                                {x}
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
                fill="#00205b"
            /> 
        </BarChart>
        <Button variant="contained" size='small' style= {{backgroundColor: "#00205b", color: 'white', marginRight: '10px', marginTop: '10px'}} onClick={this.handleOpenMoreFace}>
    more info +
</Button>

        <Dialog
                open={this.state.moreFace}
                onClose={this.handleCloseMoreFace}
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

<Button variant="contained" size='small' style= {{backgroundColor: "#00205b", color: 'white', marginLeft: '65px', marginTop: '10px'}} onClick={this.handleOpenExplainFace}>
    Explain
</Button>

            <Dialog
                open={this.state.explainFace}
                onClose={this.handleCloseExplainFace}
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
                fill="#00205b"
            /> 
        </BarChart>
        <Button variant="contained" size='small' style= {{backgroundColor: "#00205b", color: 'white', marginRight: '10px', marginTop: '10px'}} onClick={this.handleOpenMoreSpeech}>
    more info +
</Button>

        <Dialog
                open={this.state.moreSpeech}
                onClose={this.handleCloseMoreSpeech}
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

<Button variant="contained" size='small' style= {{backgroundColor: "#00205b", color: 'white', marginLeft: '65px', marginTop: '10px'}} onClick={this.handleOpenExplainSpeech}>
    Explain
</Button>

            <Dialog
                open={this.state.explainSpeech}
                onClose={this.handleCloseExplainSpeech}
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
                                <p1>
                                Here is the cumulative score of your facial tasks. 
                            </p1>

                                    </div>
                
                
                </div>

            </div>
                <Button color='inherit' component={Link} to="/">
                    To Home
                </Button>
            </div>
        )
    }
}

export default results
