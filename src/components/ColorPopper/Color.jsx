import React, { Component } from 'react'
import { IconButton, Grid, Button } from '@material-ui/core'
import '../ColorPopper/Color.scss'
import { Popover } from '@material-ui/core'
import '../ColorPopper/Color.scss'
import { addColorNotes } from '../../services/note-service'

class Color extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: this.props.isOpenPopper,
            anchor: this.props.anchorForColorPop,
            colorCode1: [
                '#C2F397',
                '#F7F2F4',
                '#F3B897',
                '#F397D1'

            ],
            colorCode2: [
                '#97F3E5',
                '#97E3F3',
                '#97B7F3',
                '#B897F3'
            ],
            colorCode3: [
                '#EF97F3',
                '#97F3CB',
                'white',
                '#F397AF'
            ],
            setColorValue: '',
            colorCode: '',
            noteId: ''
        }
    }

    handleCloseForColor = () => {
            this.props.toCloseColorPopOver()
    }

    setColorCode = (colorValue) => {
        this.setState({
            setColorValue: colorValue,
        })
        this.props.toCloseColorPopOver()
        this.props.forExpansionColor(colorValue);
        console.log('from setColorCode', this.state.setColorValue)
    }
   

    handleSetColorForNotes = () => {
        let localStorageData = JSON.parse(localStorage.getItem('userdata'));

        let userToken = localStorageData.userToken
        let colorData = {
            color: this.state.colorCode,
            noteIdList: this.state.noteId
        }
        addColorNotes(colorData, userToken).then(
            result => {
                console.log('Note color has been changed');
            }
        )
    }
    render() {
        console.log(this.props.isOpenPopper)
        console.log('color code', this.state.setColorValue)
        var colorArray1 = this.state.colorCode1.map((value) => {
            return (

                <IconButton style={{ backgroundColor: `${value}` }} className="button"
                    onClick={() => this.setColorCode(value)} >
                </IconButton>
            )

        })
        var colorArray2 = this.state.colorCode2.map((value) => {
            return (

                <IconButton style={{ backgroundColor: `${value}` }} className="button"
                    onClick={() => this.setColorCode(value)} >

                </IconButton>
            )
        })
        var colorArray3 = this.state.colorCode3.map((value) => {
            return (

                <IconButton style={{ backgroundColor: `${value}` }} className="button"
                    onClick={() => this.setColorCode(value)} >

                </IconButton>
            )
        })
        var colorPopover = <div>
            <Popover
                open={this.props.isOpenPopper}
                anchorEl={this.props.anchorForColorPop}
                onClose={this.handleCloseForColor}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div>
                    {colorArray1}
                </div>
                <div>
                    {colorArray2}
                </div>
                <div>
                    {colorArray3}
                </div>
            </Popover>
        </div>
        return (
            <div>
                {colorPopover}
            </div>
        )
    }
}

export default Color
