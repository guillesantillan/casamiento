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
| Dress code | última línea de la tarjeta de "El evento" |
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

## Formulario de confirmación (propio + Apps Script)

El RSVP es un formulario de la propia página (nombre, si viene, cuántos son,
acompañantes, restricciones alimentarias y mensaje). Al enviarlo, la página
hace un `POST` a un **web app de Google Apps Script** (`apps-script/Codigo.gs`)
que agrega una fila en una planilla de Google Sheets y, si querés, te avisa
por mail. El script **solo agrega filas**: no lee ni devuelve datos, y la
planilla sigue siendo privada de tu cuenta.

Si el envío falla (sin señal, script caído) o `data-endpoint` está vacío, el
botón arma la confirmación como mensaje de WhatsApp: nunca se pierde una.

### Ponerlo en marcha (una sola vez, 10 minutos)

1. **Planilla**: creá un Google Sheets vacío. De su URL copiá el id (lo que va
   entre `/d/` y `/edit`).
2. **Script**: entrá a [script.google.com](https://script.google.com) → *Nuevo
   proyecto* → borrá lo que hay y pegá el contenido de `apps-script/Codigo.gs`
   → guardá (ponele nombre, por ejemplo "Confirmaciones casamiento").
3. **Propiedades** (⚙️ *Configuración del proyecto* → *Propiedades del script*
   → *Agregar propiedad*):
   - `SHEET_ID`: el id de la planilla.
   - `TOKEN`: una clave cualquiera (por ejemplo `jess-guille-2027`). Tiene
     que ser **la misma** que `data-clave` en el `<form>` de `index.html`.
   - `AVISO_EMAIL` (opcional): tu mail, para recibir un aviso por confirmación.
4. **Probar**: en el editor elegí la función `probar` y tocá ▶ *Ejecutar*. La
   primera vez pide permisos (planilla y mail): aceptalos. Tiene que aparecer
   una fila de prueba en la planilla (después borrala).
5. **Desplegar**: *Implementar* → *Nueva implementación* → tipo *Aplicación
   web* → *Ejecutar como*: **Yo** · *Quién tiene acceso*: **Cualquier usuario**
   → *Implementar*. Copiá la URL que termina en `/exec`.
6. **Conectar**: en `index.html`, en el `<form id="formulario">`, pegá esa URL
   en `data-endpoint`. Commit y push. Probá desde el celular.

Si más adelante cambiás el código del script: *Implementar* → *Administrar
implementaciones* → ✏️ → *Versión: Nueva* → *Implementar*. **Si no creás
versión nueva, la URL sigue sirviendo el código viejo.**

### Columnas de la planilla

`Fecha · Nombre · Asiste · Personas · Acompañantes · Restricciones · Mensaje · Invitación`
(la última es el nombre que venía en el link `?para=`, si lo había). La hoja
se llama "Respuestas" y se crea sola con la primera confirmación.

### Seguridad, en corto

La URL del script es pública (está en la página), pero lo único que hace es
agregar una fila. Contra el spam hay una clave compartida, un campo trampa
para bots, un tiempo mínimo en la página y validación de largos y valores;
las celdas se guardan como texto (nada de fórmulas). El peor caso posible es
tener que borrar filas basura.

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
| `ceibo.webp` | *Erythrina crista-galli*, *Favourite Flowers of Garden and Greenhouse* (1896) |
| `jacaranda.webp` | *Jacaranda mimosifolia*, *Curtis's Botanical Magazine* t. 2327 (1822) |
| `pasionaria.webp` | *Passiflora caerulea*, *The Botanical Magazine* pl. 28 (1787) |
| `rosas.webp` | Pierre-Joseph Redouté, *Choix des plus belles fleurs* (1827) |
| `cortadera.webp` | *Cortaderia selloana*, dibujo a línea (dominio público) |
| `pasto.webp` | *Trisetum flavescens*, *Flora Londinensis* (1777) |
| `amancay.webp` | *Alstroemeria aurea*, Heinrich Witte, *Flora* (1868) |
| `jazmin.webp` | *Jasminum officinale*, *The Botanical Magazine* pl. 31 (1787) |
| `rosa-pontiana.webp`, `rosa-burgundiaca.webp`, `rosa-regalis.webp`, `rosa-centifolia.webp`, `rosa-purpurea.webp`, `rosa-sertulata.webp` | Pierre-Joseph Redouté, *Les Roses* (1817–1824) |
| `mariposa-izq.webp`, `mariposa-der.webp` | *Aporia crataegi*, W. F. Kirby, *British and European Butterflies and Moths* (1882), en dos mitades para aletear |

Las mismas láminas reaparecen, tenues y meciéndose, en las demás secciones
(`.lamina-caja` en el HTML de cada sección; no pesan más porque ya están
descargadas), y hay mariposas vectoriales que cruzan de vez en cuando.

Para cambiar una capa: reemplazá el archivo con el mismo nombre (WebP con
transparencia), ~500–800 px de ancho. Las posiciones
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
- **Formulario**: validación en la página, envío con `fetch` (POST de texto
  plano, sin preflight), 15 s de espera máxima, y respaldo por WhatsApp con
  el mensaje ya armado si algo falla. El nombre viene puesto si el link trae
  `?para=`.
- **Agendar**: genera un `.ics` en iPhone/Mac y abre Google Calendar en el
  resto, a partir del `<time>` de la portada.
- **Copiar alias**: `navigator.clipboard` con respaldo `execCommand` para
  navegadores viejos. "Enviar por WhatsApp" arma el mensaje con el alias y el
  titular que estén en la página.
- Sin `localStorage`, sin cookies, sin scripts de terceros. Los únicos pedidos
  externos son las fuentes de Google y el envío de la confirmación al script.
- **Entrada animada**: la primera vez en cada sesión, la página aparece como
  una invitación cerrada (dos hojas con un jardín de láminas —o la corona
  dibujada, sin WebP—, el sello J&G, nombres y fecha, y la pista "Tocá el
  sello para abrir"). Se abre tocando el sello (o con Enter) y, si nadie hace nada, sola a los 8 s;
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
