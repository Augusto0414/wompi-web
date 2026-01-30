# WOMPI Web - E-commerce Platform

Una moderna plataforma de e-commerce construida con React, TypeScript, Redux Toolkit y Tailwind CSS, integrada con la pasarela de pagos Wompi.

## 🚀 Características

- **Catálogo de productos** con sistema de búsqueda
- **Carrito de compras** interactivo con gestión de estado
- **Proceso de checkout** completo con formularios validados
- **Integración con Wompi** para pagos seguros
- **Generación de recibos en PDF** automática
- **Diseño responsive** con Tailwind CSS
- **Gestión de estado** con Redux Toolkit
- **TypeScript** para mayor seguridad de tipos

## 📱 Capturas de Pantalla

### Página Principal

![Página Principal](docs/images/homepage.png)
_Catálogo de productos con opciones de búsqueda y navegación_

### Carrito de Compras

![Carrito de Compras](docs/images/shopping-cart.png)
_Carrito lateral con productos añadidos y opciones de cantidad_

### Proceso de Checkout

![Checkout](docs/images/checkout.png)
_Formulario de checkout con información de contacto, envío y resumen del pedido_

### Confirmación de Pago

![Pago Exitoso](docs/images/payment-success.png)
_Confirmación de pago exitoso con detalles de la transacción y opción de descarga de recibo_

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19.2.0, TypeScript
- **Estilado**: Tailwind CSS 4.1.18
- **Estado**: Redux Toolkit, React-Redux
- **Enrutamiento**: React Router DOM
- **Construcción**: Vite 7.2.4
- **Pagos**: Wompi API
- **PDF**: jsPDF, html2canvas
- **HTTP Client**: Axios

## 🚀 Instalación y Configuración

### Prerequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/Augusto0414/wompi-web.git
   cd wompi-web
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   # Crear archivo .env.local
   VITE_WOMPI_PUBLIC_KEY=your_wompi_public_key
   VITE_WOMPI_PRIVATE_KEY=your_wompi_private_key
   ```

4. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

5. **Construir para producción**

   ```bash
   npm run build
   ```

6. **Previsualizar build de producción**
   ```bash
   npm run preview
   ```

## 📂 Estructura del Proyecto

```
src/
├── api/                    # Configuración de API
│   └── wompi.ts           # Cliente para API de Wompi
├── components/            # Componentes reutilizables
│   ├── layout/           # Componentes de layout
│   └── ui/               # Componentes de UI
├── feature/              # Funcionalidades por módulo
│   ├── cart/             # Gestión de carrito
│   ├── catalog/          # Catálogo de productos
│   └── checkout/         # Proceso de pago
├── helpers/              # Funciones de utilidad
├── store/                # Configuración de Redux
└── types/                # Definiciones de TypeScript
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta ESLint para revisar código

## 💳 Datos de Prueba

Para probar el proceso de pago, utiliza los siguientes datos de tarjeta de crédito de prueba:

```
Card Number: 4242 4242 4242 4242
Cardholder Name: JOHN DOE
Expiry Date: 12/26
CVC: 123
```

> **Nota**: Estos son datos de prueba proporcionados por Wompi para testing. No uses datos reales de tarjetas de crédito en el entorno de desarrollo.

## 🌐 Deploy

La aplicación está configurada para ser desplegada en Render.com con el archivo `_redirects` para manejo de rutas SPA.

### Deploy automático

El proyecto se despliega automáticamente en cada push a la rama principal.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📧 Contacto

- **Desarrollador**: Augusto0414
- **Repositorio**: [https://github.com/Augusto0414/wompi-web](https://github.com/Augusto0414/wompi-web)

---

Hecho con ❤️ usando React + TypeScript + Vite
