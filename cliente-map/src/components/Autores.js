import React from 'react'

function Autores() {
  return (
    <div className='container col-md-10 text-center'>
      <h1 className="display-6 mt-3 mb-3">Desarrollado por:</h1>
      <div className='container col-md-6 text-center'>
        <div className="card mb-3 col align-self-center" >
          <div className="row g-0 col-md-auto">
            <div className="col-md-4">
              <img src="https://cdn-icons-png.flaticon.com/512/6998/6998110.png" className="img-fluid rounded-start" alt="user" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Ing. Carlos Alberto Ruiz Gutierrez</h5>
                <p className="card-text">Estudiante del Tecnológico Nacional de México/CENIDET. Proyecto para la obtención del grado de Maestro en ciencias computacionales perteneciente a la línea de investigación de cómputo inteligente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="display-6 mt-3 mb-3">Dirigido por:</h1>
      <div className='row align-items-center'>
        <div className="card mb-3 col align-self-center" >
          <div className="row g-0 col-md-auto">
            <div className="col-md-4">
              <img src="https://cdn-icons-png.flaticon.com/512/6998/6998058.png" className="img-fluid rounded-start" alt="user" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Dr. Hugo Estrada Esquivel</h5>
                <p className="card-text">Director de tesis.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='container col-md-1 text-center'></div>
        <div className="card mb-3 col align-self-center" >
          <div className="row g-0 col-md-auto">
            <div className="col-md-4">
              <img src="https://cdn-icons-png.flaticon.com/512/201/201634.png" className="img-fluid rounded-start" alt="user" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Dra. Alicia Martínez Rebollar</h5>
                <p className="card-text">Codirectora de tesis.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="display-6 mt-3 mb-3">Comité tutorial:</h1>
      <div className='row align-items-center'>
        <div className="card mb-3 col align-self-center" >
          <div className="row g-0 col-md-auto">
            <div className="col-md-4">
              <img src="https://cdn-icons-png.flaticon.com/512/6998/6998058.png" className="img-fluid rounded-start" alt="user" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Dr. Javier Ortíz Hernández</h5>
                <p className="card-text">Revisor 1.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='container col-md-1 text-center'></div>
        <div className="card mb-3 col align-self-center" >
          <div className="row g-0 col-md-auto">
            <div className="col-md-4">
              <img src="https://cdn-icons-png.flaticon.com/512/6998/6998058.png" className="img-fluid rounded-start" alt="user" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Dr. Nimrod González Franco</h5>
                <p className="card-text">Revisor 2.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Autores;