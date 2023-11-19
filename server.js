const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const pc = require("picocolors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Joserba84',
  database: 'proyecto',
});

const corsOptions = {
  origin: "*", // o '*' para permitir cualquier dominio
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // habilita el envío de cookies y credenciales de autenticación
  optionsSuccessStatus: 204, // algunas implementaciones de navegadores requieren este código de estado para preflight
};

app.use(cors(corsOptions));

// Configurar cabeceras y cors custom
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
// 	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
// 	next();
// });

db.connect((err) => {
  if (err) {
    console.error(pc.red('Error de conexión a la base de datos:', err));
  } else {
    console.log(pc.bgGreen('Conectado a la base de datos MySQL'));
  }
});

// Rutas y operaciones CRUD aquí
app.get("/clientes", (req, res) => {
  const query = "SELECT * FROM clientes";

  db.query(query, (err, result) => {
    if (err) {
      console.error(pc.red("Error al listar clientes:", err));
      res.status(500).send("Error interno del servidor");
    } else {
      res.json(result);
    }
  });
});

app.post("/clientes", (req, res) => {
  const {nombre, apellido, direccion, telefono, email, nacimiento, preferencias } = req.body;
  const query = `INSERT INTO CLIENTES (
    nombre,
    apellido,
    direccion,
    telefono,
    email,
    nacimiento,
    preferencias
    ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      nombre,
      apellido,
      direccion, 
      telefono,
      email,
      nacimiento,
      preferencias
    ],
    (err, result) => {
      if (err) {
        console.error(pc.red("Error al insertar cliente:", err));
        res.status(500).send("Error interno del servidor");
      } else {
        res.send("Cliente insertado correctamente");
      }
    }
  );
});

app.put("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, telefono, email } = req.body;
  const query = `UPDATE clientes SET nombre=?, apellido=?, telefono=?, email=? WHERE id=?`;

  db.query(query, [nombre, apellido, telefono, email, id], (err, result) => {
    if (err) {
      console.error(pc.red("Error al actualizar cliente:", err));
      res.status(500).send("Error interno del servidor");
    } else {
      res.send(`Cliente con ID ${id} actualizado correctamente`);
    }
  });
});


app.delete("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM clientes WHERE id=?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(pc.red("Error al eliminar cliente:", err));
      res.status(500).send("Error interno del servidor");
    } else {
      res.send(`Cliente con ID ${id} eliminado correctamente`);
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
