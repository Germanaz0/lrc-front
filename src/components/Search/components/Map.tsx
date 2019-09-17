/**
 * Map, child component
 *
 * @description Will render all the services into the map
 * @author Bortoli German <german@borto.li>
 */

import React from 'react';
import useStyles from '../Search.styles';
import {GeoCenter, ServiceType} from "../../../api-clients/findservices.api";
declare const google: any;

interface MapProps {
    center: GeoCenter | any;
    services: ServiceType[];
}
/**
 * Child component of search
 * @constructor
 */
export default function Map(props: MapProps) {
    const classes = useStyles();

    const {center} = props;
    let map: any = null;

    center.lat = parseFloat(center.lat);
    center.lng = parseFloat(center.lng);

    /**
     * Load markers and set boundaries
     */
    const loadMarkers = () => {
        if (!map) {
            return false;
        }

        props.services.forEach((serv: ServiceType) => {
            const mLat = serv.geolocation.coordinates[1];
            const mLng = serv.geolocation.coordinates[0];

            const marker = new google.maps.Marker({
                position: {lat: mLat, lng: mLng},
                title: "Hello World!"
            });

            const infowindow = new google.maps.InfoWindow({
                content: serv.title,
            });

            // To add the marker to the map, call setMap();
            marker.setMap(map);

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            // const bounds = new google.maps.LatLngBounds();
            // bounds.extend(marker.position);
            // map.fitBounds(bounds);
        });

        //(optional) restore the zoom level after the map is done scaling
        const listener = google.maps.event.addListener(map, "idle", function () {
            map.setZoom(14);
            google.maps.event.removeListener(listener);
        });
    };

    const generateMap = () => {
        map = new google.maps.Map(document.getElementById('services-map'), {
            center,
            zoom: 15,
            maptypeId: 'roadmap',
            disableDefaultUI: true,
        });

        // Add circle on user current location
        new google.maps.Circle({
            strokeColor: '#39d8ff',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#39d8ff',
            fillOpacity: 0.5,
            map: map,
            center,
            radius: 100
        });

        setTimeout(() => {
            loadMarkers();
        }, 500);

    };


    /**
     * Generate the map
     */
    setTimeout(() => {
        generateMap();
    }, 1000);

    return (
        <div className={classes.map} id="services-map">

        </div>
    );
}