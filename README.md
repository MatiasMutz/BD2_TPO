# BD2_TPO - Sistema de Gestión de Base de Datos MongoDB

## 📋 Descripción
Trabajo Práctico Obligatorio de Base de Datos 2 del ITBA. Implementa una solución completa para manejar clientes, facturas, productos y teléfonos utilizando MongoDB y NEO4J.

## 🚀 Requisitos Previos (si se ejecuta localmente)
- Node.js 20.17.0 o superior
- MongoDB instalado y ejecutándose localmente
- Neo4j instalado y ejecutándose localmente
- npm (gestor de paquetes de Node.js)

## ⚙️ Instalación (si se ejecuta localmente)

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:

Crear un archivo .env en la raíz del proyecto y agregar las siguientes variables:
```
MONGODB_URI=mongodb://root:example@mongo:27017/
NEO4J_URI=bolt://neo4j:7687
NEO4J_USER=root
NEO4J_PASSWORD=example
```

4. Correr comando de ayuda para ver los comandos disponibles:
```bash
npm run help
```

## 🚀 Utilización (en codespaces)
- Estando dentro de GitHub Codespaces, crear un nuevo Codespace.
- Por defecto, se inicializa la base de datos con los datos de los CSV originales.
- Para ver los comandos disponibles, ejecutar el comando `npm run help`.
- En el caso de por ejemplo querer realizar la query 1 para mongo, se debe ejecutar el comando `npm run m1`.
