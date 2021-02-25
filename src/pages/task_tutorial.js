import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

class task_tutorial extends Component {
    render() {
        return (
            <div>
                <h1>TASK TUTORIAL PAGE</h1>
                <Button color='inherit' component={Link} to="/task_record">
    To Task Record
  </Button>
            </div>
        )
    }
}

export default task_tutorial
