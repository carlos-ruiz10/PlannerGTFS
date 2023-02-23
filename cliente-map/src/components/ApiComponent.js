import React, { Component } from 'react';
import Map from './MapView';
import Formulario from './Form';

class ApiComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paradas: [], // lista de paradas obtenida de la primera petición GET
      rutaMasCorta: null, // resultado de la segunda petición GET
      origen: null, // parada de origen seleccionada por el usuario
      destino: null, // parada de destino seleccionada por el usuario
    };
    this.handleOrigenChange = this.handleOrigenChange.bind(this);
    this.handleDestinoChange = this.handleDestinoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Realizar la primera petición GET para obtener la lista de paradas
    fetch('http://127.0.0.1:5000/paradas')
      .then(response => response.json())
      .then(data => this.setState({ paradas: data }));
  }

  handleOrigenChange(event) {
    // Actualizar el estado con la parada de origen seleccionada por el usuario
    this.setState({ origen: event.target.value });
  }

  handleDestinoChange(event) {
    // Actualizar el estado con la parada de destino seleccionada por el usuario
    this.setState({ destino: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Construir la URL con la ruta más corta
    const url = `http://127.0.0.1:5000/ruta-corta?origen=${this.state.origen}&destino=${this.state.destino}`;

    // Realizar la segunda petición GET para obtener la ruta más corta
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ rutaMasCorta: data }));
  }

  render() {
    return (
      <div>
        <Map paradas={this.state.paradas} rutaMasCorta={this.state.rutaMasCorta} />
        <Formulario paradas={this.state.paradas} onOrigenChange={this.handleOrigenChange} onDestinoChange={this.handleDestinoChange} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default ApiComponent;