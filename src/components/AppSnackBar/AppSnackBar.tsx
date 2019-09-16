/**
 * Application Snackbar
 *
 * @description Will render snackbars on some actions
 * @author Bortoli German <german@borto.li>
 */

import React, {SyntheticEvent} from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import useStyles1 from './AppSnackBar.styles';
import {snackBarHide} from "../../redux/actions/snackbar.action";
import {connect} from 'react-redux';
import {SnackBarActionType} from "../../redux/action.types";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export interface Props {
    className?: string;
    message?: string;
    onClose?: () => void;
    variant: keyof typeof variantIcon;
}

function MySnackbarContentWrapper(props: Props) {
    const classes = useStyles1();
    const {className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)}/>
                    {message}
        </span>
            }
            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}

interface AppSnackBarProps {
    snackbar: SnackBarActionType,
    hideSnackbar: () => void,
}

function AppSnackbar(props: AppSnackBarProps) {
    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        props.hideSnackbar();
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={props.snackbar.visible}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                    onClose={handleClose}
                    variant={props.snackbar.type}
                    message={props.snackbar.message}
                />
            </Snackbar>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    snackbar: state.snackbar,
});

const mapDispatchToProps = (dispatch: any) => ({
    hideSnackbar: () => dispatch(snackBarHide()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSnackbar);
