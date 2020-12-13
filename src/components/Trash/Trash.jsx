import React, { Component } from 'react'
import {
    Card, CardContent, Grid, Tooltip,
    IconButton, Typography, CardActions,
    Menu, MenuItem
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { getAllNotes } from '../../services/note-service';
import {trashNotes} from '../../services/note-service';
import {deleteNoteForever} from '../../services/note-service'
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
class TrashNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            anchor: null,
            isOpen: false,
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
    handleClose = () => {
        this.setState({
            anchor: null
        })
    }
    handleClick = (e) => {
        this.setState({
            anchor: e.currentTarget
        })
    };
    handleClickData = (id)=>{
        this.setState({
            noteId:id,
        })
    }
    handleToRestoreNote = ()=>{
        let restoreNoteData = {
            isDeleted:false,
            noteIdList:[this.state.noteId]
        }
        console.log(restoreNoteData)
        trashNotes(restoreNoteData, this.state.token).then(
            result =>{
                console.log('note restored');
            }
        )
        this.componentWillMount()
    }
    handleNoteDeleteForever = ()=>{
        let deleteNoteData ={
            isDeleted: true,
            noteIdList:[this.state.noteId]
        }
        console.log(deleteNoteData)
        deleteNoteForever(deleteNoteData, this.state.token).then(
            result =>{
                console.log('note deleted');
            }
        )
        this.componentWillMount() 
    }
    render() {
        const { classes } = this.props;
        var menu = <div>
            <Menu
                id="menu"
                anchorEl={this.state.anchor}
                keepMounted
                open={Boolean(this.state.anchor)}
                onClose={this.handleClose}
                 >
                <MenuItem onClick={this.handleNoteDeleteForever} >Delete Forever</MenuItem>
                <MenuItem onClick={this.handleToRestoreNote}>Restore</MenuItem>
            </Menu>
        </div>

    
        var displayTrashNotes = this.state.allNotes.map((trashNotes) => {
            if (trashNotes.isDeleted == true) {
                return (
                    <div>
                        <Card className={classes.card} onClick={()=>this.handleClickData(trashNotes.id)}
                            style={{ backgroundColor: `${trashNotes.color}` }}>
                            <CardContent>
                                <Grid container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-start">
                                    <h3 onClick={this.handleClickOpenForDailog}>{trashNotes.title}</h3>
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
                                    {trashNotes.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="flex-start">
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
                <AppbarSidenav/>
                <Grid container direction="row">
                    {displayTrashNotes}
                    {menu}
                    {/* {displayNotesPin} */}
                </Grid>
            </div>
            /* <h1>{this.props.testing}</h1> */

        )
    }
}

export default withStyles(styles)(TrashNotes)
