import React, { Component } from 'react'
import { 
    Button, Icon, Card, TextField,
    Container 
} from "@material-ui/core"
import { Link } from 'react-router-dom'
import './login.scss'


export class login extends Component {

    render() {
        const  Errors  = this.state;
        return (
            <Container className="main-login">
                <form onSubmit={this.handleChange}>
                <Card className="form-login">
                    <Card className="form-head">
                        <h3 className="fundoo-text">Fundoo note</h3>
                    </Card>
                    <div className="text">
                        <b>SignIn</b><br/> 
                        <span>with your fundoo note</span>
                    </div>
                    <div className="text-field-login">
                        <div id="email-field">
                            <TextField 
                                label="Email"
                                type="text"
                                name="email"
                                size="small"
                                variant="outlined"
                                onChange={this.handleChange} /><br/>
                        </div>
                        
                        <div id="password-field">
                            <TextField 
                                required
                                label="Password"
                                type="password"
                                name="password"
                                size="small"
                                variant="outlined" 
                                onChange={this.handleChange}/><br/>
                                <Link to="/forgetPassword">Forget password?</Link>
                        </div>
                    </div>
                    <div className="buttons-login">
                        <Link to="/registration">Create account</Link>
                        <Button type="submit" variant="contained">SignIn</Button>
                    </div>
                </Card>
                </form>
            </Container>
        )
    }
}

export default login
