/**
 * Topbar
 *
 * @description will render all the menus and search features on topbar.
 * @author Bortoli German <german@borto.li>
 */

import React, {ReactText} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

import useStyles from './Topbar.styles';

interface TopbarProps {
    isLoggedIn: boolean,
    distance?: number | ReactText,
    search?: string,
    setDistance?: any,
    handleLogin?: any,
    handleLogout?: any,
    handleSearch?: any,
    handleDistance?: any,
}

export default function Topbar(props: TopbarProps) {
    const classes = useStyles();

    /**
     * Render the login button
     */
    const renderLoginButton = () => {
        return (
            <Button onClick={props.handleLogin} variant="outlined" color={"inherit"} className={classes.button}>
            <PermIdentityOutlinedIcon className={classes.leftIcon} />
            Login
            </Button>
        );
    };

    /**
     * Render logout button
     */
    const renderLogoutButton = () => {
        return (
            <Button onClick={props.handleLogout} variant="outlined" color={"inherit"} className={classes.button}>
                <ExitToAppOutlinedIcon className={classes.leftIcon} />
                Logout
            </Button>
        );
    };

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {process.env.REACT_APP_NAME}
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            onChange={props.handleSearch}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                        <Select
                            value={props.distance}
                            onChange={props.handleDistance}
                            classes={{
                                root: classes.inputRoot,
                                select: classes.selectInput
                            }}
                            inputProps={{
                                name: 'distance',
                                id: 'distance',
                            }}
                            color="inherit"
                        >
                            <MenuItem value={0}>Anywhere</MenuItem>
                            <MenuItem value={1}>1 Km</MenuItem>
                            <MenuItem value={2}>2 Km</MenuItem>
                            <MenuItem value={5}>5 Km</MenuItem>
                            <MenuItem value={10}>10 Km</MenuItem>
                            <MenuItem value={25}>25 Km</MenuItem>
                            <MenuItem value={50}>50 Km</MenuItem>
                            <MenuItem value={100}>100 Km</MenuItem>
                        </Select>
                    </div>
                    <div className={classes.grow}/>

                    {props.isLoggedIn ? renderLogoutButton() : renderLoginButton()}

                </Toolbar>
            </AppBar>
        </div>
    );
}