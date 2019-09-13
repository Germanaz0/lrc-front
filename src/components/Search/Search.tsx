import React from 'react';
import Grid from '@material-ui/core/Grid';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { capitalize } from '@material-ui/core/utils';

import './Search.css';
import ListItems from './ListItems';

export default function Search() {

    const handleClick = () => {
        return true;
    };

    return (
        <div className="root">
            <Grid container spacing={0} className={"fullHeight"}>
                <Grid item xs={4} className="ListItems-Container">
                    <div className="Vertical-Grid">
                        <ListItems />
                    </div>

                </Grid>
                <Grid item xs={8}>
                    MAP
                </Grid>
            </Grid>
            {/*<SpeedDial*/}
            {/*    ariaLabel="SpeedDial example"*/}
            {/*    className={speedDialClassName}*/}
            {/*    hidden={hidden}*/}
            {/*    icon={<SpeedDialIcon />}*/}
            {/*    onBlur={handleClose}*/}
            {/*    onClick={handleClick}*/}
            {/*    onClose={handleClose}*/}
            {/*    onFocus={handleOpen}*/}
            {/*    onMouseEnter={handleOpen}*/}
            {/*    onMouseLeave={handleClose}*/}
            {/*    open={open}*/}
            {/*    direction={direction}*/}
            {/*>*/}
            {/*    {actions.map(action => (*/}
            {/*        <SpeedDialAction*/}
            {/*            key={action.name}*/}
            {/*            icon={action.icon}*/}
            {/*            tooltipTitle={action.name}*/}
            {/*            onClick={handleClick}*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</SpeedDial>*/}
        </div>
    );
}