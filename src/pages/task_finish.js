import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

class task_finish extends Component {
    render() {
        return (
            <div>
                <h1>TASK FINISH PAGE</h1>
                <Button color='inherit' component={Link} to="/results_buffer">
    To Results Loading
  </Button>
            </div>
        )
    }
}

export default task_finish
