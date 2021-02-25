import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

class task_record extends Component {
    render() {
        return (
            <div>
                <h1>TASK RECORD PAGE</h1>
                <Button color='inherit' component={Link} to="/task_finish">
    To Task Finish
  </Button>
            </div>
        )
    }
}

export default task_record
