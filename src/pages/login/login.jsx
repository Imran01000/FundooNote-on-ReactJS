import React, { Component } from 'react'
import { 
    Button, Icon, Card, TextField,
    Container, InputAdornment
} from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
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
             emailValidatecolor:"",
             pwdValidatecolor:""
        }
    }
    
    
    validateForEmail = e => {
        const regexForEmail= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const inputData = e.target.value;
        if (regexForEmail.test(inputData)) {
            this.setState({ 
                emailError: false, emailErrorText: "" ,emailValidatecolor:''
            });
            console.log(inputData);
        } 
        else if(inputData === ""){
            this.setState({ 
                emailError: false, emailErrorText: "" ,emailValidatecolor:''
            });
        }
        else {
            this.setState({
                [e.target.name]: "",
                emailError: true,
                emailErrorText: "Invalid Email Id",
                color:"secondary"
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
            pwdError: false, pwdErrorText: "", pwdValidatecolor:""
           })
           console.log(inputData);
        }
        else if(inputData === ""){
            this.setState({
                pwdError: false, pwdErrorText: "", pwdValidatecolor:""
               }) 
        }
        else{
            this.setState({
                [e.target.name]: "",
                pwdError: true,
                pwdValidatecolor:"secondary",
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
                                helperText={this.state.emailErrorText}
                                color={this.state.emailValidatecolor} />

                        </div>
                        
                        <div id="password-field">
                            <TextField
                                required
                                label="Password"
                                name="password"
                                size="small"
                                variant="outlined"
                                // type={this.values.showPassword ? 'text' : 'password'}
                                // value={this.values.password}
                                onBlur={this.validateForPassword}
                                error={this.state.pwdError.length > 0}
                                helperText={this.state.pwdErrorText}
                                color={this.state.pwdValidatecolor}
                                
                                endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                        onMouseDown={this.handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {/* {this.values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                      </IconButton>
                                    </InputAdornment>
                                  } />  
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
