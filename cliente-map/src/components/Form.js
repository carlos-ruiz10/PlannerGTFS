import React, { useState, useEffect } from 'react';

function Formulario(props) {
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [paradas, setParadas] = useState([]);

    useEffect(() => {
        // Realizar la petición GET para obtener la lista de paradas
        fetch('http://127.0.0.1:5000/paradasgtfs')
            .then(response => response.json())
            .then(data => setParadas(data));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validar que el usuario ha seleccionado un origen y un destino
        if (origen && destino) {
            // Construir la URL con la ruta más corta
            const url = `http://127.0.0.1:5000/ruta-corta?origen=${origen}&destino=${destino}`;

            // Redirigir a la página con la ruta más corta
            window.location.href = url;
        } else {
            alert('Por favor selecciona un origen y un destino.');
        }
    }

    return (
        <div className="col-md-2" style={{ position: "absolute", top: "120px", left: "190px", zIndex: 999 }}>
            <form className='container text-center bg-light'>
                <p className="display-6 mt-3">Planner GTFS</p>
                <div className="mb-3 col-md-12">
                    <label className="mt-3 form-label">Selecciona Origen</label>
                    <select className="form-select fst-italic" aria-label="Default select example" value={origen} onChange={(event) => setOrigen(event.target.value)}>
                        <option value="">Select Origen</option>
                        {paradas.map((parada) => (
                            <option key={parada.id} value={parada.id}>{parada.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3 col-md-12">
                    <label className="form-label">Selecciona Destino</label>
                    <select className="form-select fst-italic" aria-label="Default select example" value={destino} onChange={(event) => setDestino(event.target.value)}>
                        <option value="">Select Destino</option>
                        {paradas.map((parada) => (
                            <option key={parada.id} value={parada.id}>{parada.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="mb-4 btn btn-success col-md-10 ms-md-auto fw-semibold">Calcular Ruta</button>
            </form>
        </div>
    );
}
export default Formulario;