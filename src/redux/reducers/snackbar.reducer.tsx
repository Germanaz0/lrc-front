import {SNACKBAR_HIDE, SNACKBAR_SHOW, SnackBarActionType, SnackBarFeedbackType} from "../action.types";

const defaultSnackbar: SnackBarActionType = {
    visible: false,
    message: '',
    type: SnackBarFeedbackType.info,
};

export default (state = defaultSnackbar, action: any) => {
    switch (action.type) {
        case SNACKBAR_SHOW:
        case SNACKBAR_HIDE:
            return Object.assign({}, action.snackbar);
        default:
            return state;
    }
};