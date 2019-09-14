import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FyiApliClient from '../../api-clients/findservices.api';
import './Login.css';

interface LoginProps {
    open: boolean;
    closeModal?: any;
    setLoggedIn: any;
}

export default function Login(props: LoginProps) {
    const apiClient = new FyiApliClient();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState();

    const handleClose = () => {
        props.closeModal();
    };

    const handleLogin = () => {
        console.log("Doing login with", email);
        apiClient.login(email, password)
            .then((response) => {
                apiClient.storeSession(response);
                props.setLoggedIn(true);
                handleClose();
            }).catch((error) => {
                setErrors(true);
            });
    };

    const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const renderError = () => {
        if (!errors) {
            return false;
        }

        return (
            <p className="error-container">
            The email or password is not valid, try again !
            </p>
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
                            disabled={email.length === 0 || password.length === 0}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}