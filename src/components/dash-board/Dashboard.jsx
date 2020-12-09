import React, { Component } from 'react'
import {
    AppBar, Toolbar, IconButton,
    Typography, InputBase,
} from '@material-ui/core'
import {

} from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './dash-board.scss'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Sidenav from '../side-nave-bar/sidebar'
//import ExpansionPanel from '../expansion-panel/expansionpanel'
import Expansion from '../expansion-panel/AddNoteExpansion'
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import { Tooltip } from '@material-ui/core';
import Notes from '../Notes/Notes'
import ViewModuleOutlinedIcon from '@material-ui/icons/ViewModuleOutlined';
import Trash from '../Trash/Trash'
class Dashboard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isDrawerOpen: false,
            toShowIcons: true,
            listGridShow: true,
            userId: ''

        }
    }

    openDrawer = () => {
        this.setState(
            {
                isDrawerOpen: !this.state.isDrawerOpen
            })
    }

    handleClickToShowListGrid = () => {
        this.setState({
            toShowIcons: !this.state.toShowIcons,
            listGridShow: !this.state.listGridShow

        })
    }

    setUserId = (id) => {
        this.setState({
            userId: id
        })
    }
    render() {
        console.log("from dashboard", this.state.userId)

        var listView = <Tooltip title="List view">
            <IconButton onClick={this.handleClickToShowListGrid}>
                <ViewAgendaOutlinedIcon />
            </IconButton>
        </Tooltip>
        var gridView = <Tooltip title="Grid view">
            <IconButton onClick={this.handleClickToShowListGrid}>
                <ViewModuleOutlinedIcon />
            </IconButton>
        </Tooltip>
        var listGridIcons = (this.state.toShowIcons) ? listView : gridView;
        console.log(this.state.toShowIcons)
        console.log(this.state.isDrawerOpen)
        console.log('list', this.state.listGridShow)
        return (
            <div>
                <div>
                    <AppBar style={{ backgroundColor: "white" }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="default"
                                aria-label="open drawer"
                                onClick={this.openDrawer}>

                                <MenuIcon></MenuIcon>
                            </IconButton>
                            <Typography color="textSecondary">
                                FUNDOO-NOTE
                    </Typography>
                            <div>
                                {/* <SearchIcon/> */}
                                <InputBase
                                    placeholder="Search" className="search-bar" color="secondary"
                                />
                            </div>
                            <div className="icons">
                                {listGridIcons}
                                <Tooltip title="Profile">
                                    <IconButton>
                                        <PersonIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <div>
                    <Sidenav isOpen={this.state.isDrawerOpen} closeDrawer={this.Drawer}
                        userId={this.state.userId} />
                </div>
                <div>
                    <Expansion valueForListGrid={this.state.listGridShow} takeUserId={this.setUserId} />
                </div>
            </div>
        )
    }
}

export default Dashboard
