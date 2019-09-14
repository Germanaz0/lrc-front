/**
 * ListItems, child component
 *
 * @description Will list all the services
 * @author Bortoli German <german@borto.li>
 */

import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Search.css';

const useStyles = makeStyles({
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
});

interface ListItemsProps {
    services: object[];
    isLoggedIn: boolean;
}
/**
 * List items class
 * @constructor
 */
export default function ListItems(props: ListItemsProps) {
    const classes = useStyles();


    const renderCardActions = () => {
        if (!props.isLoggedIn) {
            return false;
        }
        return (
            <CardActions>
                <Button size="small">Edit</Button>
                <Button color="secondary" size="small">Delete</Button>
            </CardActions>
        );
    };
    const renderServiceItem = (service: any) => {

        return (
            <Card key={service.id.toString()} className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {service.city}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {service.title}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {service.address}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {service.description}
                    </Typography>
                </CardContent>
                {renderCardActions()}
            </Card>
        );
    };

    const services = props.services.map(service => renderServiceItem(service));

    return (
        <Fragment>
            {services}
        </Fragment>
    );
}