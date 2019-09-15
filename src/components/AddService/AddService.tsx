/**
 * Form to add or modify a service
 *
 * @description Modify or add a new service
 * @author Bortoli German <german@borto.li>
 */
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import useStyles from './AddService.styles';
import apiClient, {ServiceType} from "../../api-clients/findservices.api";
import {TextField} from "@material-ui/core";

const _objectGet = require('lodash/get');

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AddServiceProps {
    service: ServiceType;
    setServiceFormValues: any;
    refreshServices: any;
}

/**
 * Main edit/add dialog
 * @param props
 * @constructor
 */
export default function AddService(props: AddServiceProps) {

    const {service} = props;

    const classes = useStyles();
    const [values, setValues] = useState<ServiceType>();
    const [formErrors, setFormErrors] = useState([]);
    const [geolocation, setGeolocation] = useState({lat: 0, lng: 0});

    useEffect(() => {
        setValues(service);

        if (service) {
            // const lat = _objectGet(service, 'geolocation.coordinates[0]', 0);
            // const lng = _objectGet(service, 'geolocation.coordinates[1]', 0);
            const lat = service.geolocation.coordinates[1];
            const lng = service.geolocation.coordinates[0];
            setGeolocation({lat, lng});
        }

    }, [service]);

    if (!service) {
        return null;
    }

    const handleChange = (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!values) {
            return null;
        }

        if (name === 'lat' || name === 'lng') {
            setGeolocation({ ...geolocation, [name]: event.target.value });
        } else {
            setValues({ ...values, [name]: event.target.value });
        }

    };

    const handleClose = () =>{
        props.setServiceFormValues(null);
    };

    const handleSubmit = () => {
        const formData = Object.assign({}, values, {geolocation});
        apiClient.createOrUpdate(formData).then((response) => {
            props.refreshServices().then(() => {
                handleClose();
            });

        }).catch((error) => {
            const errors = _objectGet(error, 'response.data.errors', []);
            setFormErrors(errors);
        });
    };

    const getInputErrorMessage = (name: string) => {
        return _objectGet(formErrors, name, []).join(', ');
    };
    const checkErrorOnInput = (name: string) => {
        return getInputErrorMessage(name) ? true : false;
    };

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
                        <Button color="inherit" onClick={handleSubmit}>
                            {service.id > 0 ? 'Update' : 'Create'}
                        </Button>
                    </Toolbar>
                </AppBar>
                <form className={classes.formContainer} onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        id="service-title"
                        error={checkErrorOnInput('title')}
                        helperText={getInputErrorMessage('title')}
                        required
                        label="Title"
                        placeholder="Service Title"
                        name="title"
                        value={_objectGet(values, 'title', '')}
                        onChange={handleChange('title')}
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
                        error={checkErrorOnInput('description')}
                        helperText={getInputErrorMessage('description')}
                        name="description"
                        multiline={true}
                        value={_objectGet(values, 'description', '')}
                        onChange={handleChange('description')}
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
                        id="service-address"
                        required
                        label="Address"
                        placeholder="Eg, Saint Collins 123"
                        name="address"
                        error={checkErrorOnInput('address')}
                        helperText={getInputErrorMessage('address')}
                        value={_objectGet(values, 'address', '')}
                        onChange={handleChange('address')}
                        // helperText="Full width!"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={3}>
                            <TextField
                                id="service-country"
                                required
                                label="Country"
                                placeholder="Eg, USA"
                                fullWidth
                                name="country"
                                error={checkErrorOnInput('country')}
                                helperText={getInputErrorMessage('country')}
                                value={_objectGet(values, 'country', '')}
                                onChange={handleChange('country')}
                                // helperText="Full width!"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="service-city"
                                required
                                label="City"
                                placeholder="Eg, Jersey City"
                                fullWidth
                                name="city"
                                error={checkErrorOnInput('city')}
                                helperText={getInputErrorMessage('city')}
                                value={_objectGet(values, 'city', '')}
                                onChange={handleChange('city')}
                                // helperText="Full width!"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="service-state"
                                required
                                label="State"
                                placeholder="Eg, New Jersey"
                                fullWidth
                                name="state"
                                error={checkErrorOnInput('state')}
                                helperText={getInputErrorMessage('state')}
                                value={_objectGet(values, 'state', '')}
                                onChange={handleChange('state')}
                                // helperText="Full width!"
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="service-zip-code"
                                required
                                label="Zip Code"
                                placeholder="Eg, 111-22"
                                fullWidth
                                name="zip_code"
                                error={checkErrorOnInput('zip_code')}
                                helperText={getInputErrorMessage('zip_code')}
                                value={_objectGet(values, 'zip_code', '')}
                                onChange={handleChange('zip_code')}
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
                                id="service-latitude"
                                required
                                label="Latitude"
                                placeholder="Eg, 30.333"
                                fullWidth
                                name="lat"
                                error={checkErrorOnInput('geolocation.lat')}
                                helperText={getInputErrorMessage('geolocation.lat')}
                                value={geolocation.lat}
                                onChange={handleChange('lat')}
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
                                id="service-longitude"
                                required
                                label="Longitude"
                                placeholder="Eg, -70.631"
                                fullWidth
                                name="lng"
                                error={checkErrorOnInput('geolocation.lng')}
                                helperText={getInputErrorMessage('geolocation.lng')}
                                value={geolocation.lng}
                                onChange={handleChange('lng')}
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