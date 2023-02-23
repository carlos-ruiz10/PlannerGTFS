import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import Markers from "./Markers";

const MapView = () => {
    return <div className="mb-3 col-md-12">
        <div className="mb-3">
            <MapContainer center={{ lat: '19.42847', lng: '-99.12766' }} zoom={13}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' />
                <Markers />
            </MapContainer>
        </div>
    </div>
};

export default MapView;