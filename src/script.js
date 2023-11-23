async function listarClientes() {
  try {
    const response = await fetch("http://localhost:3000/clientes"); // Reemplaza la URL con la que desees
    const data = await response.json();

    // Agrega los datos a la lista
    listaDeDatos.push(data);

    // Muestra la lista actualizada
    console.log("Lista de datos:", listaDeDatos);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}
