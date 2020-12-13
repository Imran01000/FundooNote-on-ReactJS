import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { Input, IconButton, Grid } from '@material-ui/core'
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
import { addNotes } from '../../services/note-service'
import Notes from '../Notes/Notes'
import { getAllNotes } from '../../services/note-service'
import { Menu, MenuItem } from '@material-ui/core'
import Color from '../ColorPopper/Color'
import {addColorNotes} from '../../services/note-service'
import Trash from '../Trash/Trash'
import ArchiveNotes from '../Archive/ArchiveNotes'
const styles = {
    root: {
        marginTop: "100px",
        marginLeft: "430px",

    },
    panel: {
        width: "560px",
    },
    input: {
        width: "200px",
        margin: "9px",
        border: "none",
        borderColor: "transparent",
        height: "20px",
        outline: "none",
        backgroundColor: "transparent"
    },
    grid: {
        marginLeft: "30%"
    },
    panelSummary: {
        height: "5px"
    },

};

const theme = createMuiTheme({
    overrides: {
        MuiExpansionPanelSummary: {
            backgroundColor: "white",
            root: {
                "&:hover:not(.Mui-disabled)": {
                    backgroundColor: "white",
                }
            }
        }
    }
});

export class AddNoteExpansion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isExpanded: false,
            shouldShowIcons: true,
            message: 'Take a note...',
            title: '',
            description: '',
            allNotes: [],
            isOpenColorPop: false,
            anchorForColor: null,
            backgroundColorForExpansion: '',
            colorForNote:'',
            test:'hello',
            userId:''


        }
    }

    componentWillMount = () => {
        let localStorageData = JSON.parse(localStorage.getItem('userdata'));
        let userToken = localStorageData.userToken
        getAllNotes(userToken).then(
            result => {
                console.log('from wind mount', userToken)
                var arr = result.data.data.data
                this.setState({
                    allNotes: result.data.data.data
                    
                })
                this.props.takeUserId(this.state.allNotes[0].userId)
            }
        )
    }
    handleOpenForColor = (e) => {
        this.setState({
            isOpenColorPop: true,
            anchorForColor: e.currentTarget
        })
    }
    handleCloseForColor = () => {
        this.setState({
            isOpenColorPop: false
        })
    }
    handleExpansion = () => {
        this.setState({
            isExpanded: true,
            shouldShowIcons: false,
            message: 'Title'
        })
        console.log(this.state.isExpanded)
    }
    toCloseExpansion = () => {
        this.setState({
            isExpanded: false,
            shouldShowIcons: true,
            message: 'Take a note...'

        })
        if (this.state.title !== undefined && this.state.description !== undefined) {
            let noteData = {
                title: this.state.title,
                description: this.state.description,
                color: this.state.backgroundColorForExpansion

            }
            let localStorageData = JSON.parse(localStorage.getItem('userdata'));

            let userToken = localStorageData.userToken
            addNotes(noteData, userToken).then(
                result => {
                    if (result.status === 200) {
                        console.log("Note added successfully");
                    }

                    let noteColorData = {
                        color: this.state.backgroundColorForExpansion,
                        noteIdList: [result.data.status.details.id] 
                    }
                    console.log(noteColorData)
                    addColorNotes(noteColorData, userToken).then(
          
                        result =>{
                            console.log("add color")
                        }
                    )
                }
            )
        }else{
            console.log('Something went wrong');
        }
        this.componentWillMount()
        
    }

    setTitleData = (e) => {
        let titleData = e.target.value;
        this.setState({
            title: titleData
        });
    }

    setDescriptionData = (e) => {
        let descriptionData = e.target.value;
        this.setState({
            description: descriptionData
        });
    }
    handleClick = (e) => {
        this.setState({
            anchor: e.currentTarget
        })
    };

    handleColorForExpansion = (colorValue) => {
        this.setState({
            backgroundColorForExpansion: colorValue
        })
        return this.state.backgroundColorForExpansion
    }
    
    
    render() {

        const { classes } = this.props;
        let displayIcons;
        console.log('notes details', this.state.allNotes)
        if (this.state.shouldShowIcons) {
            displayIcons = <Grid className={classes.grid}>
                <Tooltip title="New list">
                    <IconButton>
                        <CheckBoxOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="New note with drawing">
                    <IconButton>
                        <BrushOutlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="New note with image">
                    <IconButton>
                        <ImageOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        } else {
            displayIcons = ""
        }

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
        return (
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <ExpansionPanel className={classes.panel} expanded={this.state.isExpanded}
                        style={{ backgroundColor: `${this.state.backgroundColorForExpansion}` }}>
                        <ExpansionPanelSummary className={classes.panelSummary}>
                            <Typography>
                                <input className={classes.input} placeholder={this.state.message} onClick={this.handleExpansion}
                                    onBlur={this.setTitleData}
                                />
                            </Typography>
                            {displayIcons}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <input className={classes.input} placeholder="Take a note..."
                                    onBlur={this.setDescriptionData} />
                            </Typography>
                        </ExpansionPanelDetails>
                        <Grid>
                            <Tooltip title="Remind me">
                                <IconButton>
                                    <AddAlertOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Collaborator">
                                <IconButton>
                                    <PersonAddOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Change color">
                                <IconButton>
                                    <PaletteOutlinedIcon onClick={this.handleOpenForColor} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Add image">
                                <IconButton>
                                    <ImageOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Archive">
                                <IconButton>
                                    <ArchiveOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="More">
                                <IconButton onClick={this.handleClick}>
                                    <MoreVertOutlinedIcon />
                                </IconButton>
                            </Tooltip>

                            <Button style={{ marginLeft: "150px" }} onClick={this.toCloseExpansion}>Close</Button>
                        </Grid>
                    </ExpansionPanel>
                </div>
                <div>
                    <Notes allNotes={this.state.allNotes} listGridViewValue={this.props.valueForListGrid}
                        autoRefreshForNotes={this.componentWillMount} 
                        colorCodeForNote={this.state.backgroundColorForExpansion}/>


                    <Color isOpenPopper={this.state.isOpenColorPop} anchorForColorPop={this.state.anchorForColor}
                        toMakeColor={this.handleColorForExpansion} toCloseColorPopOver={this.handleCloseForColor}/>
                </div>
                {menu}
            </ThemeProvider>
        )
    }
}

export default withStyles(styles, { withTheme: true })(AddNoteExpansion)
