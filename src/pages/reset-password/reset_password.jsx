import React, { Component } from 'react'
import { 
    Button, Input, Card, Icon,
    TextField, Container
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import './reset_password.scss'
export class reset_password extends Component {
    render() {
        return (
            <Container className="main-reset">
            <Card className="form-reset">
                <Card className="form-head-reset">
                    <h3 className="fundoo-reset">Fundoo note</h3>
                </Card>
                <div className="text-reset">
                    <b>Set new password!!</b><br/> 
                    <span>be happy</span>
                </div>
                <div className="text-field-reset">
                    <div id="newpassword-field-reset">
                        <TextField  
                            label="New password"
                            size="small"
                            variant="outlined" /><br/>
                    </div>
                    <div id="confirm-field-reset">
                        <TextField  
                            label="Confirm password"
                            size="small"
                            variant="outlined" /><br/>
                    </div>
                </div>
                <div className="buttons-reset">
                    <Link to="/registration">Create account</Link>
                    <Button variant="contained">Confirm</Button>
                </div>
            </Card>
        </Container>
        )
    }
}

export default reset_password
