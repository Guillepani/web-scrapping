# Web Scraping con Puppeteer

Proyecto de web scraping desarrollado con Node.js y Puppeteer.

El script navega automáticamente por múltiples páginas de la web Combat Arena, dentro de la categoría "Guantes de boxeo", y extrae información de productos reales de esta categoría.

---

## Tecnologías utilizadas

- Node.js
- Puppeteer
- JavaScript
- File System (fs)

---

## Funcionalidades

- Navegación automática entre páginas
- Web scraping de productos reales
- Gestión automática de cookies/modal
- Extracción de:
  - nombre
  - precio
  - imagen
- Logs de ejecución en terminal
- Manejo de errores con try/catch
- Generación automática de archivo JSON
- Arquitectura modular

---

## Instalación

```bash
npm install
```

---

## Ejecución

```bash
npm start
```

---

## Archivo generado

El proyecto genera automáticamente:

```txt
products.json
```

con todos los productos scrapeados.

El scraper genera automáticamente un dataset JSON con todos los productos encontrados.

---

## Estructura del proyecto

```txt
src/
├── index.js
└── utils/
    └── scrapeProducts.js
```

---

## Funcionamiento del scraper

El scraper realiza automáticamente el siguiente flujo:

1. Abre la web Combat Arena
2. Detecta y cierra el banner de cookies
3. Navega por las diferentes páginas de productos
4. Extrae nombre, precio e imagen de cada producto
5. Guarda toda la información en un archivo JSON

---

## Web utilizada

https://www.combatarena.es
