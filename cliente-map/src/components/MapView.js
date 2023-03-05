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
    try {
      if (!stops.map(stop => stop.stop_id).includes(origen) || !stops.map(stop => stop.stop_id).includes(destino)) {
        alert('La parada seleccionada no existe');
        setOrigen('');
        setDestino('');
        return;
      }
      const peticion = await axios.get(`http://127.0.0.1:5000/short-route?origen=${origen}&destino=${destino}`)
      setRutaMasCorta(peticion.data.stops)
    } catch (error) {
      alert('Se ha producido un error. Inténtelo de nuevo más tarde.');
    } finally {
      setOrigen('');
      setDestino('');
    }

  }

  return (
    <div className="container text-center">
      <div className="row">
        <div className='col-3'>
          <form className='container text-center bg-light'>
            <p className="display-6 mt-3">Planner GTFS</p>
            <div className="mb-3 col-md-12">
              <label className="mt-3 form-label">Selecciona Origen</label>
              <input className="form-control fst-italic" list="origen-options" value={origen} onChange={(event) => setOrigen(event.target.value)} />
              <datalist id="origen-options">
                {stops.map((stop) => (
                  <option key={stop.stop_id} value={stop.stop_id}>{stop.stop_name}</option>
                ))}
              </datalist>

            </div>

            <div className="mb-3 col-md-12" >
              <label className="form-label">Selecciona Destino</label>
              <input className="form-control fst-italic" list="destino-options" value={destino} onChange={(event) => setDestino(event.target.value)} />
              <datalist id="destino-options">
                {stops.map((stop) => (
                  <option key={stop.stop_id} value={stop.stop_id}>{stop.stop_name}</option>
                ))}
              </datalist>
            </div>

            <button type="submit" className="mb-4 btn btn-success col-md-6 ms-md-auto fw-semibold" onClick={handleCalcularRuta}>Calcular Ruta</button>

            {rutaMasCorta && (
              <div className="text-bg-light col-sm-12 mb-3 mb-sm-0">
                <div className="card">
                  <div className="card-body"style={{overflowY: 'auto', maxHeight: '400px'}}>
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