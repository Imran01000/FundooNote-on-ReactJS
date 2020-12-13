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
            email: "",
            emailError: "",
            emailErrorText: "",
            color: ""
        }
    }

    validateForEmail = e => {
        const regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const inputData = e.target.value;
        if (regexForEmail.test(inputData)) {
            this.setState({
                emailError: false, emailErrorText: "", color: ""
            });
            console.log(inputData);
        }
        else if (inputData === "") {
            this.setState({
                emailError: false, emailErrorText: "", color: ""
            });
            console.log("Empty");
        }
        else {
            this.setState({
                [e.target.name]: "",
                emailError: true,
                emailErrorText: "Invalid Email Id",
                color: "secondary"
            },
                () => {
                    console.log(this.state.emailErrorText);
                }
            );
        }
    }
    render() {
        return (
            <Container className="main-forget">
                <form onSubmit="">

                    <h1 className="fundoo-forget">Fundoo note</h1>

                    <div className="text-forget">
                        <b>Forgot password</b><br />
                        <span>don't be worry much</span>
                    </div>
                    <div className="text-field-forget">
                        <TextField
                            label="Enter your email"
                            type="text"
                            className="email-field"
                            size="small"
                            variant="outlined"
                            onBlur={this.validateForEmail}
                            error={this.state.emailError.length > 0}
                            helperText={this.state.emailErrorText}
                            color={this.state.color} />
                    </div>
                    <div className="buttons-forget">
                        <Link to="/registration" id="link">Create account</Link>
                        <Button variant="contained" onClick={() => window.location.href = "/resetPassword"}>Next</Button>
                    </div>

                </form>
            </Container>
        )
    }
}

export default forget_password
