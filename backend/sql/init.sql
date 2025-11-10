CREATE DATABASE IF NOT EXISTS nutricion_db;
USE nutricion_db;

CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  imagen VARCHAR(255),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen)
VALUES
  ('Proteína Vegana', 'Proteína vegetal sabor vainilla', 4500.00, 20, 'img-palta.jpg'),
  ('Multivitamínico', 'Suplemento con vitaminas A, B, C, D y E', 3200.00, 50, 'post-avena.jpg'),
  ('Barras Energéticas', 'Barras de cereales y frutos secos', 1500.00, 100, 'post-avena.jpg'),
  ('Omega 3', 'Suplemento de aceite de pescado', 2800.00, 30, 'post-panqueque.jpg'),
  ('Creatina Monohidratada', 'Suplemento para mejorar el rendimiento físico', 3500.00, 40, 'post-panqueques.jpg'),
  ('Vitamina C', 'Suplemento de vitamina C para fortalecer el sistema inmunológico', 1200.00, 80, 'post-tarta.jpg'),
  ('BCAA', 'Aminoácidos de cadena ramificada para recuperación muscular', 4000.00, 25, 'post-tarta.jpg'),
  ('Glutamina', 'Suplemento para la recuperación muscular y el sistema inmunológico', 3000.00, 35, 'post-tarta.jpg'),
  ('Pre-entrenamiento', 'Suplemento para aumentar la energía y el enfoque durante el entrenamiento', 3800.00, 45, 'post-tarta.jpg'),
  ('Zinc', 'Suplemento de zinc para la salud general y el sistema inmunológico', 1100.00, 60, 'post-tarta.jpg');

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  rol ENUM ('usuario', 'admin') DEFAULT 'usuario'
);

-- Tabla de carrito
CREATE TABLE IF NOT EXISTS carrito (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  agregado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  estado VARCHAR(50) DEFAULT 'pendiente',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla detalle_pedido (productos dentro del pedido)
CREATE TABLE IF NOT EXISTS detalle_pedido (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);
