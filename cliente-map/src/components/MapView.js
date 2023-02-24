import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { allStops } from '../functions/funciones'


function MapView() {
  const [stops, setStops] = useState([])
 // const params = useParams()

  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');


  useEffect(() => {
    allStops(setStops)
  }, [])

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

            <button type="submit" className="mb-4 btn btn-success col-md-10 ms-md-auto fw-semibold">Calcular Ruta</button>
          </form>
        </div>


        <div className="col-9">
          <MapContainer center={{ lat: '19.42847', lng: '-99.12766' }} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors' />
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default MapView;