import {createStyles, makeStyles, Theme} from "@material-ui/core";

export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            top: 64,
            bottom: 0,
            left: 0,
            right: 0,
        },
        listItemContainer: {
            paddingTop: 15,
            paddingLeft: 5,
            height: '100%',
            overflowY: 'auto',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
            zIndex: 1,
        },
        fullHeight: {
            height: '100%',
        },
        map: {
            height: '100%',
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        card: {
            minWidth: 150,
            margin: 10,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    }),
);