# Noyes & Associates — Landing Personal Injury · V2 (pruebas)

## Qué contiene

- `index.html`: landing en español.
- `en/index.html`: versión inglesa profesionalmente redactada; requiere revisión jurídica previa al lanzamiento.
- `evaluacion/` y `en/evaluacion/`: formularios de evaluación con cuatro preguntas.
- `gracias/` y `en/gracias/`: páginas de confirmación reservadas (todavía no activas).
- `privacidad/` y `en/privacy/`: borradores de política de privacidad para revisión legal.
- `assets/`: CSS, JavaScript, imágenes comprimidas y favicon azul.

## Importante: formularios NO conectados

La web es un **sitio de pruebas**. El formulario no realiza POST/fetch ni registra las respuestas; muestra un aviso al intentar enviarlo. No se ha instalado Meta Pixel, Analytics, un CRM ni eventos de conversión. **No usar para captar leads reales** hasta integrar un destino seguro, probarlo y actualizar la política de privacidad.

Todas las páginas incluyen `noindex,follow`; la página de agradecimiento no constituye confirmación de recepción. Para indexar solo tras la aprobación de la firma, retirar `noindex` en las páginas públicas apropiadas, revisar canonical/hreflang con dominio definitivo y preparar sitemap y Search Console.

## Cómo revisar

Desde esta carpeta ejecutar `python -m http.server 8080` y abrir `http://localhost:8080/`. En GitHub Pages, publicar **el contenido de esta carpeta**, manteniendo `index.html` en la raíz del repositorio (sin una carpeta exterior de nivel extra).

## Qué falta antes de publicar en producción

1. Revisión y aprobación de los resultados económicos, asociaciones y afirmaciones publicitarias.
2. Confirmar autorización y autenticidad de testimonios. Las tres imágenes nuevas están marcadas como **ilustrativas** y los textos como pendientes de verificación; no deben presentarse como testimonios verificados hasta contar con autorización.
3. Revisar los textos y la terminología legal en inglés.
4. Confirmar responsabilidades sobre los datos, CRM/correo, plazos de conservación, proveedores, consentimiento y política de privacidad.
5. Incluir el vídeo definitivo y configurar la reproducción sin afectar carga y accesibilidad.
6. Revisar legalmente las afirmaciones del contenido de la landing y la política de privacidad antes de lanzar.

## Optimizaciones

Imágenes WebP, iconos SVG integrados sin biblioteca externa de iconos, favicon azul para la pestaña, carrusel controlado por el usuario, animaciones ligeras con `IntersectionObserver` y alternativa para movimiento reducido. Se mantienen Montserrat y Playfair Display.
