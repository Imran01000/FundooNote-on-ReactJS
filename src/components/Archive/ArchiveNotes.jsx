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
import {getAllNotes} from '../../services/note-service';
import {archiveNotes} from '../../services/note-service'
import AppbarSidenav from '../AppbarSidenav/AppbarSidenav';


const styles = {
    root: {
        flexDirection: "row",
        marginLeft: "280px",
        flexFlow: "row wrap"

    },
    card: {
        width: "320px",
        marginTop: "100px",
        height: "170px",
        marginLeft: "20px"
    }
};
class ArchiveNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allNotes:[],
            noteId:'',
            token:'',
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

    handleClickdata = (id)=>{
        this.setState({
            noteId: id
        })
        
    }
   handleUnArchiveNote = () =>{
       let noteData = {
           isArchived: false,
           noteIdList:[this.state.noteId]
       }
       console.log(noteData)
       archiveNotes(noteData, this.state.token).then(
           result =>{
               console.log('note unarchived')
           }
       )
       this.componentWillMount()
   }
    render() {
        const { classes } = this.props;
        console.log('from archive', this.state.allNotes)
        var displayArchiveNotes = this.state.allNotes.map((archiveNotes) => {
            if (archiveNotes.isArchived == true) {
                return (
                    <div>
                        <Card className={classes.card} onClick={()=>this.handleClickdata(archiveNotes.id)}
                           
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
                    {displayArchiveNotes}
                </Grid>
                {/* <h1>{this.props.testing}</h1> */}\

            </div>
        )
    }
}

export default withStyles(styles)(ArchiveNotes)
