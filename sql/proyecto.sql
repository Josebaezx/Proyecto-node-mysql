create table clientes(
IDCLIENTE bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
Nombre varchar(30),
Apellido varchar(30),
Direccion varchar(50),
Telefono varchar(12),
Email varchar(20),
Nacimiento Date,
Preferencias varchar(20)
);

create table productos(
IDPRODUCTO bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
Nombre varchar(20),
Descripción varchar(40),
SKU varchar(30),
Produccion Date,
Costounitario numeric
);


create table movimientos(
IDMOVIMIENTO bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
Tipo varchar(30),
idproducto bigint,
idcliente bigint
);


create table ventas(
IDVENTA bigint NOT NULL PRIMARY KEY AUTO_INCREMENT,
factura varchar(20),
idproducto bigint,
idcliente bigint,
subTotal numeric,
Total numeric
);


