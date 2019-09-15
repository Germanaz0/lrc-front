/**
 * Form to add or modify a service
 *
 * @description Modify or add a new service
 * @author Bortoli German <german@borto.li>
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import useStyles from './AddService.styles';
import {ServiceType} from "../../api-clients/findservices.api";
import {TextField} from "@material-ui/core";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AddServiceProps {
    service: ServiceType;
    setServiceFormValues: any;
}

export default function AddService(props: AddServiceProps) {

    const classes = useStyles();

    const {service} = props;
    if (!service) {
        return null;
    }

    function handleClose() {
        props.setServiceFormValues(null);
    }

    return (
        <div>
            <Dialog fullScreen open={true} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} color={service.id > 0 ? 'secondary' : 'primary'}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            {service.id > 0 ? 'Edit Service' : 'Add Service'}
                        </Typography>
                        <Button color="inherit" onClick={handleClose}>
                            {service.id > 0 ? 'Update' : 'Create'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <form className={classes.formContainer}>
                    <TextField
                        autoFocus
                        id="service-title"
                        label="Title"
                        placeholder="Service Title"
                        name="title"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        id="service-description"
                        label="Description"
                        placeholder="Describe the amazing service"
                        name="description"
                        multiline={true}
                        rows={5}
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        autoFocus
                        id="service-address"
                        label="Address"
                        placeholder="Eg, Saint Collins 123"
                        name="address"
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                id="service-city"
                                label="City"
                                placeholder="Eg, Jersey City"
                                fullWidth
                                name="city"
                                // helperText="Full width!"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                id="service-state"
                                label="State"
                                placeholder="Eg, New Jersey"
                                fullWidth
                                name="state"
                                // helperText="Full width!"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                autoFocus
                                id="service-zip-code"
                                label="Zip Code"
                                placeholder="Eg, 111-22"
                                fullWidth
                                name="zip-code"
                                // helperText="Full width!"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                id="service-latitude"
                                label="Latitude"
                                placeholder="Eg, 30.333"
                                fullWidth
                                name="lat"
                                // helperText="Full width!"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                autoFocus
                                id="service-longitude"
                                label="Longitude"
                                placeholder="Eg, -70.631"
                                fullWidth
                                name="lng"
                                // helperText="Full width!"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>



                </form>
            </Dialog>
        </div>
    );
}