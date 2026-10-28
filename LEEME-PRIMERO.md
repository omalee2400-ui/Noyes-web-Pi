# Noyes & Associates — Landing premium

## Uso

Abre esta carpeta en Antigravity o VS Code. Para previsualizar desde la carpeta raíz ejecuta `python -m http.server 8080` y abre `http://localhost:8080/`. También puedes abrir `index.html` en Chrome para una revisión rápida; para comprobar rutas conviene usar servidor local.

## Estructura

- `index.html`: landing principal, contenido y estructura basado en PDF proporcionado por la firma.
- `assets/css/premium.css`: estilos premium y responsive.
- `assets/js/premium.js`: aparición en viewport, contadores y navegación móvil.
- `assets/images/`: imágenes originales del repositorio.
- `evaluacion/`: cuestionario breve de 4 preguntas y contacto.
- `gracias/`: página de confirmación reservada, no activa.

## Pendiente antes de publicar

1. Instalar video definitivo en hero y convertir el marcador decorativo en reproductor real.
2. Configurar endpoint seguro y consentimiento/privacidad para recepción de leads; actualmente **no se envían ni almacenan datos personales**.
3. Revisar con la firma los datos exactamente como deben mostrarse; se utilizó el PDF facilitado como fuente. El PDF tiene una etiqueta aislada '$25M' mientras la sección principal indica '$5M+'; se adoptó '$5M+' según instrucción posterior del propietario del proyecto.
4. Ajustar, si procede, afirmaciones profesionales, honorarios, referencias y testimonios para su publicación aprobada.
5. Enlazar correctamente la política de privacidad y decidir mecanismo bilingüe EN/ES (EN es una etiqueta visual, todavía no traduce el contenido).
6. Cambiar meta `noindex,nofollow` por indexación intencional **solo al publicar y verificar**.
7. Las fuentes de Google Fonts y los iconos Lucide usan CDNs; para una entrega completamente offline conviene empaquetarlos.

No se modificó ni publicó el repositorio de GitHub original.
