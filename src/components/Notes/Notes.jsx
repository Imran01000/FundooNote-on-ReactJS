import React, { Component } from 'react'
import { Card, CardContent, Typography,
    CardActions, Grid, IconButton, GridList
} from '@material-ui/core'
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { Tooltip } from '@material-ui/core';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const styles ={
    root:{
        width:"22%",
        marginTop:"50px",
        marginLeft:"20px",
        height:"5%",
    },
    
};

export class Notes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    
    render() {
        const {classes} = this.props;
        return (
                <Grid  container direction="row">             
                <Card className={classes.root}>
                    <CardContent>
                    <h3>first Demo</h3>
                        <Typography>
                            good afternoon!
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid  container
                                direction="row"
                                justify="space-around"
                                alignItems="flex-start">
                            <Tooltip title="Remind me">
                                <IconButton size="small">
                                    <AddAlertOutlinedIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Collaborator">
                                <IconButton size="small">
                                    <PersonAddOutlinedIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Change color">
                                <IconButton size="small">
                                    <PaletteOutlinedIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add image">
                                <IconButton size="small">
                                    <ImageOutlinedIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Archive">
                                <IconButton size="small">
                                    <ArchiveOutlinedIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="More">
                                <IconButton size="small">
                                    <MoreVertOutlinedIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </CardActions>
                </Card>  
                </Grid> 
            
        )
    }
}

export default withStyles(styles)(Notes)
