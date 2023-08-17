const btnIniciar = document.getElementById("btn-iniciar");
const containerPregunta = document.getElementById("container-pregunta");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnSiguiente = document.getElementById("btn-siguiente");
const txtPregunta = document.getElementById("txt-pregunta");
const containerRespuestas=document.getElementById("container-respuestas");
const arrRespuestas=containerRespuestas.getElementsByClassName("res")
const respuesta1 = document.getElementById("res1")
const respuesta2 = document.getElementById("res2")
const respuesta3 = document.getElementById("res3")
const respuesta4 = document.getElementById("res4")
const elementoContador=document.getElementById("timer")
let indicePreguntaActual;
let puntaje = 0
const elementoPuntaje = document.createElement("h1")
console.log(arrRespuestas)
btnIniciar.addEventListener("click", iniciar);
btnReiniciar.addEventListener("click",reiniciar);
btnSiguiente.addEventListener("click", ()=>{
    indicePreguntaActual++
    reset()
    mostrarPregunta()
    detenerTiempo()
    iniciarTiempo(15)
})
function iniciar(){
    btnIniciar.classList.add("ocultar")
    iniciarCulturaGeneral()
}
function iniciarCulturaGeneral(){
    indicePreguntaActual=0;
    preguntas=preguntasCulturaGeneral
    containerPregunta.classList.remove("ocultar");
    detenerTiempo()
    iniciarTiempo(15)
    mostrarPregunta()
    ocultarPuntaje()    
    desocultar()
}

function desocultar(){
  btnReiniciar.classList.remove("ocultar");
}

function reiniciar(){
    btnIniciar.classList.remove("ocultar");
    containerPregunta.classList.add("ocultar");
    btnReiniciar.classList.add("ocultar");
    btnSiguiente.classList.add("ocultar");
    detenerTiempo()
   reset()
   ocultarPuntaje()
}

function mostrarPregunta(){
  reset()
    txtPregunta.innerHTML=preguntas[indicePreguntaActual].pregunta;
    preguntas[indicePreguntaActual].respuestas.forEach(respuesta => {
      const boton=document.createElement("button")
      boton.innerText=respuesta.texto
      boton.classList.add("res")
      
      if(respuesta.correcto){
        boton.dataset.correcto=respuesta.correcto
        
      }
     boton.addEventListener("click",seleccionarRespuesta)
      containerRespuestas.appendChild(boton)
    });
    
}
function reset(){
  btnSiguiente.classList.add("ocultar")
  while(containerRespuestas.firstChild){
    containerRespuestas.removeChild(containerRespuestas.firstChild)
  }
}
function seleccionarRespuesta(e){
  const respuestaSeleccionada = e.target
  const correcto=respuestaSeleccionada.dataset.correcto
  Array.from(containerRespuestas.children).forEach(btn=>{
    cambiarColor(btn, btn.dataset.correcto)
    btn.disabled= true;
  })
  
  if(correcto){
    puntaje++
  }
  if(preguntas.length>indicePreguntaActual+1){
    btnSiguiente.classList.remove("ocultar")
  } else{
    btnReiniciar.classList.remove("ocultar")
    mostrarPuntaje()
  }
  detenerTiempo()
}
function cambiarColor(elemento, correcto){
  borrarColor(elemento)
  if (correcto){
    elemento.classList.add("correcto")
  } else{
    elemento.classList.add("incorrecto")
  }
}

function borrarColor(elemento){
  elemento.classList.remove("correcto")
  elemento.classList.remove("incorrecto")
}
let contador
function iniciarTiempo(tiempo){
  contador=setInterval(timer, 1000)
  function timer(){
    elementoContador.innerHTML=tiempo
    tiempo--
    if(tiempo<0){
      clearInterval(contador)
      elementoContador.innerHTML="15"
      mostrarPuntaje()
      Array.from(containerRespuestas.children).forEach(btn=>{
        cambiarColor(btn, btn.dataset.correcto)
        btn.disabled= true;
      })
    }
  }
}
function detenerTiempo(){
  clearInterval(contador)
}

function mostrarPuntaje(){
  elementoPuntaje.innerHTML = `Puntaje: ${puntaje}`
  elementoPuntaje.style.textAlign = "center";
  elementoPuntaje.classList.remove("ocultar")
    containerPregunta.appendChild(elementoPuntaje)
}

function ocultarPuntaje(){
  puntaje=0
  elementoPuntaje.classList.add("ocultar")
}

