/**
 * Snackbar redux actions
 *
 * @description Snackbar actions for redux
 * @author Bortoli German <german@borto.li>
 */
import {
    SNACKBAR_SHOW,
    SNACKBAR_HIDE,
    SnackBarActionType,
    SnackBarFeedbackType,
} from '../action.types';



/**
 * Show snackbar
 *
 * @param message
 * @param type
 */
export const snackBarShow = (message: string, type: SnackBarFeedbackType) => ({
    type: SNACKBAR_SHOW,
    snackbar: {
        message,
        type,
        visible: true,
    },
});

/**
 * Hide snackbar
 */
export const snackBarHide = () => ({
    type: SNACKBAR_HIDE,
    snackbar: {
        visible: false,
        message: '',
        type: SnackBarFeedbackType.info
    },
});