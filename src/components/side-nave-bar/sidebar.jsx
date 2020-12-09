import React, { Component } from 'react'
import {
    AppBar, Toolbar, IconButton,
    Menu, MenuItem, Typography, InputBase,
    Drawer, List, ListItem, ListItemText, ListItemIcon,
    Button,
} from '@material-ui/core'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import './sidebar.scss'
import LabelDailog from '../Label/LabelDailog'
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import { getAllLabelList } from '../../services/label-service'
import { withStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const styles = {
    root: {

    },
    drawer: {
        flexShrink: 0,
        whiteSpace: "nowrap",
        display: "flex",
    },
    list: {
        width: "250px"
    }
}

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: '9.4%',

            },
            paperAnchorDockedRight: {
                borderRight: 20,
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: 'transparent'
            }
        }
    }
})



export class sidebar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            allLabelNote: [],
            isOpenDailog: false,
            userId: ''
        }
    }
    componentWillMount = () => {
        let localStorageData = JSON.parse(localStorage.getItem('userdata'));
        let userToken = localStorageData.userToken
        getAllLabelList(userToken).then(
            result => {
                this.setState({
                    allLabelNote: result.data.data.details
                })
            }
        )
    }
    toOpenLabelDialog = () => {
        this.setState({
            isOpenDailog: true,
            userId: this.props.userId
        })
        this.componentWillMount()
    }

    toCloseLabelDialog = () => {
        this.setState({
            isOpenDailog: false
        })
        this.componentWillMount()
    }


    render() {

        const { classes } = this.props;
        console.log('222', this.props.userId)

        var displayLabel = this.state.allLabelNote.map((labelData) => {

            return (
                <ListItem button className="list-item"
                >
                    <ListItemIcon>
                        <LabelOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        {labelData.label}
                    </ListItemText>
                </ListItem>
            )
        })

        return (
            <div>
                <ThemeProvider theme={theme}>
                    <div className={classes.root} >
                        <Drawer variant="persistent" className={classes.drawer}
                            open={this.props.isOpen} onClose={this.props.closeDrawer}>
                            <List className={classes.list}>
                                <ListItem button className="list-item"
                                    onClick={() => window.location.href = "/dash-board"}>
                                    <ListItemIcon>
                                        <EmojiObjectsOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Notes
                                    </ListItemText>
                                </ListItem>
                                <ListItem button className="list-item"
                                    onClick={() => window.location.href = "/reminder"}>
                                    <ListItemIcon>
                                        <NotificationsNoneOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Reminders
                                     </ListItemText>
                                </ListItem>
                                {displayLabel}
                                <ListItem button className="list-item"
                                    onClick={this.toOpenLabelDialog}>
                                    <ListItemIcon>
                                        <EditOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Edit labels
                                     </ListItemText>
                                </ListItem>
                                <ListItem button className="list-item"
                                    onClick={() => window.location.href = "/archive"}>
                                    <ListItemIcon>
                                        <ArchiveOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Archive
                                     </ListItemText>
                                </ListItem>
                                <ListItem button className="list-item"
                                    onClick={() => window.location.href = "/trash"}>
                                    <ListItemIcon>
                                        <DeleteOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Trash
                                     </ListItemText>
                                </ListItem>
                            </List>
                        </Drawer>
                    </div>
                </ThemeProvider>
                <LabelDailog isOpen={this.state.isOpenDailog} toClose={this.toCloseLabelDialog}
                    id={this.state.userId} />
            </div>
        )
    }
}

export default withStyles(styles)(sidebar)