let preguntas = []

 const preguntasCulturaGeneral = [
     {
       pregunta: '¿Qué se celebra el 17 de agosto en Argentina?',
       respuestas: [
         { texto: 'Fallecimiento de Sarmiento', correcto: false },
         { texto: 'Fallecimiento de Belgrano', correcto: false },
         { texto:'Fallecimiento de San Martín', correcto: true },
         { texto:'Fallecimiento de Güemes', correcto:false },
       ]
     },
     {
       pregunta: '¿Dónde nació San Martín?',
       respuestas: [
         { texto: 'Buenos Aires', correcto: false },
         { texto: 'Corrientes', correcto: true },
         { texto: 'Mendoza', correcto: false },
         { texto: 'Formosa', correcto: false }
       ]
     },
     {
       pregunta: '¿Dónde estudió San Martín?',
       respuestas: [
         { texto: 'Buenos Aires', correcto: false },
         { texto: 'Francia', correcto: false },
         { texto: 'Italia', correcto: false },
         { texto: 'España', correcto: true }
       ]
     },
     {
       pregunta: '¿Cuál es el nombre de la esposa de San Martín?',
       respuestas: [
         { texto: 'Doña María de los Remedios de Escalada', correcto: true },
         { texto: 'Doña Gregoria Matorras', correcto: false },
         { texto: 'Doña Encarnación Ezcurra', correcto: false },
         { texto: 'Doña Benita Martínez de Pastoriza', correcto: false}
       ]
     },
     {
      pregunta: '¿Qué evento transcendente realizó San Martín?',
      respuestas: [
        { texto: 'Cruce de los Andes', correcto: true },
        { texto: 'Creación de la bandera', correcto: false },
        { texto: 'Declaración de la independencia', correcto: false },
        { texto: 'Vuelta de obligado', correcto: false}

      ]
    },
    {
      pregunta: '¿Cuántos dias tardó San Martín en cruzar la cordillera?',
      respuestas: [
        { texto: '20 días', correcto: false },
        { texto: '25 días', correcto: true },
        { texto: '30 días', correcto: false},
        { texto: '35 días', correcto: false }
      ]
    },
    {
      pregunta: '¿Cuántos soldados cruzaron los Andes con San Martín?',
      respuestas: [
        { texto: '7.000 soldados', correcto: false },
        { texto: '5.000 soldados', correcto: true },
        { texto: '9.000 soldados', correcto: false },
        { texto: '4.000 soldados', correcto: false}
      ]
    },
    {
      pregunta: '¿Cuántas mulas llevó San Martín al cruce?',
      respuestas: [
        { texto: '7.000', correcto: false },
        { texto: '9.300', correcto: true },
        { texto: '8.500', correcto: false },
        { texto: '2.350', correcto: false}
      ]
    },
    {
      pregunta: '¿Qué significa Andes?',
      respuestas: [
        { texto: 'Cadena montañosa', correcto: false },
        { texto: 'Montaña alta', correcto: false },
        { texto: 'Cadena alta', correcto: false },
        { texto: 'Cresta alta', correcto: true}
      ]
    },
    {
      pregunta: '¿Por qué se llevaron más mulas que caballos?',
      respuestas: [
        { texto: 'Por la fuerza', correcto: true },
        { texto: 'Por lo económico', correcto: false },
        { texto: 'Por la abundancia', correcto: false },
        { texto: 'Por su velocidad', correcto: false}
      ]
    },
    {
      pregunta: 'San Martín fue gobernador de:',
      respuestas: [
        { texto: 'El Alto Perú', correcto: false },
        { texto: 'Buenos Aires', correcto: false },
        { texto: 'Cuyo', correcto: true },
        { texto: 'La Patagonia', correcto: false}
      ]
    },
    {
      pregunta: 'San Martín se reunión en Guayaquil con:',
      respuestas: [
        { texto: 'Belgrano', correcto: false },
        { texto: 'Saavedra', correcto: false },
        { texto: 'Rosas', correcto: false },
        { texto: 'Bolívar', correcto: true}
      ]
    },
    {
      pregunta: 'Algunas de las batallas ganadas por San Martín:',
      respuestas: [
        { texto: 'San Lorenzo, Chacabuco y Maipú', correcto: true },
        { texto: 'Maipú, Tucumán y Cancha Rayada', correcto: false },
        { texto: 'Cancha Rayada, San Lorenzo y Maipú', correcto: false },
        { texto: 'Caseros, Tucumán y Chacabuco', correcto: false}
      ]
    },
    {
      pregunta: 'San Martín falleció en:',
      respuestas: [
        { texto: 'Buenos Aires', correcto: false },
        { texto: 'Francia', correcto: true},
        { texto: 'San Juan', correcto: false},
        { texto: 'Corrientes', correcto: false}
      ]
    },
    {
      pregunta: 'Año de fallecimiento de San Martín:',
      respuestas: [
        { texto: '1830', correcto: false },
        { texto: '1840', correcto: false },
        { texto: '1850', correcto: true },
        { texto: '1860', correcto: false }
      ]
    }

   ]

