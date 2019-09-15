/**
 * Search Container
 *
 * @description It will contain all the logic to render the listing and map
 * @author Bortoli German <german@borto.li>
 */

import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import ListItems from './components/ListItems';
import Map from './components/Map';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteService from '../DeleteService/DeleteService';

import useStyles from './Search.styles';
import AddService from "../AddService/AddService";

interface SearchProps {
    isLoggedIn: boolean;
    services: object[];
    center: object;
    refreshServices: any;
}

/**
 * Search class
 * @constructor
 */
export default function Search(props: SearchProps) {
    const classes = useStyles();

    const [deleteService, setDeleteService] = useState();
    const [serviceFormValues, setServiceFormValues] = useState();

    const handleAddService = () => {
        setServiceFormValues(
            {
                id: 0,
                title: '',
                description: '',
                address: '',
                country: '',
                city: '',
                state: '',
                zip_code: '',
                geolocation: {
                    type: 'Point',
                    coordinates: [0, 0],
                },

            }
        );
    };

    /**
     * Render add button, to add more services if you are loggedin
     */
    const renderAddButton = () => {
        if (!props.isLoggedIn) {
            return null;
        }

        return (
            <Fab aria-label="Add" className={classes.fab} color="primary" onClick={handleAddService}>
                <AddIcon />
            </Fab>
        );
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={0} className={classes.fullHeight}>
                <Grid item xs={4} className={classes.listItemContainer}>
                    <ListItems
                        services={props.services}
                        isLoggedIn={props.isLoggedIn}
                        setDeleteService={setDeleteService}
                        editService={setServiceFormValues}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Map />
                </Grid>
            </Grid>

            {renderAddButton()}

            <DeleteService
                service={deleteService}
                setDeleteService={setDeleteService}
                refreshServices={props.refreshServices}
            />

            <AddService
                service={serviceFormValues}
                setServiceFormValues={setServiceFormValues}
                refreshServices={props.refreshServices}
            />
        </div>
    );
}