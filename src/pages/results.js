import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

class results extends Component {
    render() {
        return (
            <div>
                <h1>YOUR RESULTS PAGE</h1>
                <Button color='inherit' component={Link} to="/">
    To Home
  </Button>
            </div>
        )
    }
}

export default results
