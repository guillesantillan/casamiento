/**
 * Backend del formulario de confirmación (Google Apps Script).
 *
 * Recibe cada confirmación desde el sitio (POST con un JSON) y la agrega
 * como una fila en una planilla de Google Sheets. No lee ni devuelve datos:
 * lo único que puede hacer quien conozca la URL es agregar filas.
 *
 * Propiedades del script (Configuración del proyecto → Propiedades del script):
 *   SHEET_ID     id de la planilla (lo que va entre /d/ y /edit en su URL)   ← obligatorio
 *   TOKEN        una clave cualquiera; tiene que ser la misma que data-clave
 *                en index.html. Frena bots genéricos.                         ← recomendado
 *   AVISO_EMAIL  mail al que avisar por cada confirmación (vacío = no avisa)   ← opcional
 *
 * Cómo desplegarlo: ver README.md, sección "Formulario de confirmación".
 */

var NOMBRE_HOJA = 'Respuestas';
var COLUMNAS = ['Fecha', 'Nombre', 'Asiste', 'Personas', 'Acompañantes', 'Restricciones', 'Mensaje', 'Invitación'];

function doPost(e) {
  try {
    var props = PropertiesService.getScriptProperties();
    var sheetId = props.getProperty('SHEET_ID');
    var token = props.getProperty('TOKEN') || '';
    if (!sheetId) return responder({ ok: false, error: 'config' });

    var d = {};
    try { d = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { d = {}; }

    /* filtros antibot: clave, campo trampa y tiempo mínimo en la página */
    if (token && d.k !== token) return responder({ ok: false, error: 'clave' });
    if (d.sitio) return responder({ ok: true });                       // un bot llenó el campo oculto: fingimos éxito
    if (!(Number(d.seg) >= 3)) return responder({ ok: false, error: 'rapido' });
    if (!hayLugar()) return responder({ ok: false, error: 'ocupado' });   // freno global: no más de 40 envíos por minuto

    /* validación: largos máximos y valores permitidos */
    var nombre = limpiar(d.nombre, 80);
    if (nombre.length < 2) return responder({ ok: false, error: 'nombre' });
    var asiste = d.asiste === 'si' ? 'Sí' : (d.asiste === 'no' ? 'No' : '');
    if (!asiste) return responder({ ok: false, error: 'asiste' });
    var personas = 0;
    if (asiste === 'Sí') {
      personas = parseInt(d.personas, 10);
      if (isNaN(personas)) personas = 1;
      personas = Math.min(Math.max(personas, 1), 10);
    }
    var fila = [
      new Date(),
      nombre,
      asiste,
      personas,
      asiste === 'Sí' ? limpiar(d.acompanantes, 200) : '',
      asiste === 'Sí' ? limpiar(d.restricciones, 200) : '',
      limpiar(d.mensaje, 500),
      limpiar(d.invitacion, 60)
    ];

    /* una escritura por vez, por si confirman dos personas al mismo tiempo */
    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var ss = SpreadsheetApp.openById(sheetId);
      var hoja = ss.getSheetByName(NOMBRE_HOJA) || ss.insertSheet(NOMBRE_HOJA);
      if (hoja.getLastRow() === 0) {
        hoja.appendRow(COLUMNAS);
        hoja.getRange(1, 1, 1, COLUMNAS.length).setFontWeight('bold');
        hoja.setFrozenRows(1);
      }
      hoja.appendRow(fila);
    } finally {
      lock.releaseLock();
    }

    avisar(props.getProperty('AVISO_EMAIL'), fila);
    return responder({ ok: true });
  } catch (err) {
    return responder({ ok: false, error: 'servidor' });
  }
}

/* Si alguien abre la URL en el navegador, no ve nada útil. */
function doGet() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}

/* Límite global: si alguien inunda el script, deja de guardar por un rato
   en vez de agotar la cuota diaria; los invitados reales ven el respaldo por WhatsApp. */
function hayLugar() {
  try {
    var cache = CacheService.getScriptCache();
    var clave = 'envios-' + Math.floor(Date.now() / 60000);
    var n = Number(cache.get(clave) || 0) + 1;
    cache.put(clave, String(n), 120);
    return n <= 40;
  } catch (err) {
    return true;
  }
}

function responder(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* texto plano, sin caracteres de control ni fórmulas (una celda que empieza con "=" se evaluaría) */
function limpiar(v, max) {
  var s = String(v == null ? '' : v), plano = '';
  for (var i = 0; i < s.length; i++) {
    var c = s.charCodeAt(i);
    plano += (c < 32 || c === 127) ? ' ' : s.charAt(i);
  }
  plano = plano.replace(/ +/g, ' ').trim();
  if (/^[=+@-]/.test(plano)) plano = "'" + plano;
  return plano.slice(0, max);
}

function avisar(email, fila) {
  if (!email) return;
  try {
    var asunto = 'Confirmación: ' + fila[1] + ' — ' + (fila[2] === 'Sí' ? 'viene (' + fila[3] + ')' : 'no viene');
    var cuerpo = COLUMNAS.map(function (c, i) { return c + ': ' + (i === 0 ? Utilities.formatDate(fila[0], Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm') : fila[i]); }).join(String.fromCharCode(10));
    MailApp.sendEmail(email, asunto, cuerpo);
  } catch (err) { /* el aviso es secundario: la fila ya está guardada */ }
}

/* Para probar desde el editor (▶ Ejecutar "probar"): agrega una fila de prueba. */
function probar() {
  var r = doPost({ postData: { contents: JSON.stringify({
    k: PropertiesService.getScriptProperties().getProperty('TOKEN') || '',
    seg: 10, nombre: 'Prueba desde el editor', asiste: 'si', personas: 2,
    acompanantes: 'Alguien', restricciones: '', mensaje: 'Si ves esto, funciona.', invitacion: ''
  }) } });
  Logger.log(r.getContent());
}
