import React, { Component } from 'react'
import { 
    AppBar, Toolbar, IconButton,
    Menu, MenuItem, Typography, InputBase,
    Drawer, List, ListItem, ListItemText, ListItemIcon
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
import ExpansionPanel from '../expansion-panel/expansionpanel'

 class dash_board extends Component {
     
    constructor(props) {
        super(props)
    
        this.state = {
             isDrawerOpen:false
        }
    }
    

    openDrawer = () =>{
        this.setState(
            {
            isDrawerOpen:true
        })
    }

    render() {
        return (
            <div style={{display:"flex", flexFlow:"row wrap"}} >
                <div>
                <AppBar color="transparent">
                    <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
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
                        <div className="pesron-icon">
                            <IconButton>
                                <PersonIcon/>
                            </IconButton>
                        </div>

                    </Toolbar>
                </AppBar>
                </div>
                <div>
                    <Sidenav isOpen={this.state.isDrawerOpen}/>
                </div>
                <div>
                    <ExpansionPanel/>
                </div>

            </div>
        )
    }
}

export default dash_board
