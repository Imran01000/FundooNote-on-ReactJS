import React, { Component } from 'react'
import Notes from '../Notes/Notes'
import { withStyles } from '@material-ui/styles'
import { Grid, GridList } from '@material-ui/core'

const style = {
    root:{
        flexDirection:"row",
        marginLeft:"300px",

    }
}

export class DisplayNote extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Notes />
            </div>
            
        )
    }
}

export default withStyles(style) (DisplayNote)
