// Lista para almacenar datos
let listaDeDatos = [];

// Función para realizar una solicitud GET y agregar datos a la lista
function mostrarListaClientes() {
  window.location.href = "lista-clientes.html";
  
}

function registroCliente() {
  window.location.href = "registro-clientes.html";
}

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

// Llama a la función para realizar la solicitud
// obtenerDatos();
