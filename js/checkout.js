/* =========================================================
   CONFIGURACIÓN — edita aquí tus planes, precios y códigos
   ========================================================= */
const CONFIG = {
  modoDemo: true,            // pon false cuando conectes tu pasarela y backend
  paginaGracias: "gracias.html",
  moneda: "PEN",
  simbolo: "S/",
  igv: 0.18,
  preciosIncluyenIGV: false, // true si los precios de abajo ya incluyen IGV

  planes: {
    esencial: {
      nombre: "Plan Esencial",
      desc: "Para saber dónde estás parado.",
      precio: 990,          // <-- cambia por tu precio real
      precioAntes: null,    // precio tachado opcional (ej. 1290) o null
      incluye: [
        "Auditoría de redes y firewall",
        "Seguridad del correo (SPF, DKIM, DMARC)",
        "Informe ejecutivo con prioridades",
        "Reunión de resultados",
        "Guía de buenas prácticas para el personal"
      ]
    },
    avanzado: {
      nombre: "Plan Avanzado",
      desc: "Para poner a prueba tus defensas.",
      precio: 2490,         // <-- cambia por tu precio real
      precioAntes: null,
      incluye: [
        "Todo lo del plan Esencial",
        "Pruebas de penetración",
        "Simulacro de phishing",
        "Taller de capacitación al personal",
        "Re-test para validar correcciones",
        "Informe técnico con evidencias y cómo corregir",
        "Revisión básica de permisos en la nube"
      ]
    },
    integral: {
      nombre: "Plan Integral",
      desc: "Protección completa y continua.",
      precio: 4990,         // <-- cambia por tu precio real
      precioAntes: null,
      incluye: [
        "Todo lo del plan Avanzado",
        "Revisión de seguridad en la nube",
        "Plan de respuesta a incidentes",
        "Ejercicio de simulación de incidente",
        "Políticas de seguridad para la empresa",
        "Atención prioritaria ante incidentes",
        "Capacitación y simulacros de phishing recurrentes",
        "Seguimiento trimestral"
      ]
    }
  },

  // código -> porcentaje de descuento (0.10 = 10 %)
  // Nota: para producción valida los códigos en tu servidor, no solo aquí.
  promos: { OMEGA10: 0.10, BIENVENIDA: 0.05 }
};

/* =========================================================
   ESTADO
   ========================================================= */
const estado = {
  plan: "avanzado",
  descuento: 0,
  codigo: null,
  metodo: "tarjeta",
  cliente: null
};

