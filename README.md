# Sitio del casamiento — guía de armado

Todo el sitio es **un solo archivo**: `index.html`. No hay que instalar nada
ni compilar nada. Lo abrís con cualquier editor de texto, cambiás lo que
tenga el cartelito `✏️ EDITAR` al lado, lo guardás y listo.

---

## 1. Publicarlo gratis en GitHub Pages

1. Entrá a [github.com/new](https://github.com/new) y creá un repositorio
   **público** llamado, por ejemplo, `casamiento`.
2. En la página del repo vacío, tocá **uploading an existing file** y arrastrá
   `index.html`. Escribí un mensaje cualquiera y tocá **Commit changes**.
3. Andá a **Settings** → menú izquierdo **Pages**.
4. En *Source* elegí **Deploy from a branch**. En *Branch* elegí `main` y la
   carpeta `/ (root)`. Tocá **Save**.
5. Esperá 1-2 minutos y recargá esa misma pantalla: te va a mostrar la
   dirección, algo como

   ```
   https://TU-USUARIO.github.io/casamiento/
   ```

Cada vez que subas una versión nueva del archivo, el sitio se actualiza solo
en menos de un minuto.

### Si querés un dominio propio (opcional, ~USD 10-15 al año)

Comprás el dominio (Namecheap, Nic.ar, Cloudflare) y en **Settings → Pages →
Custom domain** lo cargás. GitHub te dice qué registros DNS apuntar. El
certificado HTTPS lo genera GitHub gratis.

---

## 2. Armar el formulario de confirmación

El sitio es estático, así que las respuestas las junta Google Forms. Es gratis,
sin límite de respuestas, y te quedan todas ordenadas en una planilla.

1. Entrá a [forms.new](https://forms.new) — se te crea un formulario en blanco.
2. Ponele de título **Confirmación de asistencia** y armá estas preguntas:

   | Pregunta | Tipo | Obligatoria |
   |---|---|---|
   | ¿Vas a venir? | Opción múltiple: *Sí, ahí estoy* / *No voy a poder* | Sí |
   | Nombre y apellido de cada persona que asiste (uno por línea) | Párrafo | Sí |
   | ¿Alguien tiene restricciones alimentarias? Contanos cuál y de quién | Párrafo | No |

   > Tip: en la primera pregunta, con el menú de los tres puntos podés activar
   > **Ir a la sección según la respuesta**, para que quien elija *No voy a poder*
   > salte directo al final sin completar el resto.

3. Tocá el engranaje ⚙️ → pestaña **Respuestas** → activá
   **Recibir correos de respuestas nuevas**, así te llega un mail con cada
   confirmación.
4. En la pestaña **Respuestas** del formulario, tocá el ícono verde de Sheets
   para volcar todo a una planilla. Ahí contás los invitados con `=CONTARA(...)`.

### Pegarlo en el sitio

5. Arriba a la derecha, tocá **Enviar** → la pestaña **`< >`** (insertar HTML).
6. Copiá el `<iframe ...>` completo que te muestra.
7. Abrí `index.html`, buscá el bloque que dice
   `✏️ EDITAR: pegá acá el <iframe> que te da Google Forms`
   y reemplazá el `<div class="marcador">…</div>` entero por tu iframe.
8. En el iframe que pegaste, agregale este atributo para que se vea bien en
   celulares:

   ```html
   <iframe src="https://docs.google.com/forms/..." style="min-height:640px" width="100%" frameborder="0">Cargando…</iframe>
   ```

> ⚠️ Antes de mandar el link a nadie, abrí el formulario desde el sitio y
> mandá una respuesta de prueba. Después borrala de la planilla.

---

## 3. Qué editar en `index.html`

Abrí el archivo y buscá `✏️ EDITAR` (con Ctrl+F). Cada marca te dice qué cambiar:

| Dónde | Qué cambiar |
|---|---|
| `<title>` y los `<meta og:...>` | Título de la pestaña y el texto que aparece al compartir por WhatsApp |
| Portada | Los nombres, la fecha y la ciudad |
| `var FECHA_EVENTO` (al final, en el `<script>`) | La fecha para la cuenta regresiva. **El mes va menos uno**: noviembre es `10` |
| Sección *El evento* | Horarios, nombre de los lugares, direcciones y los links de Google Maps |
| Sección *Cronograma* | Cada bloque `<div class="hito">` es una fila. Copiá o borrá los que necesites |
| Sección *Regalos* | El alias y el titular de la cuenta |
| Sección *Confirmar* | El iframe del formulario y la fecha límite |
| Sección *Preguntas* | Cada `<details class="pregunta">` es una pregunta |
| `:root` (arriba de todo, en el `<style>`) | Los colores de toda la página |

### Para el link de Google Maps

Buscá el lugar en Google Maps, tocá **Compartir → Copiar vínculo**, y pegá ese
link reemplazando el que está en `href="..."` del botón *Cómo llegar*.

---

## 4. Cosas para no olvidarse

- **El alias**: revisá el que pusiste, letra por letra. Es el error más caro.
- **Probalo del celular** antes de mandarlo: la mayoría de los invitados lo van
  a abrir desde ahí.
- **El repo es público**, así que no pongas el CBU si preferís que no quede
  indexado — el alias solo ya alcanza para transferir.
- **Acortá el link** con [tinyurl.com](https://tinyurl.com) si lo vas a poner en
  una tarjeta impresa o un QR.
- **QR para la invitación**: podés generarlo gratis en
  [qr.io](https://qr.io) o con la app de tu celular apuntando a la URL del sitio.

---

## 5. Si después querés agregar fotos

Creá una carpeta `img/` en el repo, subí las fotos ahí y referencialas así:

```html
<img src="img/nosotros.jpg" alt="Ana y Martín">
```

Antes de subirlas, achicalas a 1600 px de ancho como mucho y pasalas por
[squoosh.app](https://squoosh.app) — una foto de 5 MB tarda una eternidad en
cargar desde un celular con señal mala.
