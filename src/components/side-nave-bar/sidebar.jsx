import React, {useState,setState} from 'react'
import { 
    AppBar, Toolbar, IconButton,
    Menu, MenuItem, Typography, InputBase,
    Drawer, List, ListItem, ListItemText, ListItemIcon,
    Button
} from '@material-ui/core'
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import './sidebar.scss'
const UseStyles = makeStyles({
    root:{
        
    },
    drawer: {
        width: "200px",
        flexShrink: 0,
        whiteSpace: "nowrap",
        display: "flex",
      }

})

const theme = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: '10%',
            },
            paperAnchorDockedRight:{
              borderRight: 20
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: 'transparent'
            }
        }

    }
})


function Sidebar(props) {
    const classes = UseStyles();
    const [open, setOpen] = useState(props.isOpen);    
    
    console.log("value getting here!",props.isOpen);

    return (
        <div>
            <ThemeProvider  theme={theme}>
            <div className={classes.root} >
                        <Drawer variant="persistent" className={classes.drawer}
                         open={props.isOpen} onClose={false}>
                            <List className="list">
                                <ListItem>
                                    <Button className="buttons" style={{paddingRight:"30px"}}>
                                    <ListItemIcon>
                                        <EmojiObjectsOutlinedIcon/>
                                    </ListItemIcon>
                                     <ListItemText>
                                         Notes
                                     </ListItemText>
                                     </Button>
                                </ListItem>
                                <ListItem>
                                    <Button className="buttons">
                                    <ListItemIcon>
                                        <NotificationsNoneOutlinedIcon/>
                                    </ListItemIcon>
                                     <ListItemText>
                                         Reminders
                                     </ListItemText>
                                     </Button>
                                </ListItem>
                                <ListItem>
                                    <Button className="buttons">
                                    <ListItemIcon>
                                        <EditOutlinedIcon/>
                                    </ListItemIcon>
                                     <ListItemText>
                                         Edit labels
                                     </ListItemText>
                                     </Button>
                                </ListItem>
                                <ListItem>
                                    <Button className="buttons">
                                    <ListItemIcon>
                                        <ArchiveOutlinedIcon/>
                                    </ListItemIcon>
                                     <ListItemText>
                                     Archive
                                     </ListItemText>
                                     </Button>
                                </ListItem>
                                <ListItem>
                                    <Button className="buttons">
                                    <ListItemIcon>
                                        <DeleteOutlinedIcon/>
                                    </ListItemIcon>
                                     <ListItemText>
                                     Trash
                                     </ListItemText>
                                     </Button>
                                </ListItem>
                            </List>
                        </Drawer>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default Sidebar
