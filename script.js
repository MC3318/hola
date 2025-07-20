const header = document.getElementById('typed-header');
const body = document.getElementById('typed-text');
const contenedor = document.getElementById('relojAmor');

const headerText = "Para el amor de mi vida:";
const bodyText = `Si pudiera elegir un lugar seguro, sería a tu lado. Cuanto más tiempo estoy contigo, más te amo. Hay personas que cambian tu día… tú cambiaste mi vida. Tú no llegaste a completar mi historia… llegaste a escribir la más bonita.`;

function typeWriter(el, text, i, speed, done) {
  if (i < text.length) {
    el.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
    setTimeout(() => typeWriter(el, text, i + 1, speed, done), speed);
  } else if (done) {
    done();
  }
}

function calcularTextoReloj() {
  const fechaInicio = new Date("2024-06-10T00:00:00");
  const ahora = new Date();
  const diferencia = ahora - fechaInicio;

  const totalSegundos = Math.floor(diferencia / 1000);
  const dias = Math.floor(totalSegundos / (3600 * 24));
  const horas = Math.floor((totalSegundos % (3600 * 24)) / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  return `Mi amor por ti comenzó hace...\n${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
}

function escribirComoMaquina(texto, elemento, velocidad = 60, callback) {
  let i = 0;
  elemento.innerHTML = "";
  const intervalo = setInterval(() => {
    elemento.innerHTML += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      if (callback) callback();
    }
  }, velocidad);
}

function actualizarTiempo() {
  contenedor.innerHTML = calcularTextoReloj();
}

function iniciarReloj() {
  contenedor.style.opacity = 1;
  const textoInicial = calcularTextoReloj();
  escribirComoMaquina(textoInicial, contenedor, 60, () => {
    setInterval(actualizarTiempo, 1000);
  });
}

document.body.addEventListener("click", () => {
  if (header.innerHTML !== "") return;

  header.classList.add("typing");

  typeWriter(header, headerText, 0, 60, () => {
    header.classList.remove("typing");
    typeWriter(body, bodyText, 0, 40, () => {
      iniciarReloj();
    });
  });
});


