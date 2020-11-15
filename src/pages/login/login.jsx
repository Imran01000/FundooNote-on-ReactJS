import React, { Component } from 'react'
import { 
    Button, Icon, Card, TextField,
    Container 
} from "@material-ui/core"
import { Link } from 'react-router-dom'
import './login.scss'

export class login extends Component {
  
    constructor(props) {
        super(props);
    
        this.state = {
             email:"",
             password:"",
             emailErrorText:"",
             emailError:"",
             pwdErrorText:"",
             pwdError:"",
        }
    }
    
    
    validateForEmail = e => {
        const regexForEmail= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const inputData = e.target.value;
        if (regexForEmail.test(inputData)) {
            this.setState({ 
                emailError: false, emailErrorText: "" 
            });
            console.log(inputData);
        } else {
            this.setState({
                [e.target.name]: "",
                emailError: true,
                emailErrorText: "Invalid Email Id"
            },
            ()=>{
                console.log(this.state.emailErrorText);
            }
            );
        }
    }
   
    validateForPassword = e => {
        const regexForPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g;
        const inputData = e.target.value;
        if(regexForPwd.test(inputData)){
           this.setState({
            pwdError: false, pwdErrorText: "" 
           })
           console.log(inputData);
        }else{
            this.setState({
                [e.target.name]: "",
                pwdError: true,
                pwdErrorText: "Minimum 6 characters required"
            },
            ()=>{
                console.log(this.state.pwdErrorText);
            }
            );
        }
        
    }
    render() {
        
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
                                onBlur={this.validateForEmail}
                                error={this.state.emailError.length > 0}
                                helperText={this.state.emailErrorText} />

                        </div>
                        
                        <div id="password-field">
                            <TextField
                                required
                                label="Password"
                                type="password"
                                name="password"
                                size="small"
                                variant="outlined"
                                onBlur={this.validateForPassword}
                                error={this.state.pwdError.length > 0}
                                helperText={this.state.pwdErrorText} />  
                                <br/>
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
