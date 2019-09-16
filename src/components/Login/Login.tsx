/**
 * Login component
 *
 * @description Handle login form actions
 * @author Bortoli German <german@borto.li>
 */

import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import apiClient from '../../api-clients/findservices.api';
import {connect} from 'react-redux';
import {snackBarHide, snackBarShow} from "../../redux/actions/snackbar.action";
import {SnackBarFeedbackType} from "../../redux/action.types";

interface LoginProps {
    open: boolean;
    closeModal?: any;
    setLoggedIn: any;
    showSnackbar?: (message: string, type: SnackBarFeedbackType) => void,
}

function Login(props: LoginProps) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState();

    /**
     * Trigger the action to close the modal
     */
    const handleClose = () => {
        setErrors(false);
        props.closeModal();
    };

    /**
     * Will call login API and authenticate the user if valid
     */
    const handleLogin = () => {
        if (isLoading) {
            return false;
        }

        setIsLoading(true);
        console.log("Doing login with", email);
        apiClient.login(email, password)
            .then((response) => {
                apiClient.storeSession(response);
                props.setLoggedIn(true);

                if (props.showSnackbar) {
                    props.showSnackbar('You are now logged in', SnackBarFeedbackType.success);
                }

                handleClose();
            }).catch((error) => {
                setErrors(true);
            }).finally(() => {
                setIsLoading(false);
        });
    };

    /**
     * Event when the user is typing an email
     * @param event
     */
    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    /**
     * Event when the user is typing a passsowrd
     * @param event
     */
    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    /**
     * If the API returns any error, then will display a message
     */
    const renderError = () => {
        if (!errors) {
            return false;
        }

        return (
            <Typography color="error">
                The email or password is not valid, try again !
            </Typography>
        );
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        If you have the honor to be the amazing admin of this site, then you can modify and add
                        services.
                        Enjoy !
                    </DialogContentText>
                    {renderError()}
                    <TextField
                        autoFocus
                        margin="dense"
                        error={errors}
                        id="name"
                        label="Email Address"
                        type="email"
                        onChange={onEmailChange}
                        required
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        error={errors}
                        id="password"
                        label="Password"
                        type="password"
                        onChange={onPasswordChange}
                        required
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleLogin} color="primary"
                            disabled={email.length === 0 || password.length === 0 || isLoading}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({
    showSnackbar: (message: string, type: SnackBarFeedbackType) => dispatch(snackBarShow(message, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
