# Backend - Sistema de gestión de productos

API REST desarrollada con **NestJS**, **TypeScript** y **PostgreSQL**, orientada a la gestión de productos mediante operaciones CRUD, validaciones de datos, filtros y paginación.

## Tecnologías utilizadas

- **NestJS 12:** framework para el desarrollo del backend.
- **TypeScript 6:** lenguaje de programación.
- **PostgreSQL:** sistema gestor de base de datos.
- **node-postgres (pg):** conexión y ejecución de consultas SQL.
- **class-validator:** validación de datos de entrada.
- **class-transformer:** transformación de parámetros recibidos.
- **node-pg-migrate:** administración de migraciones de la base de datos.
- **Vitest y Supertest:** herramientas para pruebas.

## Estructura del proyecto

```text
backend/
├── db/
│   ├── seeds/
│   │   └── products.sql
│   ├── migrations/
│   │   └── migracion
│   │   └── migracion
│   │   └── migracion
│   │   └── migracion
│   ├── respaldo.sql
│   └── respaldo2.sql
├── src/
│   ├── database/
│   │   └── database.module.ts
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   ├── update-product.dto.ts
│   │   │   └── find-products-query.dto.ts
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── .env.example
├── package.json
└── README.md
```

## Requisitos previos

- Node.js y npm.
- PostgreSQL.
- Una base de datos PostgreSQL creada para el proyecto.

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/EstebanBCS/BackendJs.git
```

2. Entrar al directorio del proyecto:

```bash
cd backend
```

3. Instalar las dependencias:

```bash
npm install
```

## Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`.

Configurar la conexión a PostgreSQL:

```env
DATABASE_URL=postgres://TU_USUARIO:TU_CONTRASEÑA@localhost:5432/TU_BASE_DE_DATOS
```

Sustituir los valores de ejemplo por las credenciales y el nombre de la base de datos correspondientes.

## Base de datos y migraciones

El proyecto utiliza PostgreSQL y consultas SQL directas mediante `pg`, sin utilizar un ORM.

### Crear la base de datos

Antes de ejecutar el backend, crea una base de datos PostgreSQL para el proyecto.

Por ejemplo, puedes utilizar el nombre `productos_db`.

### Ejecutar las migraciones

Las migraciones se encuentran en `db/migrations/` y permiten crear la estructura de la base de datos automáticamente, sin necesidad de crear las tablas manualmente.

Para ejecutar todas las migraciones pendientes:

```bash
npm run db:migrate
```

Este comando crea la tabla `products` y aplica las modificaciones necesarias, incluyendo:

- Creación de la tabla y sus columnas iniciales.
- Incorporación de la URL de imagen y el estado del producto.
- Restricciones para evitar precios y existencias negativas.
- Configuración del campo `ultima_actualizacion` como `TIMESTAMPTZ`.

Para revertir la última migración:

```bash
npm run db:rollback
```

Para generar una nueva migración:

```bash
npm run db:create -- nombre_migracion
```

**Importante:** las migraciones deben ejecutarse antes de cargar los datos de ejemplo.

## Datos de ejemplo (Seed)

El proyecto incluye un archivo SQL con 12 productos de ejemplo para facilitar las pruebas de la aplicación.

**Ubicación:**

```text
db/
└── seeds/
    └── products.sql
```

### Cargar los datos

Después de crear la base de datos y ejecutar las migraciones correspondientes para crear la tabla `products`, ejecuta el archivo `products.sql` desde PostgreSQL o pgAdmin.

También puedes ejecutarlo desde la terminal:

```bash
psql -U postgres -d nombre_base_datos -f db/seeds/products.sql
```

Reemplaza `nombre_base_datos` por el nombre de tu base de datos.

El archivo contiene 12 productos de ejemplo y utiliza `ON CONFLICT (id) DO NOTHING` para evitar insertar nuevamente registros cuyos identificadores ya existan.

