import React, { Component } from 'react'
import {
    Dialog, DialogTitle, DialogActions,
    DialogContent, Typography, Button,
    Tooltip, Grid, IconButton, Input
} from '@material-ui/core'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import './update_note.scss'
import { updateNotes } from '../../services/note-service'

const theme = createMuiTheme({
    overrides: {
        MuiDialogTitle: {
            root: {
                width: "400px"
            }
        }
    }
});

class Update_note extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: this.props.toOpenDailog,
            title: '',
            description: '',
            colorOnPop: ''
        }
    }

    handleTitleInput = (e) => {
        let updateTitle = e.target.value;
        this.setState({
            title: updateTitle,
        });
    }
    handleDescriptionInput = (e) => {
        let updateDesc = e.target.value;
        this.setState({
            description: updateDesc,
        });
    }

    handleDataOnClick = () => {
        this.setState({
            open: false
        })
        if (this.state.title !== '' && this.state.description !== '') {

            let updateNotedata = {
                noteId: this.props.noteId,
                title: this.state.title,
                description: this.state.description
            }
            let localStorageData = JSON.parse(localStorage.getItem('userdata'));
            let userToken = localStorageData.userToken
            console.log('update data', updateNotedata, 'userToken', userToken)
            updateNotes(updateNotedata, userToken).then(
                result => {
                    console.log('note updated successfully')
                }
            )
        }
        this.props.autoRefreshForUpdate()
    }
    tocloseDailog = () => {
        this.props.parentMethod();
    }
    render() {
        const { classes } = this.props;

        var dailog =
            <ThemeProvider theme={theme}>
                <Dialog open={this.props.toOpenDailog} onClose={this.tocloseDailog}
                /*style={{backgroundColor:'greenyellow'}}*/>
                    <DialogTitle style={{ backgroundColor: `${this.props.colorToPop}` }}>
                        <input className="inputs" placeholder={this.props.updateTitle}
                            onBlur={this.handleTitleInput} />
                    </DialogTitle>
                    <DialogContent style={{ backgroundColor: `${this.props.colorToPop}` }}>
                        <Typography>
                            <input className="inputs" placeholder={this.props.updateDescription}
                                onBlur={this.handleDescriptionInput} />
                        </Typography>
                    </DialogContent>
                    <DialogActions style={{ backgroundColor: `${this.props.colorToPop}` }}>
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
                                <IconButton size="small">
                                    <PaletteOutlinedIcon fontSize="small" />
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
                            <Button onClick={this.handleDataOnClick}>Close</Button>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        return (
            <div>
                {dailog}
            </div>
        )
    }
}

export default withStyles({ withTheme: true })(Update_note)
