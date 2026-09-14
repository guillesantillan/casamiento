# Sitio del casamiento

Sitio estático de una sola página, publicado gratis en GitHub Pages:
**https://guillesantillan.github.io/casamiento/**

Todo el sitio es **un archivo**: `index.html` (HTML + CSS + JS, sin
dependencias, sin build). Lo acompañan `og.jpg` (la imagen que muestra
WhatsApp al pegar el link) y `foto-portada.webp` / `foto-portada.jpg` (la foto
de la portada, recortada en vertical a 800×1013).

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
| Foto de la portada | reemplazá `foto-portada.webp` y `foto-portada.jpg` por otras con el mismo nombre, vertical, ~800 px de ancho y menos de 200 KB |
| Texto "Nosotros" | sección debajo de la portada |
| Qué muestra el sitio después del casamiento | `data-gracias` y `data-album` en el `<time>` de la portada (ver más abajo) |
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

## Link personalizado por invitado

Si al link le agregás `?para=Nombre`, la portada saluda a esa persona:

```
https://guillesantillan.github.io/casamiento/?para=Tía+Marta
```

Los espacios van como `+` (o `%20`). Solo acepta letras, espacios, punto,
apóstrofo y guion, hasta 40 caracteres; cualquier otra cosa se ignora y el
sitio se ve normal. Sin el parámetro no pasa nada.

## Después del casamiento

Pasadas unas horas del fin del evento (`data-fin`), el sitio cambia solo:
"Nos casamos" pasa a ser el texto de `data-gracias`, se ocultan la cuenta
regresiva, la confirmación y el cronograma, y si `data-album` tiene un link
(Google Photos, por ejemplo) el botón principal pasa a ser "Ver las fotos".
Para ver cómo queda antes de tiempo: `…/casamiento/?vista=gracias`.

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

## Escena ilustrada de la portada (`escena/`)

Detrás de la portada hay un collage de grabados y láminas botánicas de
dominio público (todas anteriores a 1900), recoloreados y recortados, en
WebP (unos 635 KB en total). Se cargan mientras la invitación está cerrada;
al abrirse, la cámara "se aleja" desde el ombú y las capas van entrando
(casa, pasto, cortaderas, flores), después las mariposas, el viento y los
pétalos (vectoriales), y al final la foto y los textos. Si las imágenes no
llegaron a tiempo, la escena aparece suave más tarde; sin WebP (iPhones muy
viejos) no se muestra y el sitio queda igual que antes.

| Archivo | Origen |
|---|---|
| `ombu-izq.webp`, `ombu-der.webp` | fotograbados de ombúes, *El Jardín Botánico de Buenos Aires* (1898), vía Wikimedia Commons / BHL |
| `casa.webp` | *Crotta House*, dibujo de John Preston Neale (1823), *Views of the Seats of Noblemen and Gentlemen* |
| `pampa.webp` | Emeric Essex Vidal, *Estancia on the River San Pedro*, *Picturesque Illustrations of Buenos Ayres* (1820) |
| `ceibo.webp` | *Erythrina crista-galli*, *Favourite Flowers of Garden and Greenhouse* (1896) |
| `jacaranda.webp` | *Jacaranda mimosifolia*, *Curtis's Botanical Magazine* t. 2327 (1822) |
| `pasionaria.webp` | *Passiflora caerulea*, *The Botanical Magazine* pl. 28 (1787) |
| `rosas.webp` | Pierre-Joseph Redouté, *Choix des plus belles fleurs* (1827) |
| `cortadera.webp` | *Cortaderia selloana*, dibujo a línea (dominio público) |
| `pasto.webp` | *Trisetum flavescens*, *Flora Londinensis* (1777) |

Las mismas láminas reaparecen, tenues y meciéndose, en las demás secciones
(`.lamina-caja` en el HTML de cada sección; no pesan más porque ya están
descargadas), y hay mariposas vectoriales que cruzan de vez en cuando.

Para cambiar una capa: reemplazá el archivo con el mismo nombre (WebP con
transparencia, salvo `pampa.webp`), ~500–800 px de ancho. Las posiciones
de cada capa están en el CSS (`.escena__…`), en porcentajes de la portada,
con valores distintos para celular y desktop.

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
- **Entrada animada**: la primera vez en cada sesión, la página aparece como
  una invitación cerrada (dos hojas con la corona, el sello J&G, nombres y
  fecha, y la pista "Deslizá para abrir"). Se abre con cualquier gesto
  (scroll, arrastre, tap o tecla) y, si nadie hace nada, sola a los 8 s;
  después los elementos de la portada entran en secuencia. Es CSS puro (opacity,
  transform, clip-path) decidido por un script de pocas líneas al principio
  del `<body>`. Con "reducir movimiento" o sin JavaScript no hay animación.
  Para volver a verla: abrí el link en una pestaña nueva.
- `<meta name="robots" content="noindex">`: el sitio no aparece en buscadores;
  los invitados llegan por el link.

## Seguridad

No hay servidor ni secretos: lo único que "protege" el sitio es la cuenta de
GitHub (activá la verificación en dos pasos) y la cuenta de Google donde vive
el formulario. Cualquiera con el link puede responder el formulario; las
respuestas se revisan a mano.