**Nota:** Los datos incluidos son únicamente para pruebas y demostración.

Si el comando `psql` no está disponible en la terminal de Window, puedes abrir `products.sql` desde pgAdmin, seleccionar la base de datos correspondiente en Query Tool y ejecutar su contenido.

## Ejecución del proyecto

Iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

Por defecto, el servidor utiliza el puerto `3000`. También puede configurarse mediante la variable de entorno `PORT`.

La API estará disponible en:

```text
http://localhost:3000
```

## Endpoints

### Estado de la aplicación

| Método | Endpoint  | Descripción                                                    |
| ------ | --------- | -------------------------------------------------------------- |
| GET    | `/`       | Ruta principal de la aplicación.                               |
| GET    | `/health` | Comprueba el estado del servidor y la conexión con PostgreSQL. |

### Productos

| Método | Endpoint                 | Descripción                                     |
| ------ | ------------------------ | ----------------------------------------------- |
| POST   | `/products`              | Registrar un producto.                          |
| GET    | `/products`              | Consultar productos con filtros y paginación.   |
| GET    | `/products/:id`          | Consultar un producto por UUID.                 |
| PUT    | `/products/:id`          | Actualizar un producto.                         |
| DELETE | `/products/:id`          | Desactivar un producto mediante borrado lógico. |
| PATCH  | `/products/:id/activate` | Reactivar un producto previamente desactivado.  |

### Registrar un producto

**POST** `/products`

Ejemplo del cuerpo de la petición:

```json
{
  "nombre": "Mouse inalámbrico",
  "descripcion": "Mouse de prueba",
  "categoria": "Periféricos",
  "precio": 450,
  "stock": 10,
  "marca": "Logitech",
  "imagen_url": "https://example.com/mouse.jpg"
}
```

El identificador se genera automáticamente al registrar el producto.

### Consultar productos

**GET** `/products`

Permite filtrar los productos por estado y consultar los resultados mediante paginación.

Parámetros disponibles:

| Parámetro | Tipo     | Descripción                           | Valor predeterminado |
| --------- | -------- | ------------------------------------- | -------------------- |
| `activo`  | Booleano | Filtra productos activos o inactivos. | `true`               |
| `page`    | Entero   | Número de página.                     | `1`                  |
| `limit`   | Entero   | Cantidad de registros por página.     | `10`                 |

Ejemplos:

```http
GET /products
GET /products?activo=true
GET /products?activo=false
GET /products?page=1&limit=10
GET /products?activo=true&page=2&limit=5
```

La respuesta incluye los registros y los metadatos de paginación:

