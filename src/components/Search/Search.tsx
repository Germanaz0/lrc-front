/**
 * Search Container
 *
 * @description It will contain all the logic to render the listing and map
 * @author Bortoli German <german@borto.li>
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import './Search.css';
import ListItems from './ListItems';
import Map from './Map';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

/**
 * Theme styling
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

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
        <div className="root">
            <Grid container spacing={0} className="fullHeight">
                <Grid item xs={4} className="ListItems-Container">
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