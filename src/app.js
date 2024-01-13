/* eslint-disable */
import "bootstrap";
import "./styles.css";

const el_body = document.getElementsByTagName("body")[0];
const el_excuse = document.getElementById("el_excuse");
const el_oldexcuses = document.getElementById("el_oldexcuses");

const el_lightbtn = document.getElementById("el_lightbtn");
const el_langbtn = document.getElementById("el_langbtn");
const el_langmenu = document.getElementById("el_langmenu");
const el_startbtn = document.getElementById("el_startbtn");
const el_genbtn = document.getElementById("el_genbtn");
const el_copybtn = document.getElementById("el_copybtn");

const el_localizables = document.getElementsByClassName("localizable");

const Language0 = {
  data: [
    "Excuse Generator 9000",
    "January 12th, 2024",
    "Thanks to Lucía Belén for all the knowledge she brought to me.",
    "Generated excuse:",
    "Generate!",
    "Copy to Clipboard"
  ],
  excuses: [
    [
      "My dog",
      "My cat",
      "My aunt",
      "My sister",
      "My brother",
      "My friend",
      "My parraket",
      "My mother",
      "My father",
      "My cousin",
      "My grandpa",
      "My grandma",
      "My boss",
      "My dealer",
      "My lawyer",
      "A penguin",
      "A hamster",
      "A scorpion",
      "A triceratops",
      "A wolf",
      "A dodo",
      "A crocodile",
      "A movie director",
      "A flat earther",
      "A deer",
      "A panda",
      "A bear",
      "A bunny",
      "A carnivorous plant",
      "A police officer",
      "A FBI agent",
      "A spy",
      "A ninja",
      "A tourist",
      "A serial killer",
      "An insane random guy",
      "A magician",
      "An elf",
      "Lucía Belén"
    ],
    [
      "eat",
      "burnt",
      "licked",
      "threw",
      "jailed",
      "broke",
      "sent to space",
      "set in orbit",
      "ran away with",
      "punched",
      "magically made dissapear",
      "was hunting",
      "did hide",
      "took away",
      "married",
      "killed",
      "petted",
      "sold",
      "hang out with",
      "went on vacation with",
      "was flying with",
      "fell over the trees",
      "sat on",
      "blindly galloped",
      "divorced",
      "broke up with",
      "sank",
      "threw to the sea",
      "buried",
      "yelled at",
      "offended",
      "sued",
      "went to trial with",
      "wrote the memories of",
      "jumped out of a plane with",
      "went on a cruise with",
      "made a film of"
    ],
    [
      "my homework",
      "my assignment",
      "my task",
      "my will to work",
      "my hands",
      "my conscience",
      "all my spoons",
      "my clothes",
      "my underwear",
      "my favorite comb",
      "the house keys",
      "my phone",
      "the router",
      "the water bill",
      "the logbook",
      "the black box",
      "my magic pen",
      "my nail clipper",
      "my car",
      "my pet",
      "my credit card",
      "my money",
      "my computer",
      "my happiness",
      "your house",
      "my house",
      "your children",
      "all my children",
      "my salary",
      "the TV remote",
      "the instructions",
      "my sigth"
    ],
    [
      "this morning.",
      "last night.",
      "yesterday.",
      "a week ago.",
      "forever.",
      "right now.",
      "two days ago.",
      "on christmas eve.",
      "on my birthday.",
      "in my wedding's day.",
      "in the burial.",
      "while I was sleeping.",
      "in the hospital.",
      "from the top of a tree.",
      "riding a scooter.",
      "during the earthquake."
    ]
  ]
};

const Language1 = {
  data: [
    "Generador de Excusas 9000",
    "12 Enero 2024",
    "Gracias a Lucía Belén por todos el conocimiento que me ha traido.",
    "Excusa generada:",
    "Generar!",
    "Copiar al portapapeles"
  ],
  excuses: [
    [
      "mi perro",
      "mi gato",
      "mi tia",
      "mi hermana",
      "mi hermano",
      "mi amigo",
      "mi periquito",
      "mi madre",
      "mi padre",
      "mi primo",
      "mi abuelo",
      "mi abuela",
      "mi jefe",
      "mi camello",
      "mi abogado",
      "un pingüino",
      "Un hamster",
      "Un escorpión",
      "Un triceratops",
      "Un lobo",
      "Un dodo",
      "Un cocodrilo",
      "Un director de cine",
      "Un terraplanista",
      "un ciervo",
      "un panda",
      "un oso",
      "un conejo",
      "una planta carnivora",
      "un policia",
      "un agente del fbi",
      "un espia",
      "un ninja",
      "un turista",
      "un asesino en serie",
      "un hombre loco",
      "un mago",
      "un elfo",
      "Lucía Belén"
    ],
    [
      "se comió",
      "quemó",
      "lamió",
      "lanzó",
      "encarceló",
      "rompió",
      "envió al espacio",
      "puso en orbita",
      "huyó con",
      "golpeó",
      "hizo desaparecer magicamente",
      "estaba cazando",
      "escondió",
      "se llevó",
      "se casó con",
      "mató",
      "acarició",
      "vendió",
      "salió con",
      "se fue de vacaciones con",
      "voló con",
      "cayó en la arbolada",
      "se sentó en",
      "cabalgó ciegamente",
      "se divorció de",
      "rompió con",
      "inhundó",
      "lanzó al mar",
      "enterró",
      "le gritó a",
      "ofendió a",
      "demandó a",
      "fué a jucio con",
      "escribió las memorias de",
      "saltó de un avión con",
      "se fue de crucero con",
      "hizo una película de"
    ],
    [
      "mis deberes",
      "mi tarea",
      "mi trabajo",
      "mis ganas de trabajar",
      "mis manos",
      "mi consciencia",
      "todas mis cucharas",
      "mi ropa",
      "mis calzones",
      "mi peine favorito",
      "las llaves de casa",
      "mi telefono",
      "el router",
      "la factura del agua",
      "el cuaderno de bitacora",
      "la caja negra",
      "mi boligrafo mágico",
      "mi cortauñas",
      "mi coche",
      "mi mascota",
      "mi tarjeta de crédito",
      "mi dinero",
      "mi ordenador",
      "mi felicidad",
      "tu casa",
      "mi casa",
      "tus hijos",
      "todos mis hijos",
      "mi salario",
      "el mando de la tele",
      "las instrucciones",
      "mi vista"
    ],
    [
      "esta mañana.",
      "anoche.",
      "ayer.",
      "hace una semana.",
      "para siempre.",
      "justo ahora.",
      "anteayer.",
      "la víspera de navidad.",
      "en mi cumpleaños.",
      "el dia de mi boda.",
      "en el velatorio.",
      "mientras dormía.",
      "en el hospital.",
      "subido a un árbol.",
      "montando en patineta.",
      "durante el terremoto."
    ]
  ]
};

