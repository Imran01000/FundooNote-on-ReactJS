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
import { userlogin } from '../../services/user-service'
import Snackbar from '@material-ui/core/Snackbar';


export class login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            emailErrorText: "",
            emailError: "",
            pwdErrorText: "",
            pwdError: "",
            emailValidatecolor: "",
            pwdValidatecolor: "",
            showPassword: false,
            snackBarOpen: false,
            snackBarMsg: ""
        }
    }


    validateForEmail = e => {
        const regexForEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        const inputData = e.target.value;
        this.setState({
            email: inputData
        })
        if (regexForEmail.test(inputData)) {
            this.setState({
                emailError: false, emailErrorText: "", emailValidatecolor: ''
            });
            console.log(inputData);
        }
        else if (inputData === "") {
            this.setState({
                emailError: false, emailErrorText: "", emailValidatecolor: ''
            });
        }
        else {
            this.setState({
                [e.target.name]: "",
                emailError: true,
                emailErrorText: "Invalid Email Id",
                emailValidatecolor: "secondary"
            },
                () => {
                    console.log(this.state.emailErrorText);
                }
            );
        }
    }

    validateForPassword = e => {
        const regexForPwd = /^[0-9]\d{1,}$/;
        const inputData = e.target.value;
        this.setState({
            password: inputData
        })
        if (regexForPwd.test(inputData)) {
            this.setState({
                pwdError: false, pwdErrorText: "", pwdValidatecolor: ""
            })
            console.log(inputData);
        }
        else if (inputData === "") {
            this.setState({
                pwdError: false, pwdErrorText: "", pwdValidatecolor: ""
            })
        }
        else {
            this.setState({
                [e.target.name]: "",
                pwdError: true,
                pwdValidatecolor: "secondary",
                pwdErrorText: "Minimum 6 characters required"

            },
                () => {
                    console.log(this.state.pwdErrorText);
                }
            );
        }

    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: true });
    };

    snackBarClose = (e) => {
        this.setState({ snackBarOpen: false })
    }
    handleData = () => {
        console.log("hey handle data")
        if (this.state.email !== undefined && this.state.password !== undefined) {
            let loginData = {
                email: this.state.email,
                password: this.state.password
            }
            console.log(loginData)

            userlogin(loginData).then(
                result => {
                    if (result.status === 200) {
                        console.log("login successfully")
                        this.props.history.push({ pathname: "/dash-board" })
                    }
                    console.log(result)
                    let data = {
                        userId: result.data.userId,
                        userToken: result.data.id,
                    }
                    localStorage.setItem("userdata", JSON.stringify(data));
                }
            ).catch(
                () => {
                    console.log("Something went wrong");
                }
            );
        }
        if (this.state.email === "" && this.state.password === "") {
            this.setState({ snackBarMsg: "feilds are empty", snackBarOpen: true })
        }
    }
    render() {
        return (
            <div className="form-body">
                <p className="header">
                    <h1 className="fundoo-text">Fundoo note</h1>
                </p>
                <div className="text">
                    <b>SignIn</b><br />
                    <span>with your fundoo note</span>
                </div>
                <div className="text-field-login">
                    <div id="email-field">
                        <TextField
                            label="Email"
                            className="email-input"
                            type="text"
                            name="email"
                            size="small"
                            variant="outlined"
                            onBlur={this.validateForEmail}
                            error={this.state.emailError.length > 0}
                            helperText={this.state.emailErrorText}
                            color={this.state.emailValidatecolor} />

                    </div>

                    <div className="password-field">
                        <TextField
                            required
                            className="password-input"
                            label="Password"
                            name="password"
                            size="small"
                            variant="outlined"
                            // type={this.state.showPassword ? 'text' : 'password'}
                            // value={this.state.password}
                            onBlur={this.validateForPassword}
                            error={this.state.pwdError.length > 0}
                            helperText={this.state.pwdErrorText}
                            color={this.state.pwdValidatecolor}

                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={this.handleClickShowPassword}
                                        edge="end"
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <br />
                        <Button className="forget-button" href="/forgetPassword" color="primary" size="small">
                            Forget password?
                                </Button>
                        <div className="buttons-login">
                            <Link to="/registration">Create account</Link>
                            <Button type="submit" variant="contained" onClick={this.handleData}>
                                SignIn
                                     </Button>
                        </div>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    open={this.state.snackBarOpen}
                    autoHideDuration={3000}
                    onClose={this.snackBarClose}
                    message={this.state.snackBarMsg}
                />
            </div>
        )
    }
}

export default login
