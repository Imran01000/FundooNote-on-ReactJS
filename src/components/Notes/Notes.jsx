import React, { Component } from 'react'
import {
    Card, CardContent, Typography,
    CardActions, Grid, IconButton, Menu,
    MenuItem, Snackbar, Button
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
import Update_note from '../Update_Note/Update_note'
import Color from '../ColorPopper/Color'
import pinAfterClick from '../../images/pinAfterClick(1).png'
import { addColorNotes } from '../../services/note-service'
import { trashNotes } from '../../services/note-service'
import { archiveNotes } from '../../services/note-service'
import { PinUnpinNotes } from '../../services/note-service'
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    root: {
        flexDirection: "row",
        marginLeft: "280px",
        flexFlow: "row wrap"
    },
    card: {
        width: "240px",
        marginTop: "20px",
        height: "170px",
        marginLeft: "20px"
    },
    cardListView: {
        width: "600px",
        marginTop: "50px",
        height: "170px",
        marginLeft: "130px"
    },
};

export class Notes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Notes: this.props.allNotes,
            anchor: null,
            isOpen: false,
            noteTitle: '',
            noteDescription: '',
            noteId: '',
            token: '',
            toOpenColorPop: false,
            forPopAnchor: null,
            colorforDialogPop: '',
            pinValue: true,
            isOpenColorPop: false,
            anchorForColor: null,
            noteColor:'',
            isOpenToSnackBar: false,
            snackBarMessage:''

        }
    }
    autoRefreshMethod = () => {
        this.props.autoRefreshForNotes();
    }

    handleClickData = (titleValue, descriptionValue, notesId, colorToDailogPop, isPined) => {

        let noteColorData = {
            color: this.props.colorCodeForNote,
            noteIdList: notesId
        }
        console.log('color code', this.props.colorCodeForNote)
        let localStorageData = JSON.parse(localStorage.getItem('userdata'));

        let userToken = localStorageData.userToken
        this.setState({
            noteTitle: titleValue,
            noteDescription: descriptionValue,
            noteId: notesId,
            colorforDialogPop: colorToDailogPop,
            token: userToken,
            pinValue: isPined
        })
        addColorNotes(noteColorData, userToken).then(

            result => {
                console.log("add color")
            }
        )
    }
    handleClick = (e) => {
        this.setState({
            anchor: e.currentTarget
        })
    };
    handleClose = () => {
        this.setState({
            anchor: null
        })
    }

    handleClickOpenForDailog = () => {

        this.setState({
            isOpen: true,
        })
    }

    toCloseDailog = () => {
        this.setState({
            isOpen: false
        })
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
    handleColorForNote = (colorValue) => {
        this.setState({
            noteColor: colorValue
        })
        let colorNoteData ={
            color: colorValue,
            noteIdList:[this.state.noteId]
        }
        console.log(colorNoteData)
        addColorNotes(colorNoteData, this.state.token).then(
            result =>{
                console.log('note color changes')
            }
        )
        this.autoRefreshMethod()
        return this.state.noteColor
    }
   
    toTrashTheNote = () => {
        this.setState({
            anchor: null,
            isOpenToSnackBar: true,
            snackBarMessage:'Note has been trashed'
        })
        let trashNotedata = {
            isDeleted: true,
            noteIdList: [this.state.noteId]
        }
        trashNotes(trashNotedata, this.state.token).then(
            result => {
                console.log('note has been trash')
            }
        )
        this.props.autoRefreshForNotes();
    }

    handleArchiveClick = () => {
        this.setState({
            isOpenToSnackBar: true,
            snackBarMessage:'Note has been archived'
        })
        let archiveData = {
            isArchived: true,
            noteIdList: [this.state.noteId]
        }
        console.log(archiveData)
        archiveNotes(archiveData, this.state.token).then(
            result => {
                console.log('Note has been archived');
            }
        )
        this.props.autoRefreshForNotes();
    }
    handlePinClick = () => {
        let pinUnpinData = {
            isPined: true,
            noteIdList: [this.state.noteId]
        }
        console.log(pinUnpinData);
        PinUnpinNotes(pinUnpinData, this.state.token).then(
            result => {
                console.log('Note got pin')
            }
        )
        this.props.autoRefreshForNotes();
    }
    handleUnpinClick = () => {
        let pinUnpinData = {
            isPined: false,
            noteIdList: [this.state.noteId]
        }
        console.log(pinUnpinData);
        PinUnpinNotes(pinUnpinData, this.state.token).then(
            result => {
                console.log('Note got pin')
            }
        )
        this.props.autoRefreshForNotes();
    }
    handleToCloseSnackBar = (event, reason)=>{
        if (reason === 'clickaway') {
            return;
          }
        this.setState({
            isOpenToSnackBar: false
        })
    }
    render() {
        var showMessage = false
        const { classes } = this.props;
        console.log('for snackbar', this.state.isOpenToSnackBar)
        console.log(this.state.snackBarMessage)
        var menu = <div>
            <Menu
                id="menu"
                anchorEl={this.state.anchor}
                keepMounted
                open={Boolean(this.state.anchor)}
                onClose={this.handleClose}
            >
                <MenuItem onClick={this.toTrashTheNote} >Delete note</MenuItem>
                <MenuItem onClick={this.handleClose}>Add labels</MenuItem>
            </Menu>
        </div>

        var displayNotes = this.props.allNotes.map((notes) => {
            console.log("notes data", notes.isPined)
            if (notes.isDeleted == false && notes.isArchived == false && notes.isPined == false) {
                return (
                    <div>
                        <Card className={this.props.listGridViewValue ? classes.card : classes.cardListView}
                            onClick={() => this.handleClickData(notes.title, notes.description, notes.id, notes.color,
                                notes.isPined)}
                            style={{ backgroundColor: `${notes.color}` }}>
                            <CardContent>
                                <Grid container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-start">
                                    <h3 onClick={this.handleClickOpenForDailog}>{notes.title}</h3>
                                    { true/*this.state.pinValue*/ ?
                                        (<Tooltip title="Pin note">
                                            <IconButton size="small">
                                                <img src={pinBeforeClick} onClick={this.handlePinClick} />
                                            </IconButton>
                                        </Tooltip>)
                                        :
                                        (<Tooltip title="Pin note">
                                            <IconButton size="small">
                                                <img src={pinAfterClick} />
                                            </IconButton>
                                        </Tooltip>)
                                    }
                                </Grid>
                                <Typography onClick={this.handleClickOpenForDailog}>
                                    {notes.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="flex-start">
                                    <Tooltip title="Remind me">
                                        <IconButton size="small">
                                            <AddAlertOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Collaborator">
                                        <IconButton size="small">
                                            <PersonAddOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Change color">
                                        <IconButton size="small" onClick={this.handleOpenForColor}>
                                            <PaletteOutlinedIcon fontSize="small"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Add image">
                                        <IconButton size="small">
                                            <ImageOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Archive">
                                        <IconButton size="small" onClick={this.handleArchiveClick}>
                                            <ArchiveOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="More">
                                        <IconButton size="small" aria-controls="menu" aria-haspopup="true"
                                            onClick={this.handleClick}>
                                            <MoreVertOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </CardActions>
                        </Card>
                    </div>
                )
            } else {
                return (<div></div>)
            }

        });
        var displayNotesPin = this.props.allNotes.map((notes) => {
            if (notes.isPined == true && notes.isDeleted == false)  {
                showMessage = true
                return (
                    <div>
                        <Card className={this.props.listGridViewValue ? classes.card : classes.cardListView}
                            onClick={() => this.handleClickData(notes.title, notes.description, notes.id, notes.color)}
                            style={{ backgroundColor: `${notes.color}` }}>
                            <CardContent>
                                <Grid container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-start">
                                    <h3 onClick={this.handleClickOpenForDailog}>{notes.title}</h3>
                                    { false/*this.state.pinValue*/ ?
                                        (<Tooltip title="Pin note">
                                            <IconButton size="small">
                                                <img src={pinBeforeClick} />
                                            </IconButton>
                                        </Tooltip>)
                                        :
                                        (<Tooltip title="Unpin note">
                                            <IconButton size="small" onClick={this.handleUnpinClick}>
                                                <img src={pinAfterClick} />
                                            </IconButton>
                                        </Tooltip>)
                                    }
                                </Grid>
                                <Typography onClick={this.handleClickOpenForDailog}>
                                    {notes.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container
                                    direction="row"
                                    justify="space-around"
                                    alignItems="flex-start">
                                    <Tooltip title="Remind me">
                                        <IconButton size="small">
                                            <AddAlertOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Collaborator">
                                        <IconButton size="small">
                                            <PersonAddOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Change color">
                                        <IconButton size="small" onClick={this.handleOpenForColor}>
                                            <PaletteOutlinedIcon fontSize="small"
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Add image">
                                        <IconButton size="small">
                                            <ImageOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Archive">
                                        <IconButton size="small">
                                            <ArchiveOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="More">
                                        <IconButton size="small" aria-controls="menu" aria-haspopup="true"
                                            onClick={this.handleClick}>
                                            <MoreVertOutlinedIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </CardActions>
                        </Card>
                    </div>
                )
            }

        })


        return (

            <div className={classes.root}>
                {showMessage ? <h4 style={{ marginLeft: '20px' }}>Pinned Notes</h4> : ''}
                <Grid container direction="row">

                    {displayNotesPin}
                    {menu}
                </Grid>
                <Grid container direction="row">
                    {displayNotes}
                </Grid>
                <Update_note toOpenDailog={this.state.isOpen} parentMethod={this.toCloseDailog}
                    updateTitle={this.state.noteTitle} updateDescription={this.state.noteDescription}
                    noteId={this.state.noteId} colorToPop={this.state.colorforDialogPop}
                    autoRefreshForUpdate={this.autoRefreshMethod} />
                <Color isOpenPopper={this.state.isOpenColorPop} anchorForColorPop={this.state.anchorForColor}
                        toMakeColor={this.handleColorForNote} toCloseColorPopOver={this.handleCloseForColor}/>
                <Snackbar
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            open={this.state.isOpenToSnackBar}
                            autoHideDuration={2000}
                            onClose={this.handleToCloseSnackBar}
                            message={this.state.snackBarMessage}
                            action={
                            <React.Fragment>
                                <Button color="secondary" size="small" onClick={this.handleToCloseSnackBar}>
                                UNDO
                                </Button>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleToCloseSnackBar}>
                                <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                            }
                        />
            </div>
        )
    }
}

export default withStyles(styles)(Notes)