const page_languages = [Language0, Language1];

var blangmenu = false;
var bdarkmode;
var langindex;

var excuseslength = [0, 0, 0, 0];

window.onload = function() {
  // update darkmode initial state
  let lbdarkmode = el_body.classList.contains("darkmode");
  if (lbdarkmode) {
    el_body.classList.remove("darkmode");
  } else {
    el_body.classList.add("darkmode");
  }
  setDarkmode(lbdarkmode);

  // ensure lang menu is hidden
  el_langmenu.classList.add("hidden");

  // update lang
  setLanguage(0);

  // get excuse part sizes
  for (let i = 0; i < 4; i++) {
    excuseslength[i] = Language0.excuses[i].length;
  }
};

document.addEventListener("click", function(el) {
  let ltarget = el.target;

  if (ltarget === el_startbtn) {
    // big start button
    el_startbtn.parentElement.remove();
    el_container.classList.remove("hidden");
    generateExcuse(false);
  } else if (ltarget === el_genbtn) {
    // generate button
    generateExcuse(true);
  } else if (ltarget === el_copybtn) {
    // copy to clipboard button
    navigator.clipboard.writeText(getExcuseStr());
  } else if (ltarget === el_lightbtn) {
    // darkmode button
    setDarkmode(!bdarkmode);
  } else if (!blangmenu && ltarget === el_langbtn) {
    // language menu button
    el_langmenu.classList.toggle("hidden"); // show lang menu
    blangmenu = !blangmenu;
    return;
  } else if (ltarget.classList.contains("egh-langselbtn")) {
    // language selection buttons
    setLanguage(Number(ltarget.dataset.language));
    return;
  }

  // hide lang menu if open
  if (blangmenu) {
    el_langmenu.classList.add("hidden");
    blangmenu = false;
  }
});

// set language
function setLanguage(index) {
  if (index > -1 && index < 2) {
    for (const element of el_localizables) {
      element.innerHTML =
        page_languages[index].data[Number(element.dataset.localize)];
    }
    updateExcuseLanguage(index);
    langindex = index;
  } else setLanguage(0); // set lang 0 if index isn't valid
}

function generateExcuse(keep) {
  if (keep) {
    let lexcuse = document.createElement("div");
    let lexcusepart;
    lexcuse.classList.add("egc-excuse");
    lexcuse.style.opacity = 1.0;
    for (let i = 0; i < 4; i++) {
      lexcusepart = el_excuse.children[i].cloneNode(true);
      lexcuse.append(lexcusepart);
    }

    if (el_oldexcuses.children.length > 0) {
      for (const item of el_oldexcuses.children) {
        let lalpha = Number(item.style.opacity);

        console.log(lalpha);

        if (lalpha < 0.15) item.remove();
        else item.style.opacity = lalpha - 0.1;
      }
    }

    el_oldexcuses.prepend(lexcuse);
  }

  for (let i = 0; i < 4; i++) {
    el_excuse.children[i].dataset.localize = Math.floor(
      Math.random() * excuseslength[i]
    );
  }
  updateExcuseLanguage(langindex);
}

// update language of excuse(s)
// getting elements at runtime here is avoidable but i didnt wanted to make this bigger
function updateExcuseLanguage(index) {
  for (let i = 0; i < 4; i++) {
    let lelements = document.getElementsByClassName("loc_ex" + i);
    for (const element of lelements) {
      element.innerHTML =
        page_languages[index].excuses[i][Number(element.dataset.localize)];
    }
  }
}

// get the excuse in a single string
function getExcuseStr() {
  let resultstr = "";
  for (let i = 0; i < 4; i++) {
    resultstr += el_excuse.children[i].innerHTML + (i == 3 ? "" : " ");
  }
  return resultstr;
}

// set darkmode
function setDarkmode(state) {
  if (bdarkmode != state) {
    bdarkmode = state;
    el_body.classList.toggle("darkmode");
    el_lightbtn.classList.remove(state ? "light" : "night");
    el_lightbtn.classList.add(state ? "night" : "light");
  }
}

// fancy effect of the generate button
el_genbtn.addEventListener("click", function() {
  let angy = Math.random() * 0.5 - 0.25;
  let angz = Math.random() - 0.5;
  el_genbtn.style.setProperty("rotate", "0 " + angy + " " + angz + " 4deg");
  setTimeout(() => {
    el_genbtn.style.setProperty("rotate", "0 0 0 0deg");
  }, 125);
});
