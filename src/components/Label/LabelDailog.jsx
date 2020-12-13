import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
import { DialogContent } from '@material-ui/core'
import {
    IconButton, Tooltip, Grid, Input,
    Divider, DialogActions
}
    from '@material-ui/core'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { getAllLabelList } from '../../services/label-service'
import { addLabel } from '../../services/label-service'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { removeLabel } from '../../services/label-service'
import { updateLabel } from '../../services/label-service'

class LabelDailog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            labelData: '',
            allLabelNotes: [],
            userId: '',
            token: '',
            isDisabled: true,
            labelID:''
        }
    }
    componentWillMount = () => {
        let localStorageData = JSON.parse(localStorage.getItem('userdata'));
        let userToken = localStorageData.userToken
        getAllLabelList(userToken).then(
            result => {
                this.setState({
                    allLabelNotes: result.data.data.details,
                    token: userToken
                })
            }
        )
    }


    handleToLabelDailog = () => {
        this.props.toClose()
        this.setState({
            isDisabled: true,
        })

    }

    handledataForLabel = (event) => {
        this.setState({
            labelData: event.target.value
        })
    }

    handleData = () => {
        let data = {
            label: this.state.labelData,
            isDeleted: false,
            userId: this.props.id
        }
        console.log(data)
        addLabel(data, this.state.token).then(
            result => {
                console.log('Label added')
                console.log(result)
            }
        ).catch(
            console.log("something went wrong!!")
        )
        this.componentWillMount()
    }
    handleIdTodelete = (id) => {
        removeLabel(id, this.state.token).then(
            result => {
                console.log(result);
            }
        )
        this.componentWillMount()
    }

    handleDisabled = () => {
        this.setState({
            isDisabled: false,
        })
        console.log(this.state.isDisabled)
    }
    catchLabelId = (labelId) =>{
        this.setState({
            labelID: labelId
        })
    }
    updateLabel = () => {
        this.setState({
            isDisabled: false,
        })
        
        let data = {
            label: this.state.labelData,
            isDeleted: true,
            id:this.state.labelID,
            userId: this.props.id
        }
        console.log(data)
        updateLabel(data, this.state.token, data.id).then(
            result =>{
                this.handleDisabled()
                console.log("Label updated!!!")
            }
            
        )
        this.componentWillMount()
    }
    render() {
        var displayLabels = this.state.allLabelNotes.map((labels) => {

            return (<div>
                <Tooltip>
                    <IconButton>
                        <DeleteOutlinedIcon onClick={() => this.handleIdTodelete(labels.id)} />
                    </IconButton>
                </Tooltip>
                <Input defaultValue={labels.label} disabled={this.state.isDisabled}
                    onBlur={this.handledataForLabel} onClick={() => this.catchLabelId(labels.id)}/>
                <Tooltip>
                    <IconButton>
                        <EditOutlinedIcon onClick={this.handleDisabled} />
                    </IconButton>
                </Tooltip>
            </div>
            )
        })
        return (
            <div>
                <Dialog open={this.props.isOpen} onClose={this.handleToLabelDailog}>
                    <DialogTitle>
                        <Typography>
                            <h4>Edit labels</h4>
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid>
                            <Tooltip>
                                <IconButton>
                                    <CloseOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <Input placeholder="Create new labels"
                                onBlur={this.handledataForLabel} />
                            <Tooltip>
                                <IconButton onClick={this.handleData}>
                                    <CheckOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid>
                            {displayLabels}
                        </Grid>
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Grid>
                            <Button onClick={this.updateLabel}>
                                Done
                            </Button>
                        </Grid>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default LabelDailog
