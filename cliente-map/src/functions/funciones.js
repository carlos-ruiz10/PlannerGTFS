import axios from 'axios';

const allStops = async (state) => {
    const peticion = await axios.get('http://127.0.0.1:5000/paradasgtfs')
    state(peticion.data.stops)
}

// const calculateRoute = async (id, state) => {
//     const peticion = await axios.get(`http://127.0.0.1:5000/ruta-corta?origen=${origen}&destino=${destino}`)
//     console.log(peticion)
// }


export {
    allStops
}
