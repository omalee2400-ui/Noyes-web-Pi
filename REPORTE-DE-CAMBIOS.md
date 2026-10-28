# Noyes Personal Injury — Entrega V2 / 28 octubre 2026

## SEO técnico
- `noindex,follow` en las ocho páginas durante las pruebas; **no se ha habilitado indexación**.
- Canonical autorreferencial para las versiones actuales de GitHub Pages; alternates `hreflang=es/en/x-default`.
- Metadatos de descripción y Open Graph; datos estructurados básicos `LegalService` sin reseñas inventadas.
- Estadísticas visuales dejaron de utilizar `h3`; jerarquía H1/H2/H3 más clara sin cambiar los tamaños ni los títulos aprobados.
- Los encabezados no permanecen ocultos fuera de pantalla: las animaciones usan apariciones progresivas al entrar en el viewport.
- Imágenes optimizadas a WebP y dimensiones explícitas, con carga diferida excepto imagen principal. SVGs de iconos integrados en el HTML, sin dependencia de biblioteca externa.
- El H1 no se ha acortado, por respeto al copy aprobado; la advertencia de longitud de la extensión no equivale a penalización de Google.
- No se ha añadido un `robots.txt` de dominio raíz: GitHub Pages publica esta landing bajo una **subruta** del dominio del usuario. La exclusión temporal se controla con `noindex`.

## Cambios visuales y funcionales
1. Franja superior centrada, número retirado de la franja, selector ES/EN funcional, burbuja de Google con movimiento flotante.
2. Estadísticas y preocupación post-accidente: animación, «apenas comienzan» en minúsculas, contraste mejorado y aparición progresiva de 4 tarjetas.
3. Retrato de Juan sustituido por el archivo suministrado; conserva su recorte dentro de la tarjeta (fuente original de 254×257 px).
4. Áreas de práctica: título y descripción actualizados exactamente a la última versión aprobada; etiqueta amarilla eliminada.
5. Cinco tarjetas de resultados: entrada escalonada, importes animados y hover sutil, sin cambiar cifras ni textos.
6. Carrusel de seis testimonios: tres originales + Carlos M., Patricia R. y Roberto G.; flechas y desplazamiento táctil. Retratos nuevos en orden recibido.
7. CTA final: nuevo título aprobado y animación suave.
8. Footer: logotipo blanco, copyright actualizado, aviso de prototipo eliminado, enlace a nueva política de privacidad.
9. Favicon azul con fondo blanco, centrado para tamaños pequeños, exclusivo del icono del navegador.

## Páginas y funcionamiento
- `index.html` — Español; `en/index.html` — Inglés.
- `evaluacion/`, `en/evaluacion/` — Cuestionario bilingüe de 4 preguntas, **no conectado a sistema de leads**.
- `gracias/`, `en/gracias/` — Página reservada, no confirma envío real.
- `privacidad/`, `en/privacy/` — Documentos de privacidad **en borrador**, pendientes de validación legal y de conocer el CRM/proveedor definitivo.
- Probadas rutas locales, elementos de página, las preguntas de formulario, 6 tarjetas del carrusel, navegación de flechas y ausencia de desbordamiento horizontal en móvil a 390 px; no se observaron errores de ejecución JS en esas pruebas.

## Pendiente antes del lanzamiento público
- Verificar autenticidad/autorización de los nuevos testimonios y condiciones de uso de retratos. Por prudencia, sus imágenes se identifican como ilustrativas y sus textos como pendientes de verificación. No se han añadido estrellas no proporcionadas.
- Configurar y probar recepción segura de leads con correo o CRM, y consentimiento adecuado; luego revisar toda la política de privacidad.
- Validar los resultados, asociaciones, promociones y textos legales con el equipo de la firma.
- Revisar versión inglesa por un profesional legal bilingüe.
- Insertar el vídeo definitivo.
- Comprobar en PageSpeed Insights y Google Search Console sobre el entorno publicado; no se afirma haber obtenido una puntuación concreta.
- Al conectar dominio definitivo, actualizar canonicals, hreflang y sitemap; retirar `noindex` **solo** tras aprobación.

## Instalación en GitHub Desktop
1. Descomprimir el ZIP de entrega.
2. Abrir GitHub Desktop > Repository > Show in Explorer.
3. Copiar **el contenido interior** de la carpeta descomprimida al repositorio, sustituyendo los archivos con el mismo nombre. Conservar `.gitattributes` y `.nojekyll`.
4. Verificar cambios en GitHub Desktop > Summary `Noyes PI — optimización V2` > Commit to main > Push origin.
5. Esperar a la actualización de GitHub Pages y comprobar el diseño, los enlaces y el formulario. **Noindex permanece**.
