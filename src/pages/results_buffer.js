import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

class results_buffers extends Component {
    render() {
        return (
            <div>
                <h1>YOUR RESULTS ARE LOADING PAGE</h1>
                <Button color='inherit' component={Link} to="/results">
    To Results
  </Button>
            </div>
        )
    }
}

export default results_buffers
