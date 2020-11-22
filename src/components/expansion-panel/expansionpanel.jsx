import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import './expansionpanel.scss'
import { makeStyles } from '@material-ui/core/styles';

const UseStyles = makeStyles({
    root:{
        width:"500%",
        marginTop:"80%",
        marginLeft:"120%"
    }
})
function expansionpanel() {

    const classes = UseStyles();

    return (
        <div>
            <ExpansionPanel className={classes.root}>
                <ExpansionPanelSummary>
                    <Typography>
                        hello buddy!!
                    </Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        </div>
    )
}

export default expansionpanel
