--Creación de la base de datos con información de clientes de la galería
CREATE DATABASE IF NOT EXISTS clientes_galeria;
USE clientes_galeria;
CREATE TABLE IF NOT EXISTS clientes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    documento VARCHAR(30) NOT NULL UNIQUE,
    direccion VARCHAR(100) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    correo VARCHAR(100) NOT NULL,
);
--Cargue de datos de la tabla de clientes a la base de datos
INSERT INTO clientes(nombre, documento, direccion, telefono, correo)
VALUES
('Leidy Cano', '1234', 'calle 30 # 6-48', '3130000', 'leidycano@gmail.com'),
('Sara López', '4567', 'calle 15 # 1-25', '3200011', 'saralopez@gmail.com'),
('Jonathan Sierra', '8901', 'carrera 5 # 9-68', '3316666', 'jonathansierra@gmail.com');
