import {createStyles, makeStyles, Theme} from "@material-ui/core";

export default makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        formContainer: {
            width: '80%',
            marginTop: '20px',
            alignSelf: 'center',
        }
    }),
);