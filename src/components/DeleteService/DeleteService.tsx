import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FyiApliClient, {ServiceType} from "../../api-clients/findservices.api";

interface DeleteProps {
    service?: ServiceType,
    setDeleteService: any;
    refreshServices: any;
}

export default function DeleteService(props: DeleteProps) {
    const apiClient = new FyiApliClient();
    const { service } = props;

    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        props.setDeleteService(null);
    };

    const handleDelete = () => {

        if (!service) {
            return null;
        }

        setIsLoading(true);
        apiClient.deleteService(service).then(() => {
            props.refreshServices();
            handleClose();
        }).finally(() => {
            setIsLoading(false);
        });
    };

    if (!service) {
        return null;
    }

    return (
        <div>
            <Dialog
                open={true}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete "<b>{service.title}</b>" ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus disabled={isLoading}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}