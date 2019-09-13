import React from 'react';
import Grid from '@material-ui/core/Grid';

import './Search.css';

export default function Search() {
    return (
        <div className="root">
            <Grid container spacing={0}>
                <Grid item xs={3}>
                    Listado
                </Grid>
                <Grid item xs={9}>
                    Mapa
                </Grid>

            </Grid>
        </div>
    );
}