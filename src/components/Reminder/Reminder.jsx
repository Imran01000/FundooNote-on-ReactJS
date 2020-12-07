import React, { Component } from 'react'
import {
    Card, CardContent, Grid, Tooltip,
    IconButton, Typography, CardActions,
    Chip
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import { getAllNotes } from '../../services/note-service';
import AppbarSidenav from '../AppbarSidenav/AppbarSidenav';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import { removeReminderNote } from '../../services/note-service'

const styles = {
    root: {
        flexDirection: "row",
        marginLeft: "280px",
        flexFlow: "row wrap"

    },
    card: {
        width: "320px",
        marginTop: "100px",
        height: "65%",
        marginLeft: "20px"
    }
};
class Reminder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allNotes: [],
            noteId: '',
            token: '',
        }
    }

    componentWillMount = () => {
        let localStorageData = JSON.parse(localStorage.getItem('userdata'));
        let userToken = localStorageData.userToken
        this.setState({
            token: userToken
        })
        getAllNotes(userToken).then(
            result => {
                console.log('from wind mount', userToken)
                var arr = result.data.data.data
                this.setState({
                    allNotes: result.data.data.data
                })
            }
        )
    }

    handleClickdata = (id) => {
        this.setState({
            noteId: id
        })
    }

    handleRemoveReminder = () => {

        let data = {
            reminder: [""],
            noteIdList: [this.state.noteId]
        }
        removeReminderNote(data, this.state.token).then(
            result => {
                console.log("reminder removed")
            }
        ).catch(
            console.log('something went wrong!!')
        )
        this.componentWillMount()
    }
    render() {
        const { classes } = this.props;
        console.log('from archive', this.state.allNotes)
        var displayReminderNotes = this.state.allNotes.map((reminderNotes) => {

            if (reminderNotes.reminder.length == 1) {
                return (
                    <div>
                        <Card className={classes.card} onClick={() => this.handleClickdata(reminderNotes.id)}

                            style={{ backgroundColor: `${reminderNotes.color}` }}>
                            <CardContent>
                                <Grid container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-start">
                                    <h3 onClick={this.handleClickOpenForDailog}>{reminderNotes.title}</h3>
                                </Grid>
                                <Typography onClick={this.handleClickOpenForDailog}>
                                    {reminderNotes.description}
                                </Typography>
                            </CardContent>
                            {true ? <div>
                                <Chip
                                    size="small"
                                    label={reminderNotes.reminder}
                                    icon={<ScheduleOutlinedIcon />}
                                    onDelete={this.handleRemoveReminder}
                                    style={{ marginLeft: '6.5px' }}
                                />
                            </div>
                                : <div></div>}
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
                                        <IconButton size="small" onClick={this.handleUnArchiveNote}>
                                            <UnarchiveOutlinedIcon fontSize="small" />
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

        }
        )
        return (
            <div className={classes.root}>
                <AppbarSidenav />
                <Grid container direction="row">
                    {displayReminderNotes}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Reminder)
