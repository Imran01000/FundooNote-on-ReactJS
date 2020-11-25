import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Input, IconButton, Grid} from '@material-ui/core'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { Button } from '@material-ui/core'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Tooltip } from '@material-ui/core';


const styles ={
    root:{
        width:"100%",
        marginTop:"100px",
        marginLeft:"460px",
        
    },
    panel:{
        width:"560px",
    },
    input:{
        width:"200px",
        margin:"9px",
        border: "none",
        borderColor:"transparent",
        height:"20px",
        outline:"none",        
    },
    grid:{
        marginLeft:"30%"
    },
    panelSummary:{
        height:"5px"
    },
    
};

const theme = createMuiTheme({
    overrides:{
        MuiExpansionPanelSummary:{
            backgroundColor:"white",
            root:{
                "&:hover:not(.Mui-disabled)": {
                    backgroundColor:"white",
                    

                  }
              
            }
        }
    }
});

export class AddNoteExpansion extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isExpanded:false,
             shouldShowIcons:true,
             message:'Take a note...'
        }
    }
    

    handleExpansion = () =>{
        this.setState({
            isExpanded:true,
            shouldShowIcons:false,
            message:'Title'
        })
        console.log(this.state.isExpanded)
    }
    toCloseExpansion = () =>{
        this.setState({
            isExpanded:false,
            shouldShowIcons:true,
            message:'Take a note...'

        })
        console.log(this.state.isExpanded)
    }
    render() {

       const {classes} = this.props;
       let displayIcons
       if(this.state.shouldShowIcons){
           displayIcons =  <Grid className={classes.grid}>
                            <Tooltip title="New list">
                                <IconButton>
                                    <CheckBoxOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="New note with drawing">
                                <IconButton>
                                    <BrushOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="New note with image">
                                <IconButton>
                                    <ImageOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid> 
       }else{
           displayIcons = ""
       }
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <ExpansionPanel className={classes.panel} expanded={this.state.isExpanded}>
                    <ExpansionPanelSummary className={classes.panelSummary}>
                    <Typography>
                    <input className={classes.input} placeholder={this.state.message} onClick={this.handleExpansion}/>
                    </Typography> 
                    {displayIcons}
                    </ExpansionPanelSummary> 
                    <ExpansionPanelDetails>
                        <Typography>
                        <input className={classes.input} placeholder="Take a note..."/> 
                        </Typography>
                    </ExpansionPanelDetails>
                    <Grid>
                            <Tooltip title="Remind me">
                                <IconButton>
                                    <AddAlertOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Collaborator">
                                <IconButton>
                                    <PersonAddOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Change color">
                                <IconButton>
                                    <PaletteOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add image">
                                <IconButton>
                                    <ImageOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Archive">
                                <IconButton>
                                    <ArchiveOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="More">
                                <IconButton>
                                    <MoreVertOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                            <Button style={{marginLeft:"150px"}} onClick={this.toCloseExpansion}>Close</Button>
                        </Grid>
                    </ExpansionPanel>
                </div>      
        </ThemeProvider>
        )
    }
}

export default withStyles(styles,{withTheme: true}) (AddNoteExpansion)
