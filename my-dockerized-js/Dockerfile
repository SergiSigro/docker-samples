# Usar la imagen oficial de nginx
FROM nginx:alpine

# Eliminar los archivos predeterminados de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos estáticos del juego al contenedor
COPY index.html /usr/share/nginx/html
COPY pong.js /usr/share/nginx/html

# Exponer el puerto 8080
EXPOSE 8080

# Iniciar Nginx y mantenerlo en ejecución
CMD ["nginx", "-g", "daemon off;"]
