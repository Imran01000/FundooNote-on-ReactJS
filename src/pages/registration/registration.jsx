import React, { Component } from 'react'
import {
    Button, Icon, Card, Input,
    TextField, Container
} from "@material-ui/core"
import { Link } from 'react-router-dom'
import './registration.scss'
import { userRegistration } from "../../services/user-service"
export class registration extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fname: "",
            lname: "",
            email: "",
            pwd: "",
            mobileNo: "",
            emailError: "",
            emailErrorTest: "",
            pwdError: "",
            pwdErrorTest: "",
            mobileNoError: "",
            mobileNoErrorTest: "",
            emailValidateColor: "",
            pwdValidateColor: "",
            mobileNoValidateColor: ""
        }
    }

    validateForEmail = e => {
        const regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const inputData = e.target.value;
        this.setState({
            email: inputData
        });
        if (regexForEmail.test(inputData)) {
            this.setState({
                emailError: false, emailErrorText: "", emailValidateColor: ""
            });
            console.log(inputData);
        }
        else if (inputData === "") {
            this.setState({
                emailError: false, emailErrorText: "", emailValidateColor: ""
            });
        }
        else {
            this.setState({
                [e.target.name]: "",
                emailError: true,
                emailErrorText: "Invalid Email Id",
                emailValidateColor: "secondary"
            },
                () => {
                    console.log(this.state.emailErrorText);
                }
            );
        }
    }
    validateForPwd = e => {
        const regexForPwd = /^[0-9]\d{1,}$/;
        const inputData = e.target.value;
        this.setState({
            pwd: inputData
        });
        if (regexForPwd.test(inputData)) {
            this.setState({
                pwdError: false, pwdErrorText: "", pwdValidateColor: ""
            })
            console.log(inputData);
        }
        else if (inputData === "") {
            this.setState({
                pwdError: false, pwdErrorText: "", pwdValidateColor: ""
            })
        }
        else {
            this.setState({
                [e.target.name]: "",
                pwdError: true,
                pwdErrorText: "Minimum eight characters required",
                pwdValidateColor: "secondary"
            },
                () => {
                    console.log(this.state.pwdErrorText);
                }
            );
        }
    }
    validateForMobileNo = e => {
        const regexForMobileNo = /^[789]\d{9}$/;
        const inputData = e.target.value;
        this.setState({
            mobileNo: inputData
        });
        if (regexForMobileNo.test(inputData)) {
            this.setState({
                mobileNoError: false, mobileNoErrorText: "", mobileNoValidateColor: ""
            })
            console.log(inputData);
        }
        else if (inputData === "") {
            this.setState({
                mobileNoError: false, mobileNoErrorText: "", mobileNoValidateColor: ""
            })
        }
        else {
            this.setState({
                [e.target.name]: "",
                mobileNoError: true,
                mobileNoErrorText: "Number must start with 7,8,9 and must be of 10 digit ",
                mobileNoValidateColor: "secondary"
            },
                () => {
                    console.log(this.state.mobileNoErrorText);
                });
        }
    }

    handleDataForFname = (e) => {
        const inputData = e.target.value;
        this.setState({
            fname: inputData
        })
        console.log(inputData)
    }

    handleDataForLname = (e) => {
        const inputData = e.target.value;
        this.setState({
            lname: inputData
        })
        console.log(inputData)
    }

    handleData = () => {
        if (this.state.fname, this.state.lname, this.state.email, this.state.pwd !== undefined) {
            let registrationData = {
                firstName: this.state.fname,
                lastName: this.state.lname,
                email: this.state.email,
                password: this.state.pwd,
                mobileNo: this.state.mobileNo
            }
            console.log(registrationData)
            let data = userRegistration(registrationData).then(
                res => {
                    if (res.status === 403) {
                        console.log("User already present!!");
                    }
                }
            ).catch(
                () => {
                    console.log(data);
                }
            );
        }
    }
    render() {
        return (
            <Container className="main-reg">
                <form onSubmit="">
                    <h1 className="fundoo-reg">Fundoo note</h1>

                    <div className="text-reg">
                        <b>Do  registration</b><br />
                        <span>with fundoo note!!</span>
                    </div>
                    <div className="text-field-reg">
                        <div id="name-field-reg">
                            <TextField
                                label="First name"
                                type="text"
                                className="first-name"
                                size="small"
                                onBlur={this.handleDataForFname}
                                variant="outlined" />
                            <TextField
                                className="last-name"
                                type="text"
                                label="Last name"
                                size="small"
                                onBlur={this.handleDataForLname}
                                variant="outlined" />
                        </div>
                        <div id="email-field-reg">
                            <TextField
                                className="email"
                                type="text"
                                label="Email"
                                size="small"
                                variant="outlined"
                                onBlur={this.validateForEmail}
                                error={this.state.pwdError.length > 0}
                                helperText={this.state.emailErrorText}
                                color={this.state.emailValidateColor} />
                        </div>
                        <div id="password-field-reg">
                            <TextField
                                required
                                label="Password"
                                type="password"
                                className="pwd"
                                size="small"
                                variant="outlined"
                                onBlur={this.validateForPwd}
                                error={this.state.pwdError.length > 0}
                                helperText={this.state.pwdErrorText}
                                color={this.state.pwdValidateColor} />
                            <TextField
                                required
                                label="Confirm"
                                type="password"
                                className="confirm"
                                size="small"
                                variant="outlined"
                                onBlur={this.validateForPwd}
                                error={this.state.pwdError.length > 0}
                                helperText={this.state.pwdErrorText} />
                        </div>
                        <div id="mobileNo-field-reg">
                            <TextField
                                label="mobile-no"
                                type="number"
                                className="mobile-no"
                                size="small"
                                variant="outlined"
                                onBlur={this.validateForMobileNo}
                                error={this.state.pwdError.length > 0}
                                helperText={this.state.mobileNoErrorText}
                                color={this.state.mobileNoValidateColor} />
                        </div>
                        <div className="buttons-reg">
                            <Link to="/" id="link">Already have an account?</Link>
                            <Button variant="contained" onClick={this.handleData}>Create</Button>
                        </div>
                    </div>
                </form>
            </Container>
        )
    }
}

export default registration
