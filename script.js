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
       pregunta: '¿Qué se celebra el 9 de julio en Argentina?',
       respuestas: [
         { texto: 'Día de la memoria', correcto: false },
         { texto: 'Día de la bandera', correcto: false },
         { texto:'Día de la independencia', correcto: true },
         { texto:'Día de la escarapela', correcto:false },
       ]
     },
     {
       pregunta: '¿Dónde se realizó la firma de la declaración de independencia?',
       respuestas: [
         { texto: 'Chaco', correcto: false },
         { texto: 'Tucumán', correcto: true },
         { texto: 'Mendoza', correcto: false },
         { texto: 'Formosa', correcto: false }
       ]
     },
     {
       pregunta: '¿En qué año se firmó la independencia?',
       respuestas: [
         { texto: '1810', correcto: false },
         { texto: '1812', correcto: false },
         { texto: '1820', correcto: false },
         { texto: '1816', correcto: true }
       ]
     },
     {
       pregunta: '¿De quién era la casa donde se firmó el acta de independencia?',
       respuestas: [
         { texto: 'Doña Francisca Bazán de Laguna', correcto: true },
         { texto: 'Doña Gregoria Matorras', correcto: false },
         { texto: 'Mariquita Sánchez de Thompson', correcto: false },
         { texto: 'Juana Azurduy', correcto: false}
       ]
     },
     {
      pregunta: '¿Quiénes suscribieron el acta de declaración?',
      respuestas: [
        { texto: '29 diputados', correcto: true },
        { texto: '29 senadores', correcto: false },
        { texto: '29 vecinos', correcto: false },
        { texto: '29 jueces', correcto: false}

      ]
    },
    {
      pregunta: 'La reunión en Tucumán fue presidida por:',
      respuestas: [
        { texto: 'Mariano Boedo', correcto: false },
        { texto: 'Francisco N. Laprida', correcto: true },
        { texto: 'Juan José Paso', correcto: false},
        { texto: 'Tomás Godoy Cruz', correcto: false }
      ]
    },
    {
      pregunta: 'La declaración de la independencia permitió romper vínculos con:',
      respuestas: [
        { texto: 'Francia', correcto: false },
        { texto: 'España', correcto: true },
        { texto: 'Inglaterra', correcto: false },
        { texto: 'Estados Unidos', correcto: false}
      ]
    },
    {
      pregunta: '¿Cuántos kilometros separan Buenos Aires de Tucumán',
      respuestas: [
        { texto: '1500', correcto: false },
        { texto: '1250', correcto: true },
        { texto: '2000', correcto: false },
        { texto: '2200', correcto: false}
      ]
    },
    {
      pregunta: '¿Qué eran las galeras?',
      respuestas: [
        { texto: 'Carretas para transportar alimentos', correcto: false },
        { texto: 'Carros para 2 personas', correcto: false },
        { texto: 'Carritos de supermercado', correcto: false },
        { texto: 'Carruajes para 6 u 8 personas', correcto: true}
      ]
    },
    {
      pregunta: 'La comida de base de la época era:',
      respuestas: [
        { texto: 'El puchero', correcto: true },
        { texto: 'El locro', correcto: false },
        { texto: 'El asado', correcto: false },
        { texto: 'El guiso', correcto: false}
      ]
    },
    {
      pregunta: '¿Cuál de estas mujeres tomo las armas contra los realistas (españoles)?',
      respuestas: [
        { texto: 'Juana Rodriguez', correcto: false },
        { texto: 'Mercedes Tomasa de San Martín', correcto: false },
        { texto: 'Juana Azurduy', correcto: true },
        { texto: 'Ana de Armas', correcto: false}
      ]
    },
    {
      pregunta: '¿Qué político argentino tomó un papel decisivo en la declaración de la independencia?',
      respuestas: [
        { texto: 'Bernardino Rivadavia', correcto: false },
        { texto: 'Cornelio Saavedra', correcto: false },
        { texto: 'Nicolás Avellaneda', correcto: false },
        { texto: 'José de San Martín', correcto: true}
      ]
    },
    {
      pregunta: 'Martín Miguel de Güemes',
      respuestas: [
        { texto: 'Defendió la frontera norte del país del avance realista', correcto: true },
        { texto: 'Participó en la firma del acta de la independencia', correcto: false}
      ]
    },
    {
      pregunta: 'Manuel Belgrano consolidó la independencia con las victorias en las batallas de',
      respuestas: [
        { texto: 'Vilcapugio y Ayohuma en 1813', correcto: false },
        { texto: 'Tucumán y Salta en 1812 y 1813', correcto: true}
      ]
    },
    {
      pregunta: 'El 9 de julio de 1816 se declaró formalmente la independencia de',
      respuestas: [
        { texto: 'Las Colonias independientes de España', correcto: false },
        { texto: 'Las Provincias unidas del alto Perú', correcto: false },
        { texto: 'Las Provincias unidas del Río de la Plata', correcto: true },
        { texto: 'Los Estados Unidos de América', correcto: false }
      ]
    }

   ]

