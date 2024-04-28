# Usa una imagen oficial de Python como imagen base
FROM python:3.9-slim

# Establece un directorio de trabajo
WORKDIR /app

# Instala las dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto del código fuente del proyecto en el contenedor
COPY . .

# Expone el puerto en el que Django se ejecutará
EXPOSE 80

# Ejecuta el servidor de desarrollo de Django al iniciar el contenedor
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]