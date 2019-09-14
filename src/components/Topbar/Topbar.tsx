/**
 * Topbar
 *
 * @description will render all the menus and search features on topbar.
 * @author Bortoli German <german@borto.li>
 */

import React from 'react';
import {fade, makeStyles, Theme, createStyles} from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: 200,
            },
        },
        selectInput: {
            color: 'white',
            '&:before': {
                borderColor: 'white',
            },
            '&:after': {
                borderColor: 'white',
            }
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        button: {
            margin: theme.spacing(1),
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

interface TopbarProps {
    isLoggedIn: boolean,
    setDistance?: any
}

export default function Topbar(props: TopbarProps) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        distance: 0,
        search: '',
    });

    const handleDistance = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name as string]: event.target.value,
        }));
    };

    const renderLoginButton = () => {
        return (
            <Button variant="outlined" color={"inherit"} className={classes.button}>
            <PermIdentityOutlinedIcon className={classes.leftIcon} />
            Login
            </Button>
        );
    };

    const renderLogoutButton = () => {
        return (
            <Button variant="outlined" color={"inherit"} className={classes.button}>
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
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                        <Select
                            value={values.distance}
                            onChange={handleDistance}
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