# Inventory System v2

Sistema de gestión de inventario y pedidos desarrollado con:

- Laravel 12 (API REST)
- React + Vite
- MySQL
- Axios
- React Router

El proyecto está dividido en dos partes:

```text
inventory-system-v2/
│
├── app/
├── routes/
├── database/
├── ...
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── composer.json
└── README.md
```

---

## Requisitos

Antes de comenzar, asegúrese de tener instalado:

- PHP 8.2+
- Composer
- Node.js 22+
- NPM
- MySQL
- Git

---

## Clonar el proyecto

```bash
git clone https://github.com/ES2D/laravel-inventory-management.git

cd inventory-system-v2
```

---

## Configuración del Backend (Laravel)

### Instalar dependencias

```bash
composer install
```

### Crear archivo de entorno

```bash
cp .env.example .env
```

### Configurar la base de datos

Editar el archivo `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inventory_system
DB_USERNAME=root
DB_PASSWORD=
```

### Generar la clave de la aplicación

```bash
php artisan key:generate
```

### Ejecutar migraciones

```bash
php artisan migrate
```

### (Opcional) Ejecutar seeders

```bash
php artisan db:seed
```

### Levantar el servidor de Laravel

```bash
php artisan serve
```

La API estará disponible en:

```text
http://127.0.0.1:8000
```

---

## Configuración del Frontend (React)

Moverse al directorio del frontend:

```bash
cd frontend
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:5173
```

---

## Configuración de Axios

Verificar que el archivo:

```text
frontend/src/services/api.js
```

contenga:

```javascript
import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});
```

---

## Estructura del Proyecto

```text
inventory-system-v2/
│
├── app/
│   ├── Http/
│   ├── Models/
│   └── Services/
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── routes/
│   ├── web.php
│   └── api.php
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── router/
│   │
│   └── package.json
│
└── README.md
```

---

## Funcionalidades Implementadas

### Categorías

- Listar
- Crear
- Editar
- Eliminar

### Productos

- Listar
- Crear
- Editar
- Eliminar
- Manejo de stock

### Clientes

- Listar
- Crear
- Editar
- Eliminar

### Pedidos

- Crear pedidos
- Ver detalle
- Cambio de estado
- Cancelación
- Actualización automática del inventario

---

## Flujo de ejecución

Para ejecutar el proyecto correctamente, deben levantarse ambos servicios:

### Terminal 1

```bash
php artisan serve
```

### Terminal 2

```bash
cd frontend

npm run dev
```

---

## Acceso

### Backend

```text
http://127.0.0.1:8000
```

### API

```text
http://127.0.0.1:8000/api
```

### Frontend

```text
http://localhost:5173
```

---

## Tecnologías Utilizadas

- Laravel 12
- React 19
- Vite
- React Router
- Axios
- MySQL
- Bootstrap (próximamente)

---

## Autor

Efrain Avila
