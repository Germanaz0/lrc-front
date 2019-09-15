/**
 * Map, child component
 *
 * @description Will render all the services into the map
 * @author Bortoli German <german@borto.li>
 */

import React from 'react';
import useStyles from './Search.styles';

/**
 * Child component of search
 * @constructor
 */
export default function Map() {
    const classes = useStyles();
    return (
        <div className={classes.map}>
            MAP
        </div>
    );
}