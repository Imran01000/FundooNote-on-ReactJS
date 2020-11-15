import React, { Component } from 'react'
import { 
    Button, Input, Card, Icon,
    TextField, Container
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import './forget_password.scss'

class forget_password extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email:"",
             emailError:"",
             emailErrorText:""
        }
    }
    
    validateForEmail = e =>{
        const regexForEmail = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
    render() {
        return (
            <Container className="main-forget">
            <form onSubmit="">
                <Card className="form-forget">
                    <Card className="form-head-forget">
                        <h3 className="fundoo-forget">Fundoo note</h3>
                    </Card>
                    <div className="text-forget">
                        <b>Forgot password</b><br/> 
                        <span>don't be worry much</span>
                    </div>
                    <div className="text-field-forget">
                        <div id="email-field-forget">
                            <TextField  
                                label="Enter your email"
                                type="text"
                                size="small"
                                variant="outlined" 
                                onBlur={this.validateForEmail}
                                error={this.state.emailError.length > 0}
                                helperText={this.state.emailErrorText} /><br/>
                        </div>
                    </div>
                    <div className="buttons-forget">
                        <Link to="/registration">Create account</Link>
                        <Button variant="contained" onClick={()=> window.location.href="/resetPassword"}>Next</Button>
                    </div>
                </Card>
            </form>
        </Container>
        )
    }
}

export default forget_password
