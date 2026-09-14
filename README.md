# Sitio del casamiento

Sitio estático de una sola página, publicado gratis en GitHub Pages:
**https://guillesantillan.github.io/casamiento/**

Todo el sitio es **un archivo**: `index.html` (HTML + CSS + JS, sin
dependencias, sin build). Lo acompaña `og.jpg`, la imagen que muestra WhatsApp
al pegar el link.

> Este repositorio es público. Todo lo que está acá lo puede ver cualquiera.
> No guardes acá claves, contraseñas ni datos que no quieras que se vean en el
> sitio mismo.

---

## Cómo editar textos y datos

Abrí `index.html` con cualquier editor de texto y buscá `✏️ EDITAR`. Cada
marca explica qué se puede cambiar ahí al lado. Las principales:

| Qué | Dónde está |
|---|---|
| Título de la pestaña y texto de la tarjeta de WhatsApp | `<head>`, arriba de todo |
| Fecha y hora del evento | el `<time id="fecha-evento">` de la portada. El atributo `datetime` es **la única fuente** para la cuenta de días y para "Agendar"; `data-fin`, `data-titulo` y `data-lugar` son lo que se guarda en el calendario |
| Nombres, frase de apertura, botones de la portada | portada |
| Lugar, dirección y link de Google Maps | tarjeta "Ceremonia y fiesta" (la dirección y el botón llevan el mismo link: cambiá los dos) |
| Dress code | párrafo debajo de la tarjeta |
| Fecha límite para confirmar | sección Confirmar, arriba del formulario |
| Alias y titular de la cuenta | sección Regalos. El titular tiene que ser el nombre exacto que muestra el banco al transferir |
| CBU (opcional) | bloque comentado en Regalos, listo para descomentar |
| Número de WhatsApp de contacto | dos links `wa.me/...` (Regalos y final de Preguntas) |
| Cronograma | bloques `.hito`; el ícono de cada uno se elige con `href="#ic-..."` (la lista está en el bloque de símbolos al principio del `<body>`) |
| Preguntas frecuentes | bloques `<details>` |
| Iniciales del monograma y firma del pie | símbolo `#monograma` y `<footer>` |
| Colores | variables al principio del `<style>` (`--verde`, `--crema`, `--dorado`…) |

Si cambia la **dirección del sitio** (nombre del repo o dominio propio), hay
que actualizar a mano las dos URLs absolutas del `<head>` (`og:url` y
`og:image`): WhatsApp las lee sin ejecutar JavaScript.

## Cómo publicar un cambio

Cualquier commit en `main` se publica solo en 1–2 minutos.

- Desde la web: abrí `index.html` en GitHub, lápiz ✏️, editá, **Commit changes**.
- Desde la compu: `git pull`, editás, `git commit -am "…"`, `git push`.

Para comprobar que ya está: abrí la URL del sitio con `?x=1` al final (evita
la caché del navegador).

## Formulario de confirmación (Google Forms)

El RSVP es un Google Form embebido en un `<iframe>`. El sitio no recibe ni
guarda respuestas: quedan en el formulario y en su planilla de Drive.

Configuración recomendada del formulario (⚙️ Configuración):

- **Presentación → Mensaje de confirmación**: un cierre propio (por ejemplo
  "¡Listo! Te esperamos el 9 de enero. Si querés hacernos un regalo, el alias
  está más abajo").
- **Respuestas → Guardar el progreso**: apagado (si no, aparece un "Acceder a
  Google" que confunde).
- **Respuestas → Mostrar resumen de respuestas a los encuestados**: **apagado**
  (si no, quien responde ve los nombres de todos los invitados).
- **Respuestas → Permitir editar la respuesta**: apagado.
- **Recibir correos de respuestas nuevas**: prendido.
- En la pregunta "¿Vas a venir?", la opción "No" puede ir directo a **Enviar
  formulario** en vez de a una sección vacía.
- Tipografía (Personalizar tema → Estilo de texto → Más fuentes): encabezado
  **Cormorant Garamond**, pregunta y texto **Jost**, tamaños grandes; color
  `#3d5140`.

Como no se puede saber desde afuera cuánto mide cada pantalla del formulario,
las alturas del `<iframe>` están escritas a mano en `data-alturas-celular` y
`data-alturas-desktop` (píxeles por pantalla: 1.ª, 2.ª, 3.ª…). Si cambiás
preguntas o secciones, medí de nuevo y ajustalas.

## Tarjeta de WhatsApp (`og.jpg`)

Imagen de 1200×630 px, menos de 300 KB, referenciada desde `og:image`.
WhatsApp cachea la vista previa por URL: si cambiás la imagen, mandá el link
con `?v=2` al final para que la vuelva a leer.

## Cómo funciona por dentro (por si hay que tocar código)

- **Fuentes**: Cormorant Garamond y Jost desde Google Fonts, cargadas sin
  bloquear el render. Mientras llegan se ven fuentes locales escaladas con
  `size-adjust` para que el texto no salte.
- **Adornos**: todos los dibujos (hojita, ramas, monograma, íconos) son
  `<symbol>` SVG en un bloque al principio del `<body>` y se usan con
  `<use href="#…">`. Los estilos de trazo van como atributos en los símbolos
  porque el CSS del documento no alcanza a las copias que genera `<use>`.
- **Formulario**: cartel de "Cargando…" detrás del iframe, aviso a los 6 s si
  no cargó, scroll al tope del formulario en cada recarga (Siguiente/Enviar),
  y altura por pantalla según el número de carga.
- **Agendar**: genera un `.ics` en iPhone/Mac y abre Google Calendar en el
  resto, a partir del `<time>` de la portada.
- **Copiar alias**: `navigator.clipboard` con respaldo `execCommand` para
  navegadores viejos. "Enviar por WhatsApp" arma el mensaje con el alias y el
  titular que estén en la página.
- Sin `localStorage`, sin cookies, sin scripts de terceros. Los únicos pedidos
  externos son las fuentes de Google y el iframe de Forms.
- `<meta name="robots" content="noindex">`: el sitio no aparece en buscadores;
  los invitados llegan por el link.

## Seguridad

No hay servidor ni secretos: lo único que "protege" el sitio es la cuenta de
GitHub (activá la verificación en dos pasos) y la cuenta de Google donde vive
el formulario. Cualquiera con el link puede responder el formulario; las
respuestas se revisan a mano.
