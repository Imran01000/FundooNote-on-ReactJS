import React, { Component } from 'react'
import {
    Button, Input, Card, Icon,
    TextField, Container
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import './reset_password.scss'
export class reset_password extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pwd: "",
            pwdError: "",
            pwdErrorText: "",
            color: ""
        }
    }


    validateForPassword = e => {
        const regexForPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g;
        const inputData = e.target.value;
        if (regexForPwd.test(inputData)) {
            this.setState({
                pwdError: false, pwdErrorText: "", color: ""
            })
            console.log(inputData);
        }
        else if (inputData === "") {
            this.setState({
                pwdError: false, pwdErrorText: "", color: ""
            })
        }
        else {
            this.setState({
                [e.target.name]: "",
                pwdError: true,
                pwdErrorText: "Minimum 6 characters required",
                color: "secondary"
            },
                () => {
                    console.log(this.state.pwdErrorText);
                }
            );
        }

    }
    render() {
        return (
            <Container className="main-reset">
                <form onSubmit="">
                    <h1 className="fundoo-reset">Fundoo note</h1>

                    <div className="text-reset">
                        <b>Set new password!!</b><br />
                        <span>be happy</span>
                    </div>
                    <div className="text-field-reset">
                        <TextField
                            label="New password"
                            type="password"
                            className="new-password"
                            size="small"
                            variant="outlined"
                            onBlur={this.validateForPassword}
                            error={this.state.pwdError.length > 0}
                            helperText={this.state.pwdErrorText}
                            color={this.state.color} />

                        <div id="confirm-field-reset">
                            <TextField
                                label="Confirm password"
                                type="password"
                                className="confirm-password"
                                size="small"
                                variant="outlined"
                                onBlur={this.validateForPassword}
                                error={this.state.pwdError.length > 0}
                            />
                        </div>
                    </div>
                    <div className="buttons-reset">
                        <Link to="/registration">Create account</Link>
                        <Button variant="contained">Confirm</Button>
                    </div>
                </form>
            </Container>
        )
    }
}

export default reset_password
