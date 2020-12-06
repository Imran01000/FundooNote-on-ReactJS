import React, { Component } from 'react'
import {
    Card, CardContent, Grid, Tooltip,
    IconButton, Typography, CardActions,
    Menu, MenuItem
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { getAllNotes } from '../../services/note-service'
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
class TrashNotes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            anchor: null,
            isOpen: false,
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
                console.log('from trash', result)
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
                <MenuItem onClick={this.toTrashTheNote} >Delete Forever</MenuItem>
                <MenuItem onClick={this.handleClose}>Restore</MenuItem>
            </Menu>
        </div>

        console.log('from trash', this.props.testing)
        console.log(this.props.allNotes)
        var displayTrashNotes = this.props.allNotes.map((trashNotes) => {
            if (trashNotes.isDeleted == true) {
                return (
                    <div>
                        <Card className={classes.card}
                            /* onClick={() => this.handleClickData(trashNotes.title, trashNotes.description,
                              trashNotes.id, trashNotes.color,
                                 trashNotes.isPined)}*/
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
