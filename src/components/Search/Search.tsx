/**
 * Search Container
 *
 * @description It will contain all the logic to render the listing and map
 * @author Bortoli German <german@borto.li>
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import ListItems from './components/ListItems';
import Map from './components/Map';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import useStyles from './Search.styles';

interface SearchProps {
    isLoggedIn: boolean;
    handleAddService?: any;
    services: object[];
    center: object;
}

/**
 * Search class
 * @constructor
 */
export default function Search(props: SearchProps) {
    const classes = useStyles();

    /**
     * Render add button, to add more services if you are loggedin
     */
    const renderAddButton = () => {
        if (!props.isLoggedIn) {
            return null;
        }

        return (
            <Fab aria-label="Add" className={classes.fab} color="primary" onClick={props.handleAddService}>
                <AddIcon />
            </Fab>
        );
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={0} className={classes.fullHeight}>
                <Grid item xs={4} className={classes.listItemContainer}>
                    <ListItems services={props.services} isLoggedIn={props.isLoggedIn} />
                </Grid>
                <Grid item xs={8}>
                    <Map />
                </Grid>
            </Grid>
            {renderAddButton()}
        </div>
    );
}