```json
{
  "data": [],
  "meta": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

El parámetro `limit` admite valores entre 1 y 100.

### Consultar un producto

**GET** `/products/:id`

Recibe el UUID del producto como parámetro de ruta.

Ejemplo:

```http
GET /products/1c1c4768-2bf1-4067-b1aa-d70bb0d6b8d9
```

### Actualizar un producto

**PUT** `/products/:id`

Permite actualizar uno o varios campos del producto.

Ejemplo:

```json
{
  "nombre": "Mouse inalámbrico Logitech",
  "precio": 500,
  "stock": 15
}
```

Los campos omitidos conservan su valor actual.

Los campos opcionales `descripcion`, `categoria`, `marca` e `imagen_url` pueden recibir `null` para limpiar su contenido.

### Eliminar un producto

**DELETE** `/products/:id`

El sistema utiliza borrado lógico (_soft delete_). Esto significa que el registro no se elimina físicamente de la base de datos, sino que su campo `activo` cambia a `false`.

También se actualiza el campo `ultima_actualizacion`.

### Reactivar un producto

**PATCH** `/products/:id/activate`

Permite reactivar un producto que fue desactivado previamente mediante el borrado lógico.

No requiere cuerpo (`body`). Únicamente necesita el UUID del producto en la URL.

**Ejemplo de respuesta (200 OK):**

```json
{
  "id": "aedf1c61-9f0b-41f2-b1f6-2d7e16ef83da",
  "nombre": "Silla Ergonomica de Oficina",
  "descripcion": "Silla ergonomica de alta calidad para oficina",
  "categoria": "Sillas",
  "precio": "2300",
  "stock": 5,
  "marca": "Generica",
  "fecha_alta": "2026-11-16T04:55:26.650Z",
  "ultima_actualizacion": "2026-11-16T19:24:46.114Z",
  "imagen_url": "https://images.unsplash.com/photo-1579487785973-74d2ca7abdd5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  "activo": true
}
```

Si el producto no existe o ya se encuentra activo, devuelve un error `404 Not Found`.

## Validaciones y manejo de errores

La aplicación utiliza un `ValidationPipe` global con las siguientes opciones:

- `whitelist`: elimina propiedades que no cuentan con validaciones.
- `forbidNonWhitelisted`: rechaza propiedades no permitidas.
- `transform`: transforma los datos recibidos para facilitar su validación.

Entre las validaciones implementadas se encuentran:

- Nombre obligatorio, de máximo 50 caracteres.
- Descripción de máximo 200 caracteres.
- Categoría y marca de máximo 50 caracteres.
- Precio numérico, con máximo dos decimales y sin valores negativos.
- Stock entero y sin valores negativos.
- URL válida para la imagen.
- UUID válido para los identificadores.
- Parámetros de consulta con valores permitidos y límites establecidos.

Principales códigos HTTP utilizados:

| Código | Descripción                               |
| ------ | ----------------------------------------- |
| 200    | Operación realizada correctamente.        |
| 201    | Producto creado correctamente.            |
| 400    | Datos inválidos o parámetros incorrectos. |
| 404    | Producto no encontrado o inactivo.        |
| 409    | Conflicto al registrar un producto.       |

## Manejo de conexiones

La conexión a PostgreSQL se administra mediante un `Pool` de `pg`, registrado como proveedor en `DatabaseModule`.

La aplicación también implementa el cierre de conexiones al apagarse mediante `enableShutdownHooks()` y el método `pool.end()`.

## Pruebas

El proyecto utiliza **Vitest** para ejecutar pruebas unitarias. Actualmente incluye una prueba básica del controlador principal, basada en la configuración inicial de NestJS.

Ejecutar las pruebas:

```bash
npm run test
```

Ejecutar las pruebas en modo observación:

```bash
npm run test:watch
```

Ejecutar las pruebas con cobertura:

```bash
npm run test:cov
```

Ejecutar las pruebas end-to-end:

```bash
npm run test:e2e
```

**Nota:** Los comandos de cobertura y pruebas end-to-end están disponibles, pero no se ha implementado una suite específica para cubrir los endpoints de productos.

## Control de calidad y pre-commit

El proyecto utiliza **Husky** y **lint-staged** para ejecutar verificaciones automáticas antes de cada commit.

El hook `pre-commit` ejecuta `npx lint-staged`, que aplica las siguientes tareas a los archivos preparados para el commit:

- **Archivos TypeScript (`.ts`):** análisis estático con Oxlint y formato con Prettier.
- **Archivos JavaScript, JSON, Markdown y YAML:** formato con Prettier.

Estas verificaciones ayudan a mantener la consistencia y calidad del código antes de registrar los cambios en Git.

## Otros comandos disponibles

| Comando                | Descripción                              |
| ---------------------- | ---------------------------------------- |
| `npm run build`        | Compila el proyecto.                     |
| `npm run start`        | Inicia la aplicación.                    |
| `npm run start:dev`    | Inicia en modo desarrollo.               |
| `npm run start:prod`   | Ejecuta la versión compilada.            |
| `npm run lint`         | Ejecuta el análisis estático del código. |
| `npm run format`       | Formatea los archivos TypeScript.        |
| `npm run format:check` | Comprueba el formato del código.         |
