# backend/Dockerfile
FROM node:18

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install -g @angular/cli && npm install

# Copiar el resto del código
COPY . .

# Exponer puerto de Angular
EXPOSE 4200

# Comando para desarrollo (con hot reload)
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]