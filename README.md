# ClaseWebGea-Backend

Backend API de gestión de usuarios con autenticación JWT para el proyecto ClaseWebGea.

## 📋 Descripción

Sistema backend construido con Express.js y MongoDB que proporciona autenticación de usuarios con tokens JWT, encriptación de contraseñas y control de acceso basado en roles.

## 🚀 Requisitos Previos

- **Node.js**: v18+ 
- **MongoDB**: Base de datos local o remota
- **pnpm**: v10.14.0+ (gestor de dependencias)

## 📦 Stack Tecnológico

- **Express.js** (5.2.1) - Framework web
- **MongoDB/Mongoose** (9.7.0) - Base de datos NoSQL
- **JWT** (9.0.3) - Autenticación con tokens
- **bcryptjs** (3.0.3) - Encriptación de contraseñas
- **Morgan** (1.11.0) - Logger HTTP
- **Nodemon** (3.1.14) - Recarga automática en desarrollo

## 💻 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd ClaseWebGea-Backend
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/ClaseWebGea
# O si utilizas MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/ClaseWebGea

# Puerto del servidor
PORT=3000

# Clave secreta para JWT
TOKEN_SECRET=tu_clave_secreta_aqui_muy_segura
```

## 🏗️ Estructura de Archivos

```
ClaseWebGea-Backend/
├── src/
│   ├── app.js                 # Configuración principal de Express
│   ├── config.js              # Variables de configuración
│   ├── db.js                  # Conexión a MongoDB
│   ├── index.js               # Punto de entrada del servidor
│   ├── controllers/
│   │   └── auth.controller.js # Lógica de autenticación
│   ├── libs/
│   │   └── jwt.js             # Utilidades JWT
│   ├── middlewares/           # Middlewares personalizados
│   ├── models/
│   │   └── user.model.js      # Esquema de usuario
│   ├── routes/
│   │   └── auth.routes.js     # Rutas de autenticación
│   └── schemas/               # Esquemas de validación
├── package.json               # Dependencias del proyecto
├── pnpm-lock.yaml             # Lock file de pnpm
└── README.md                  # Este archivo
```

### Descripción de Componentes

| Archivo | Descripción |
|---------|-------------|
| **app.js** | Configuración de Express, middlewares (Morgan, JSON parser) y rutas |
| **config.js** | Constantes globales (TOKEN_SECRET, etc.) |
| **db.js** | Conexión a MongoDB usando Mongoose |
| **index.js** | Inicia el servidor en puerto 3000 |
| **controllers/** | Lógica de negocio de autenticación |
| **libs/** | Funciones auxiliares (generación y verificación de JWT) |
| **middlewares/** | Middlewares de autenticación y autorización |
| **models/** | Esquemas Mongoose para la colección de usuarios |
| **routes/** | Rutas disponibles de la API |
| **schemas/** | Esquemas de validación (Zod, Joi, etc.) |

## ▶️ Ejecución

### Modo Desarrollo

```bash
pnpm run dev
```

El servidor iniciará en `http://localhost:3000` con recarga automática al cambiar archivos.

### Modo Producción

```bash
pnpm start
```

## 📡 Endpoints Disponibles

### Autenticación

- **POST** `/api/auth/register` - Registrar nuevo usuario
- **POST** `/api/auth/login` - Iniciar sesión
- **POST** `/api/auth/logout` - Cerrar sesión
- **GET** `/api/auth/profile` - Obtener perfil del usuario (requiere token)
- **POST** `/api/auth/refresh` - Refrescar token JWT

## 🔐 Autenticación JWT

### Flujo de Autenticación

1. Usuario se registra con email y contraseña
2. Contraseña se encripta con `bcryptjs`
3. Al login, se genera un JWT con la información del usuario
4. Cliente guarda el token en localStorage o sesión
5. En requests posteriores, enviar token en header `Authorization: Bearer <token>`

### Headers Requeridos

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🛠️ Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm run dev` | Inicia servidor en modo desarrollo con nodemon |
| `pnpm install` | Instala todas las dependencias |

## ⚙️ Configuración Importante

### Variables de Entorno

```env
# MongoDB - Usa conexión local o remota
MONGODB_URI=mongodb://localhost:27017/ClaseWebGea

# Puerto del servidor
PORT=3000

# Clave secreta JWT - Cambiar en producción
TOKEN_SECRET=ClaveSecretaMuySeguraDe32Caracteres
```

### MongoDB

#### Conexión Local

```bash
# En Windows (si MongoDB está instalado)
mongod

# La URI será:
MONGODB_URI=mongodb://localhost:27017/ClaseWebGea
```

#### Conexión Remota (MongoDB Atlas)

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster
3. Obtener connection string
4. Configurar en `.env`:

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/ClaseWebGea
```

## 📝 Modelos de Datos

### Usuario (User)

```javascript
{
  _id: ObjectId,
  username: String (requerido, único),
  email: String (requerido, único),
  password: String (requerido, encriptada),
  rol: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

Para testing de endpoints, usar herramientas como:

- **Postman** - Cliente REST GUI
- **Insomnia** - Cliente REST alternativo
- **cURL** - Línea de comandos

Ejemplo con cURL:

```bash
# Registrar usuario
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"juan","email":"juan@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","password":"123456"}'

# Acceder a ruta protegida
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <token>"
```

## 🐛 Solución de Problemas

### Error de conexión a MongoDB

```
MongooseError: Cannot connect to database
```

**Solución:**
- Verificar que MongoDB esté corriendo
- Validar URI en `.env`
- Verificar credenciales en MongoDB Atlas

### Error 401 Unauthorized

```
JWT malformed o expirado
```

**Solución:**
- Validar que token sea correcto
- Verificar que TOKEN_SECRET sea igual en ambos lados
- Token puede estar expirado

### Error de puerto en uso

```
Error: listen EADDRINUSE :::3000
```

**Solución:**
```bash
# Cambiar puerto en .env
PORT=3001
```

## 📚 Recursos Útiles

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [bcryptjs Guide](https://github.com/dcodeIO/bcrypt.js)

## 👥 Contribución

1. Crear rama feature: `git checkout -b feature/mi-feature`
2. Realizar cambios y commits con mensajes descriptivos
3. Push a la rama: `git push origin feature/mi-feature`
4. Abrir Pull Request

## 📄 Licencia

ISC

## 📞 Soporte

Para reportar bugs o sugerencias, abrir un issue en el repositorio.

---

**Última actualización:** Junio 2026
**Versión:** 1.0.0
