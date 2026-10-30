# NOYES PERSONAL INJURY — V3.1 móvil + SEO (30/10/2026)

## Qué está implementado

- Se conserva íntegramente el copy ES/EN de la V3 anterior (validado mediante comparación literal del texto visible de las ocho páginas). No se han cambiado precios, claims, títulos ni testimonios existentes.
- Ajustes de conversión para móviles: barra fija de evaluación que desaparece cerca del CTA final/footer, CTA de hero más ancho, botones y menú táctiles, mejor legibilidad, menos espacio vertical, tarjetas y carrusel adaptativos.
- Mejora del formulario móvil: las cuatro preguntas aparecen inmediatamente; la introducción y los beneficios se conservan más abajo, botones más grandes, campos de 16 px y progreso accesible. Mantiene opción de estado fuera de CT, ES/EN y los avisos legales.
- SEO: rutas canónicas con barra final, enlaces hreflang recíprocos, sitemap.xml con landings ES/EN, robots.txt informativo para proyecto, metadatos sociales Twitter y descripción de imágenes OpenGraph, tamaños de imagen de páginas legales, estilos responsive y verificación de que todas las imágenes tienen alt.
- `normalize.ts` del paquete sincronizado con la versión desplegada: nivel A incluye accidente laboral reciente con lesiones; nivel C para no lesionados, >2 años o fuera de CT (oportunidad de referido: pending_review); nivel B revisión manual.
- 13 pruebas unitarias de clasificación superadas. Validaciones visuales de ES/EN y formulario a 320, 375, 390, 768 y 1280 px: sin desbordamiento horizontal ni errores JavaScript.
- Configuración pública de Supabase contiene el endpoint del proyecto de la captura, pero **enabled:false** hasta las pruebas end-to-end autorizadas.

## Distinción CRÍTICA entre ambos paquetes

**PRUEBAS — V3.1:** home española e inglesa con `noindex,follow`. **Este es el ZIP que se debe instalar en la rama Actualizacion-V3 para revisar y probar.** No indexar un sitio que todavía no ha demostrado recepción confiable. La función del formulario continúa DESACTIVADA en el sitio mientras enabled:false.

**LANZAMIENTO SEO — V3.1:** home española e inglesa con `index,follow`, incluyendo sitemap. El formulario y página de confirmación permanecen noindex intencionalmente. Privacidad permanece `noindex` hasta aprobación del texto por la firma. **No publicar este ZIP en main ni activar Pages hasta que las comprobaciones funcionales, legales y de contenido estén finalizadas.** El formulario también está desactivado inicialmente: editar únicamente `assets/js/pi-config.js` tras comprobar y autorizar la integración.

## Cómo subir a GitHub Desktop SIN sustituir el sitio existente

1. Mantener la rama actual `Actualizacion-V2` como respaldo. Tras `Fetch origin`, crear una rama nueva `Actualizacion-V3` partiendo de `Actualizacion-V2`.
2. Extraer el ZIP **PRUEBAS** fuera del repositorio. Copiar los archivos y carpetas extraídos **a la raíz del repositorio local**, reemplazando archivos de la V2 pero sin copiar la carpeta contenedora.
3. Confirmar los cambios (commit) y publicar la nueva rama (Publish branch). Esto NO modifica `main`.
4. GitHub Pages actualmente publica desde main; la nueva rama no se verá en la URL pública hasta que se cambie temporalmente la fuente de Pages o se integre mediante un PR. No hacer ese cambio aún sin aprobación.
5. Para el lanzamiento definitivo, validar pruebas reales Supabase + Turnstile con datos ficticios, revisar privacidad y declaraciones, activar `enabled:true` y reemplazar solo cuando esté listo. Desplegar entonces los archivos de LANZAMIENTO SEO y fusionarlos a `main` o apuntar Pages a la rama definitiva.

## SEO: puntos que merecen atención real

- `https://omalee2400-ui.github.io/Noyes-web-Pi/index.html` es una variante de `.../Noyes-web-Pi/`. Su canonical **debe** apuntar a la segunda; un analizador puede indicarlo como aviso, pero es correcto. Analizar la URL con barra final.
- Los hreflang ES/EN actuales son recíprocos y autorreferentes para sus URL canónicas, con `x-default` a ES. No se deben modificar para señalar a la variante `/index.html`.
- El robots.txt del repositorio de proyecto se sirve bajo `/Noyes-web-Pi/robots.txt`, pero el robots.txt de nivel host que consultan los rastreadores está en `https://omalee2400-ui.github.io/robots.txt`. Este último requiere configurar un sitio raíz o un dominio propio; el archivo del proyecto por sí solo no elimina el aviso en el host raíz.
- `index,follow` solo permite la indexación. NO garantiza aparición, ranking, ni eliminar bloqueos externos. Tras publicar, verificar la indexación en Search Console y enviar `.../Noyes-web-Pi/sitemap.xml`.
- La política de privacidad todavía describe un formulario no operativo; el despacho debe aprobar una versión precisa del tratamiento real de datos antes de aceptar formularios.
- La dirección estructurada (`611 Access Road`, Stratford CT), teléfono, las membresías, premios, 4.9 Google Reviews, $5M+, casos y testimonios deben verificarse con el despacho. No se alteraron sin aprobación.
- Las imágenes de tres testimonios son ilustrativas y deben permanecer identificadas adecuadamente mientras no exista autorización de usar testimonios reales. Revisar con el despacho antes de indexar o lanzar anuncios.
- No se instaló Google Analytics, Meta Pixel ni Conversions API. No enviar detalles de lesiones, clasificación A/B/C ni ruta de referido a Meta.

## Pendiente antes de recibir leads

- Prueba real del formulario con Turnstile y Supabase (A/B/C + referidos, duplicados, error de red y CSP/CORS), verificar las dos tablas del registro.
- Confirmación verificable de citas de Calendly a través de mecanismo servidor (NO confiar solo en evento del navegador), y notificaciones corporativas.
- Accesos mínimos, política de retención, backups, cumplimiento y consentimiento; pruebas iOS/Android reales y PageSpeed Insights tras publicar en una URL HTTP(s).

## Archivos importantes

- `assets/css/mobile-v3.css`: solo mejoras responsive de landing.
- `assets/css/form-mobile-v3.css`: solo mejoras responsive de evaluación.
- `assets/js/pi-config.js`: estado y URL pública; ninguna clave secreta.
- `assets/js/premium.js`: menú con Escape/fuera, CTA móvil visible por contexto.
- `supabase/`: una copia de respaldo del backend (entregada por separado, NO es necesaria para la web pública).

IMPORTANTE: Este paquete contiene index,follow SOLO en las landings. No reemplazar main hasta aprobación legal y E2E funcional.
