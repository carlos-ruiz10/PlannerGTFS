//Componente Markers

import React from "react";
import { Marker, Popup } from "react-leaflet";
import { IconLocation } from "./IconLocation";

const Markers = ({ data }) => {
    return (
        <>
            {data.map((stops, index) => (
                <Marker key={index} position={[stops.latitude, stops.longitude]} icon={IconLocation}>
                    <Popup>{stops.name}</Popup>
                </Marker>
            ))}
        </>
    );
};

export default Markers;
