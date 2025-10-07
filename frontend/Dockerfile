FROM node:18

WORKDIR /app

# Copiamos package.json y package-lock.json primero
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto de Angular
EXPOSE 4200

# Comando por defecto: levantar Angular en modo dev
CMD ["npm", "start"]
