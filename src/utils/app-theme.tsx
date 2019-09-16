import {deepOrange, purple, green, indigo, red} from "@material-ui/core/colors";

export const AppTheme = {
    INDIGO: 'indigo',
    DARK: 'dark',
    PURPLE: 'purple'
};

export default {
    [AppTheme.PURPLE]: {
        palette: {
            primary: purple,
            secondary: deepOrange,
        },
        status: {
            danger: red,
        },
    },
    [AppTheme.INDIGO]: {
        palette: {
            primary: indigo,
        },
    },
};