const $ = (id) => document.getElementById(id);
const money = (n) =>
  `${CONFIG.simbolo} ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* =========================================================
   RESUMEN DEL PEDIDO
   ========================================================= */
function calcular() {
  const p = CONFIG.planes[estado.plan];
  const base = CONFIG.preciosIncluyenIGV ? p.precio / (1 + CONFIG.igv) : p.precio;
  const descuento = base * estado.descuento;
  const neto = base - descuento;
  const igv = neto * CONFIG.igv;
  return { subtotal: base, descuento, igv, total: neto + igv };
}

function pintarResumen() {
  const p = CONFIG.planes[estado.plan];
  const t = calcular();

  $("planNombre").textContent = p.nombre;
  $("planDesc").textContent = p.desc;
  $("planPrecio").textContent = money(p.precio);

  const tach = $("planTachado");
  if (p.precioAntes) { tach.hidden = false; tach.textContent = money(p.precioAntes); }
  else tach.hidden = true;

  const ul = $("planIncluye");
  ul.innerHTML = "";
  p.incluye.forEach((txt) => {
    const li = document.createElement("li");
    li.textContent = txt;
    ul.appendChild(li);
  });

  const ahorroPrecio = p.precioAntes ? p.precioAntes - p.precio : 0;
  const ahorroTotal = ahorroPrecio + t.descuento;
  const badge = $("ahorroBadge");
  if (ahorroTotal > 0) { badge.hidden = false; badge.textContent = `AHORRA ${money(ahorroTotal)}`; }
  else badge.hidden = true;

  $("tSubtotal").textContent = money(t.subtotal);
  $("filaDescuento").hidden = t.descuento <= 0;
  $("tDescuento").textContent = "- " + money(t.descuento);
  $("tIgv").textContent = money(t.igv);
  $("tTotal").textContent = money(t.total);
  $("btnPagarMonto").textContent = money(t.total);

  document.querySelectorAll("#planSwitch button").forEach((b) =>
    b.classList.toggle("co-on", b.dataset.plan === estado.plan)
  );
}

function construirSelectorPlanes() {
  const cont = $("planSwitch");
  Object.entries(CONFIG.planes).forEach(([key, p]) => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.plan = key;
    b.textContent = p.nombre.replace("Plan ", "");
    b.addEventListener("click", () => {
      estado.plan = key;
      const url = new URL(location.href);
      url.searchParams.set("plan", key);
      try { history.replaceState(null, "", url); } catch (e) { /* file:// puede bloquearlo */ }
      pintarResumen();
    });
    cont.appendChild(b);
  });
}

/* =========================================================
   CÓDIGO PROMOCIONAL
   ========================================================= */
$("promoToggle").addEventListener("click", () => {
  const f = $("promoForm");
  f.hidden = !f.hidden;
  if (!f.hidden) $("promoInput").focus();
});

$("promoForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const code = $("promoInput").value.trim().toUpperCase();
  const msg = $("promoMsg");
  if (CONFIG.promos[code]) {
    estado.descuento = CONFIG.promos[code];
    estado.codigo = code;
    msg.className = "co-promo-msg co-ok";
    msg.textContent = `Código aplicado: -${Math.round(estado.descuento * 100)}%`;
  } else {
    estado.descuento = 0;
    estado.codigo = null;
    msg.className = "co-promo-msg co-err";
    msg.textContent = "Código no válido.";
  }
  pintarResumen();
});

/* =========================================================
   PASO 1: FACTURACIÓN
   ========================================================= */
const form = $("formFacturacion");

function validarCampo(el) {
  const err = el.parentElement.querySelector(".co-error");
  let msg = "";
  if (el.required && !el.value.trim()) msg = "Este campo es obligatorio.";
  else if (el.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value)) msg = "Ingresa un correo válido.";
  else if (el.type === "tel" && el.value && el.value.replace(/\D/g, "").length < 7) msg = "Ingresa un teléfono válido.";
  el.classList.toggle("co-invalid", !!msg);
  if (err) err.textContent = msg;
  return !msg;
}

form.querySelectorAll("input,select").forEach((el) => {
  el.addEventListener("blur", () => validarCampo(el));
  el.addEventListener("input", () => el.classList.contains("co-invalid") && validarCampo(el));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const campos = [...form.querySelectorAll("input:not([type=checkbox]),select")];
  const ok = campos.map(validarCampo).every(Boolean);
  if (!ok) {
    form.querySelector(".co-invalid")?.focus();
    return;
  }
  const data = Object.fromEntries(new FormData(form).entries());
  data.marketing = $("marketing").checked;
  estado.cliente = data;

  form.hidden = true;
  $("rdNombre").textContent = `${data.nombre} ${data.apellidos}`;
  $("rdEmail").textContent = data.email;
  $("resumenDatos").hidden = false;

  $("step2").classList.remove("co-disabled");
  $("step2").classList.add("co-current");
  $("step2Body").hidden = false;
  $("step2Body").scrollIntoView({ behavior: "smooth", block: "center" });
  montarPasarela();
});

$("btnEditar").addEventListener("click", () => {
  form.hidden = false;
  $("resumenDatos").hidden = true;
  $("step2").classList.add("co-disabled");
  $("step2").classList.remove("co-current");
  $("step2Body").hidden = true;
});

/* =========================================================
   PASO 2: PAGO
   ========================================================= */
document.querySelectorAll(".co-tab").forEach((tab) =>
  tab.addEventListener("click", () => {
    estado.metodo = tab.dataset.metodo;
    document.querySelectorAll(".co-tab").forEach((t) => t.classList.toggle("co-active", t === tab));
    document.querySelectorAll(".co-panel").forEach((p) =>
      p.classList.toggle("co-active", p.dataset.panel === estado.metodo)
    );
  })
);

/**
 * AQUÍ conectas tu pasarela de pago (Culqi, Niubiz, Izipay, Mercado Pago, Stripe…).
 * Monta su formulario dentro de #pasarela-contenedor.
 * Nunca guardes ni envíes a tu servidor números de tarjeta: la pasarela los tokeniza.
 */
function montarPasarela() {
  // Ejemplo (Stripe): stripe.elements().create('card').mount('#pasarela-contenedor');
}

function construirPedido() {
  const t = calcular();
  return {
    plan: estado.plan,
    nombrePlan: CONFIG.planes[estado.plan].nombre,
    moneda: CONFIG.moneda,
    codigoPromo: estado.codigo,
    subtotal: +t.subtotal.toFixed(2),
    descuento: +t.descuento.toFixed(2),
    igv: +t.igv.toFixed(2),
    total: +t.total.toFixed(2),
    metodoPago: estado.metodo,
    cliente: estado.cliente
  };
}

function irAGracias(pedido, idPedido) {
  try {
    sessionStorage.setItem("omega_pedido", JSON.stringify({
      nombrePlan: pedido.nombrePlan,
      total: pedido.total,
      email: pedido.cliente && pedido.cliente.email,
      metodoPago: pedido.metodoPago,
      id: idPedido || null
    }));
  } catch (e) { /* almacenamiento no disponible: la página de gracias igual funciona */ }
  const q = CONFIG.modoDemo ? "?demo=1" : "";
  location.href = CONFIG.paginaGracias + q;
}

$("btnPagar").addEventListener("click", async () => {
  const errT = $("errTerminos");
  if (!$("terminos").checked) {
    errT.textContent = "Debes aceptar la política de privacidad para continuar.";
    return;
  }
  errT.textContent = "";

  const btn = $("btnPagar");
  btn.disabled = true;
  const pedido = construirPedido();

  try {
    if (CONFIG.modoDemo) {
      console.log("Pedido listo para enviar:", pedido);
      irAGracias(pedido, null);
      return;
    }

    /* Producción: envía el pedido a TU backend. El servidor debe recalcular
       el precio con su propia lista (no confíes en el total del navegador)
       y crear el cargo con la pasarela. Solo redirige si el pago fue exitoso. */
    // const r = await fetch("/api/pedidos", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(pedido)
    // });
    // const res = await r.json();
    // if (!r.ok) throw new Error(res.mensaje);
    // irAGracias(pedido, res.id);
    throw new Error("Pasarela de pago no configurada.");
  } catch (err) {
    alert("No pudimos procesar el pago: " + err.message);
  } finally {
    btn.disabled = false;
  }
});

/* =========================================================
   INICIO
   ========================================================= */
(function init() {
  const param = new URLSearchParams(location.search).get("plan");
  if (param && CONFIG.planes[param]) estado.plan = param;
  construirSelectorPlanes();
  pintarResumen();
})();