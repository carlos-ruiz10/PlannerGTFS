import React from "react";

function Response(props) {
  const { route } = props;

  if (!route) {
    return null;
  }

  return (
    <div>
      <p>La ruta más corta tiene una duración de {route.duration} segundos y una distancia de {route.distance} metros.</p>
    </div>
  );
}

export default Response;
