import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

class home extends Component {
    render() {
        return (
            <div>
                <h1>HOME PAGE</h1>
                <Button color='inherit' component={Link} to="/task_tutorial">
    To Task Tutorial
  </Button>
            </div>
        )
    }
}

export default home
