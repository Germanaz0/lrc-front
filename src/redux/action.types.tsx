export const SNACKBAR_SHOW = 'SNACKBAR_SHOW';
export const SNACKBAR_HIDE = 'SNACKBAR_HIDE';

/**
 * Type of different snacks
 */
export enum SnackBarFeedbackType {
    error = 'error',
    info = 'info',
    success = 'success',
    warning = 'warning',
}

/**
 * Snackbar object type
 */
export interface SnackBarActionType {
    message: string,
    visible: false,
    type: SnackBarFeedbackType,
}