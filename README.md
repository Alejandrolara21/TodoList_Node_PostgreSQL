# Todo List App

Esta es una aplicación de lista de tareas (todo list) desarrollada con Node.js, TypeScript y PostgreSQL. La aplicación sigue una arquitectura limpia, utilizando el patrón repositorio para mantener un código organizado y fácil de mantener.

## Características

- **Gestión de Tareas:** Permite crear, leer, actualizar y eliminar tareas.
- **Base de Datos PostgreSQL:** Utiliza PostgreSQL para almacenar y gestionar los datos de las tareas de manera eficiente.
- **Arquitectura Limpia:** Implementa el patrón repositorio para separar las capas de aplicación, dominio e infraestructura, facilitando la escalabilidad y mantenimiento del proyecto.
- **Escrito en TypeScript:** Todo el código está escrito en TypeScript, lo que proporciona un desarrollo más seguro y fácil de entender.

## Instalación

1. Clona este repositorio.
2. Instala las dependencias usando `npm install`.
3. Crea una base de datos PostgreSQL y configura las credenciales en el archivo `.env`.
4. Ejecuta las migraciones de la base de datos usando `npm run migrate`.
5. Inicia la aplicación con `npm start`.
