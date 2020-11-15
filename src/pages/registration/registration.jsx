import React, { Component } from 'react'
import { 
    Button, Icon, Card, Input,
    TextField, Container
} from "@material-ui/core"
import { Link } from 'react-router-dom'
import './registration.scss'

export class registration extends Component {
    render() {
        return (
            <Container className="main-reg">
                 <Card className="form-reg">
                    <Card className="form-head-reg">
                        <h3 className="fundoo-reg">Fundoo note</h3>
                    </Card>
                    <div className="text-reg">
                        <b>Do  registration</b><br/> 
                        <span>with fundoo note!!</span>
                    </div>
                    <div className="text-field-reg">
                    <div id="name-field-reg">
                            <TextField  
                                label="First name"
                                size="small"
                                variant="outlined" />
                            <TextField  
                                className="last-name"
                                label="Last name"
                                size="small"
                                variant="outlined" />
                        </div>
                        <div id="email-field-reg">
                            <TextField
                                className="email"  
                                label="Email"
                                size="small"
                                variant="outlined" /><br/>
                        </div>
                        <div id="password-field-reg">
                            <TextField 
                                required 
                                label="Password"
                                size="small"
                                variant="outlined" />
                                <TextField 
                                required 
                                label="Confirm"
                                className="confirm"
                                size="small"
                                variant="outlined" />
                        </div>
                        <div id="mobileNo-field-reg">
                            <TextField 
                                label="mobile-no"
                                className="mobile-no"
                                size="small"
                                variant="outlined" />
                        </div>
                    </div>
                    <div className="buttons-reg">
                        <Link to="/" id="link">Already have an account?</Link>
                        <Button variant="contained">Create</Button>
                    </div>
                </Card>
            </Container>
        )
    }
}

export default registration
