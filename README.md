# Web Scraping con Puppeteer

Proyecto de web scraping desarrollado con Node.js y Puppeteer.

El script navega automáticamente por todas las páginas de la web Books To Scrape y extrae información de todos los productos disponibles.

## Tecnologías utilizadas

- Node.js
- Puppeteer
- JavaScript
- File System (fs)

---

## Funcionalidades

- Navegación automática entre páginas
- Web scraping de todos los productos
- Extracción de:
  - nombre
  - precio
  - imagen
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

---

## Estructura del proyecto

```txt
src/
├── index.js
└── utils/
    └── scrapeProducts.js
```

---

## Web utilizada

https://books.toscrape.com
