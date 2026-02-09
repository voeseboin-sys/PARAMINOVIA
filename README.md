# ❤️ Nuestra Historia

Una tarjeta de amor interactiva y romántica convertida en aplicación Android. Una experiencia única que combina animaciones fluidas, música y un mensaje especial para el amor de tu vida.

## ✨ Características

- 💖 **Corazón Latiente**: Botón inicial con animación orgánica de latido
- 🌱 **Transformación**: El corazón se convierte en una semilla que cae con física realista
- 🌳 **Árbol del Amor**: Crecimiento animado del tronco, ramas y hojas en forma de corazón
- 📝 **Poema Romántico**: Texto con tipografía handwritten elegante
- ⏱️ **Contador en Tiempo Real**: Muestra el tiempo transcurrido desde el 9 de Agosto de 2024
- 🍃 **Lluvia de Corazones**: Hojas en forma de corazón cayendo suavemente
- 🎵 **Música de Fondo**: Reproducción automática con fallback para interacción del usuario

## 🚀 Instalación y Uso

### Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [Git](https://git-scm.com/)
- Cuenta de [GitHub](https://github.com/)

### Paso 1: Crear el Repositorio en GitHub

1. Ve a [GitHub](https://github.com/) e inicia sesión
2. Haz clic en el botón **"New"** para crear un nuevo repositorio
3. Nombra el repositorio: `mi-amor-app` (o el nombre que prefieras)
4. Selecciona **"Public"** o **"Private"** según tu preferencia
5. NO inicialices con README (ya lo tenemos)
6. Haz clic en **"Create repository"**

### Paso 2: Subir los Archivos

#### Opción A: Usando Git en tu computadora

```bash
# Clonar tu repositorio vacío
git clone https://github.com/TU_USUARIO/mi-amor-app.git
cd mi-amor-app

# Copiar todos los archivos de este proyecto aquí
# (index.html, css/, js/, assets/, etc.)

# Agregar archivos al staging
git add .

# Hacer commit
git commit -m "Initial commit: Tarjeta de amor interactiva"

# Subir a GitHub
git push origin main
```

#### Opción B: Subir manualmente por la web

1. Descarga este proyecto como ZIP
2. Extrae el contenido
3. En tu repositorio de GitHub, haz clic en **"Add file"** → **"Upload files"**
4. Arrastra todos los archivos extraídos
5. Escribe el mensaje de commit: "Initial commit"
6. Haz clic en **"Commit changes"**

### Paso 3: Agregar tu Música (IMPORTANTE)

> ⚠️ **Este paso es CRUCIAL**: La aplicación busca el archivo de música en una ubicación específica.

1. Prepara tu archivo de audio (formato MP3)
2. **Renómbralo exactamente como**: `MUSICA.MP3` (en mayúsculas)
3. Súbelo a la carpeta **`assets/`** de tu repositorio

La estructura final debe verse así:

```
mi-amor-app/
├── assets/
│   ├── MUSICA.MP3          ← TU ARCHIVO DE MÚSICA AQUÍ
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── ...
│   └── icon-512x512.png
├── css/
│   └── style.css
├── js/
│   └── script.js
├── .github/
│   └── workflows/
│       └── build.yml
├── .gitignore
├── capacitor.config.json
├── index.html
├── manifest.json
├── package.json
└── README.md
```

### Paso 4: Generar los Iconos (Opcional pero recomendado)

Para una mejor experiencia, genera iconos en todos los tamaños necesarios. Puedes usar:

- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [Favicon.io](https://favicon.io/)
- O cualquier herramienta de generación de iconos

Los tamaños requeridos son: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

### Paso 5: Activar GitHub Actions

El workflow de GitHub Actions ya está configurado. Solo necesitas:

1. Ve a la pestaña **"Actions"** en tu repositorio de GitHub
2. Si ves un mensaje sobre workflows, haz clic en **"I understand my workflows, go ahead and enable them"**
3. El workflow se ejecutará automáticamente cuando hagas push a la rama `main`

### Paso 6: Obtener tu APK

Después de subir los archivos:

1. Ve a la pestaña **"Actions"** en tu repositorio
2. Verás el workflow **"Build Android APK"** ejecutándose
3. Espera a que termine (toma aproximadamente 5-10 minutos)
4. Una vez completado, ve a la pestaña **"Actions"** → selecciona el workflow más reciente
5. En la sección **"Artifacts"**, descarga **"Nuestra-Historia-Debug-APK"**
6. El archivo `app-debug.apk` es tu aplicación lista para instalar

## 📱 Instalación en Android

1. Transfiere el archivo APK a tu dispositivo Android
2. En tu dispositivo, ve a **Configuración** → **Seguridad**
3. Activa **"Orígenes desconocidos"** o **"Instalar aplicaciones desconocidas"**
4. Abre el archivo APK desde tu administrador de archivos
5. Toca **"Instalar"**
6. ¡Disfruta de la experiencia romántica!

## 🎨 Personalización

### Cambiar la Fecha del Contador

Edita el archivo `js/script.js` y modifica la línea:

```javascript
startDate: new Date('2024-08-09T00:00:00'),
```

Cambia la fecha al día especial de tu relación.

### Cambiar el Texto del Poema

Edita el archivo `index.html` y modifica las líneas dentro de `.poem-container`:

```html
<div class="poem-container">
    <p class="poem-line">Tu texto personalizado aquí</p>
    <!-- ... -->
</div>
```

### Cambiar Colores

Edita el archivo `css/style.css` y modifica las variables CSS en `:root`:

```css
:root {
    --color-heart: #ff6b6b;        /* Color del corazón */
    --color-bg-start: #fff5f5;     /* Inicio del degradado */
    --color-bg-end: #ffe0e6;       /* Fin del degradado */
    /* ... */
}
```

## 🔧 Solución de Problemas

### La música no suena

Los navegadores modernos bloquean el autoplay de audio. La aplicación intenta iniciar la música en el primer clic del usuario. Asegúrate de:

- Tocar la pantalla al abrir la app
- Verificar que el archivo `MUSICA.MP3` esté en la carpeta `assets/`
- Comprobar que el volumen del dispositivo esté activado

### El build falla en GitHub Actions

1. Verifica que todos los archivos estén en su lugar
2. Revisa que el archivo `MUSICA.MP3` no sea demasiado grande (>50MB puede causar problemas)
3. Ve a la pestaña "Actions" → selecciona el workflow fallido → "Re-run jobs"

### La APK no se instala

- Asegúrate de haber habilitado "Orígenes desconocidos"
- Descarga nuevamente el APK (puede haberse corrompido)
- Verifica que tu dispositivo tenga Android 5.0 (API 21) o superior

## 📁 Estructura del Proyecto

```
mi-amor-app/
├── assets/                    # Recursos estáticos
│   ├── MUSICA.MP3            # 🎵 TU MÚSICA (REQUERIDO)
│   └── icon-*.png            # Iconos de la app
├── css/
│   └── style.css             # Estilos y animaciones
├── js/
│   └── script.js             # Lógica de la aplicación
├── .github/workflows/
│   └── build.yml             # Configuración de CI/CD
├── .gitignore                # Archivos ignorados por Git
├── capacitor.config.json     # Configuración de Capacitor
├── index.html                # Página principal
├── manifest.json             # Manifest de PWA
├── package.json              # Dependencias de Node.js
└── README.md                 # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Animaciones avanzadas con keyframes
- **JavaScript (ES6+)** - Lógica interactiva
- **Capacitor** - Conversión a aplicación móvil
- **GitHub Actions** - CI/CD automatizado
- **PWA** - Progressive Web App capabilities

## 💝 Créditos

Creado con amor para el amor de mi vida ❤️

**Fuentes tipográficas:**
- [Dancing Script](https://fonts.google.com/specimen/Dancing+Script) - Google Fonts
- [Great Vibes](https://fonts.google.com/specimen/Great+Vibes) - Google Fonts
- [Quicksand](https://fonts.google.com/specimen/Quicksand) - Google Fonts

## 📄 Licencia

Este proyecto es de uso personal y educativo. Siéntete libre de modificarlo y usarlo para expresar tu amor.

---

**Hecho con ❤️ | Desde el 9 de Agosto de 2024**
