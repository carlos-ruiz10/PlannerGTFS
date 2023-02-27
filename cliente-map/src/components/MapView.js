import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { allStops } from '../functions/funciones'
import axios from 'axios';
import { IconLocation } from './IconLocation';


function MapView() {
  const [stops, setStops] = useState([])
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [rutaMasCorta, setRutaMasCorta] = useState([]);


  useEffect(() => {
    allStops(setStops)
  }, [])


  const handleCalcularRuta = async (event) => {
    event.preventDefault();
    if (!origen || !destino) {
      alert('Selecciona origen y destino');
      return;
    }
    const peticion = await axios.get(`http://127.0.0.1:5000/ruta-corta?origen=${origen}&destino=${destino}`)
    setRutaMasCorta(peticion.data.stops)

  }

  return (
    <div className="container text-center">
      <div className="row">
        <div className='col-3'>
          <form className='container text-center bg-light'>
            <p className="display-6 mt-3">Planner GTFS</p>
            <div className="mb-3 col-md-12">
              <label className="mt-3 form-label">Selecciona Origen</label>
              <select className="form-select fst-italic" aria-label="Default select example" value={origen} onChange={(event) => setOrigen(event.target.value)}>
                <option value="">Select Origen</option>
                {stops.map((stops) => (
                  <option key={stops.id} value={stops.id}>{stops.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-3 col-md-12" >
              <label className="form-label">Selecciona Destino</label>
              <select className="form-select fst-italic" aria-label="Default select example" value={destino} onChange={(event) => setDestino(event.target.value)}>
                <option value="">Select Destino</option>
                {stops.map((stops) => (
                  <option key={stops.id} value={stops.id}>{stops.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="mb-4 btn btn-success col-md-6 ms-md-auto fw-semibold" onClick={handleCalcularRuta}>Calcular Ruta</button>

            {rutaMasCorta && (
              <div className="text-bg-light col-sm-12 mb-3 mb-sm-0">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">La ruta más corta es:</h5>
                    <p className="card-text">{rutaMasCorta.map(stops => <React.Fragment key={stops.name}>{stops.name}<br /></React.Fragment>)}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="col-9">
          <MapContainer center={{ lat: '19.42847', lng: '-99.12766' }} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' />
            
            {rutaMasCorta.map(stops => (
              <Marker key={stops.name} position={[stops.latitude, stops.longitude]} icon={IconLocation}>
                <Popup>
                  {stops.name}
                </Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>
      </div>

    </div>
  )
}

export default MapView;