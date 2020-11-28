import React, { Component } from 'react'
import { Card, CardContent, Typography,
    CardActions, Grid, IconButton, Menu,
    MenuItem
} from '@material-ui/core'
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { Tooltip } from '@material-ui/core';
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import pinBeforeClick from '../../images/pinBeforeClick.png'

const styles ={
    root:{
        flexDirection:"row",
        marginLeft:"280px"

    },
    card:{
        width:"20%",
        marginTop:"50px",
        height:"5%",
        marginLeft:"20px"
    },    
};

export class Notes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Notes:props.allNotes,
             anchor:null
        }
    }
     handleClick = (event) => {
        this.setState({
            anchor:event.currentTarget
        })
      };
      handleClose = () =>{
        this.setState({
            anchor:null
        })
      }
    render() {
        const {classes} = this.props;
        console.log("All notes", this.props.allNotes)
        console.log("from child", this.state.title) 

        var menu = <div>
                        <Menu
                            id="menu"
                            anchorEl={this.state.anchor}
                            keepMounted
                            open={Boolean(this.state.anchor)}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={this.handleClose} >Delete note</MenuItem>
                            <MenuItem onClick={this.handleClose}>Add labels</MenuItem>
                        </Menu>
                    </div>
            var displayNotes = this.props.allNotes.map((notes)=>{
            
            return (            
                    <Card className={classes.card}>
                        <CardContent>
                            <Grid container
                            direction="row"
                            justify="space-between"
                            alignItems="flex-start">
                                <h3>{notes.title}</h3>
                                <Tooltip title="Pin note">
                                    <IconButton size="small">
                                        <img src={pinBeforeClick}/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Typography>
                                {notes.description}
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
                                    <IconButton size="small" aria-controls="menu" aria-haspopup="true"
                                    onClick={this.handleClick}>
                                        <MoreVertOutlinedIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </CardActions>
                    </Card> 
            )
        })
        
        return(
            <div className={classes.root}>
                <Grid container direction="row">
                    {displayNotes}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Notes)
