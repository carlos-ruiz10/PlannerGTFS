import React from "react";
import { Marker } from "react-leaflet";
import { IconLocation } from "./IconLocation";

const Markers = () => {
    return (
        <Marker position={{lat: '19.42847', lng: '-99.12766'}} icon={IconLocation} />
    )
}

export default Markers