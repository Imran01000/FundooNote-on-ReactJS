import React, { Component } from 'react'
import {
    Card, CardContent, Grid, Tooltip,
    IconButton, Typography, CardActions
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';


const styles = {
    root: {
        flexDirection: "row",
        marginLeft: "280px",
        flexFlow: "row wrap"

    },
    card: {
        width: "240px",
        marginTop: "50px",
        height: "170px",
        marginLeft: "20px"
    }
};
class ArchiveNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        console.log('from archive', this.props.testing)
        const { classes } = this.props;
        console.log('from archive', this.props.allNotes)
        var displayArchiveNotes = this.props.allNotes.map((archiveNotes) => {
            if (archiveNotes.isArchived == true) {
                return (
                    <div>
                        <Card className={classes.card}
                            /* onClick={() => this.handleClickData(trashNotes.title, trashNotes.description,
                              trashNotes.id, trashNotes.color,
                                 trashNotes.isPined)}*/
                            style={{ backgroundColor: `${archiveNotes.color}` }}>
                            <CardContent>
                                <Grid container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-start">
                                    <h3 onClick={this.handleClickOpenForDailog}>{archiveNotes.title}</h3>
                                    {/* {this.state.pinValue ?
                                        (<Tooltip title="Pin note">
                                            <IconButton size="small" onClick={()=> this.handlePinValue(notes.isPined)}>
                                                <img src={pinBeforeClick} />
                                            </IconButton>
                                        </Tooltip>)
                                        :
                                        (<Tooltip title="Pin note">
                                            <IconButton size="small">
                                                <img src={pinAfterClick} onClick={()=> this.handlePinValue(notes.isPined)}/>
                                            </IconButton>
                                        </Tooltip>)
                                    } */}
                                </Grid>
                                <Typography onClick={this.handleClickOpenForDailog}>
                                    {archiveNotes.description}
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
            <div >

                {displayArchiveNotes}

                {/* <h1>{this.props.testing}</h1> */}\

            </div>
        )
    }
}

export default withStyles(styles)(ArchiveNotes)
