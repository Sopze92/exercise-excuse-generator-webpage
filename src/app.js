/* eslint-disable */
import "bootstrap";
import "./styles.css";

/*
 * Original plan was to use an API to get user's location to retrieve user zone's news from another API, then build excuses from those news' data
 * I've spent a weekend just searching any free 'news' or 'web search' APIs that satisfied my needs with no success... so I did something else (using APIs as well)
 * 
 * There is a lot of unneeded and overcomplicated code that I wrote just because I wanted to actually test and 
 * use as many JS lang features as I could just to get used to this language
 * 
 * every var name is verbosed to make understanding this a little easier (just a tiny little haha ò-ó)
*/

import { countryName } from "./util/countrycodes.js"; // [third party] used for getting country names from ISO 3166 country codes (if needed)

window.onload= function() {

  const 
      RAPIDAPI_BOOTCAMP_KEY=    "7894adc0eamshee9b2505ce8cec9p12f536jsnb94eb1ba69b3",
      HEADER_JSON=              {accept: 'application/json'},
      HEADER_RAPIDAPI=          {"X-RapidAPI-Key": RAPIDAPI_BOOTCAMP_KEY, "X-RapidAPI-Host":undefined}; // host is later set

  // Utils
  // NOTE: min/max are just here to have a faster version of Math ones as they don't create and iterate
  //    through an array of its args, but is limited only to get min/max of 2 vars
  function clamp(n,min,max) {return n<min?min:n>max?max:n};
  function min(a,b) {return b<a?b:a};
  function max(a,b) {return a>b?a:b};
  function randomRange(min,max) {return Math.floor(min + Math.random()*(max-min))}; // max exclusive
  function firstWord(str) {return str.replace(/ .*/,'')};

  // API object
  class ApiData {
    constructor(pUrl, pOptions, pCustomParser= undefined){
        this.url= pUrl;
        this.options= pOptions;
        this.customParser= pCustomParser;
        // get url parts that are enclosed between %( and )%
        let ms= pUrl.match(/%\((.*?)\)%/g);
        this.params= ms ? ms.map(m => m.slice(2, -2)) : undefined; 
        // setup rapidapi host value
        if(pOptions.hasOwnProperty("X-RapidAPI-Host")) this.options["X-RapidAPI-Host"]= new URL(this.url).host;
    }

    // cannot make this private because eslint, and I dont wanna mess with eslint :/
    generateParamValue(idx){
      this.parsedParams= {};
      switch(this.params[idx]){
        case "Y": 
          let y= randomRange(ApiData.YEAR_RANGES[0], ApiData.YEAR_RANGES[1]+1);
          this.parsedParams["Y"]= y;
          return y;
        case "M/D": 
          let m = randomRange(0, 12);
          let d = randomRange(0, new Date(1972, m, 0).getDate()); // 1972 is first leap year for computer's date systems so we can ask API about feb 29
          this.parsedParams["M"]= m;
          this.parsedParams["D"]= d;
          return `${m+1}/${d+1}`;
      }
    }

    // do the fetch and autoparse
    async fetchApi() {
      let nurl= this.url;

      if(this.params) for(var i=0; i< this.params.length; i++) nurl= nurl.replace(`%(${this.params[i]})%`, this.generateParamValue(i));

      let r = await fetch(nurl, { method: "GET", headers: this.options })
      if(r.ok){ 
        let json= await r.json();
        return this.customParser ? this.customParser(this, json) : json; 
      }
      else throw new Error(`[${this.url}] ERR: ${r.status}`);
    }
  }
  ApiData.YEAR_RANGES= [1950, new Date().getFullYear()];
  ApiData.MONTH_NAMES= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  ApiData.GEN_OFFSET= 2;

  const excuseWho=[
    "I", "You", "My father", "Your father", "My sister", "My dog", "The neightbor's dog", "Some random guy", "A policeman on my door", "Seems like you", "My alter-ego", "Obama", "The creator of the universe", "God", "Miguel Martin", "Gabriel Yañez", "An hominid"
  ]

  const excuseAction=[
    "should", "wanna", "was ordered to", "may be", "might be", "must", "can't", "will", "will be", "want to be"
  ]

  // fast way of making a custom probability of choosing each api
  const excuseWeights= [0,0,0,1,1,2,2,2,2,2,2];

  const apis=[

      // Get user's IP data + location, pretty accurate for a free one (planned for news API query, ended up being used just for greetings)
      new ApiData("https://ipapi.co/json", HEADER_JSON ),

      // Check if given word is a name
      new ApiData("https://check-name.herokuapp.com/verify/%0%", HEADER_JSON ),

      // [ https://rapidapi.com/divad12/api/numbers-1/ ] -- Education -> Numbers @ divad12
      // An API for interesting facts about numbers. Provides trivia, math, date, and year facts about number
      new ApiData("https://numbersapi.p.rapidapi.com/%(Y)%/year?json=true&fragment=true", {...HEADER_JSON, ...HEADER_RAPIDAPI}, function(instance, json){
        
        // this is UGLY, I just wanted to get this done
        if(!json.found) return ["I was about to tell you an excuse...","But I'm pretty out of your stupid abuse! DROP THE MIC"];
        let response= [
          "Say you couldn't do it because...",
          `the year ${json.number} ${json.text}`
        ];
        if(json.date) response[1]= `on ${json.date} of ${response[1]}`;
        else response[1]= `in ${response[1]}`;
        return response;
      } ),
      new ApiData("https://numbersapi.p.rapidapi.com/%(M/D)%/date?json=true&fragment=true", {...HEADER_JSON, ...HEADER_RAPIDAPI}, function(instance, json){
        
        // this is UGLY, I just wanted to get this done
        if(!json.found) return ["I was about to tell you an excuse...","But I'm pretty out of your stupid abuse! DROP THE MIC"];
        let response= [
          "Say you couldn't do it because...",
          `${json.text}`
        ];
        if(json.year) response[1]= `on ${ApiData.MONTH_NAMES[instance.parsedParams.M]} ${instance.parsedParams.D} of the year ${json.year} ${response[1]}`;
        else response[1]= `the ${ApiData.MONTH_NAMES[instance.parsedParams.M]} ${instance.parsedParams.D}, ${response[1]}`;
        return response;
      } ),

      // [ https://rapidapi.com/hargrimm/api/wikihow/ ] -- Data -> WikiHow @ hargrimm
      // Retrieve random out-of-context text and images from WikiHow articles
      new ApiData("https://hargrimm-wikihow-v1.p.rapidapi.com/steps?count=1", HEADER_RAPIDAPI, function(instance, json){
        return ["" , `${excuseWho[randomRange(0, excuseWho.length)]} ${excuseAction[randomRange(0, excuseAction.length)]} ${json["1"][0].toLowerCase()}${json["1"].slice(1)}`];
      } )
  ];

  // The welcome thing
  const elmLocation= document.getElementById("location-container");

  async function initWelcomeDiv(){
    let location="";
    let carrier="";
    try {
      // location API
      let json= await apis[0].fetchApi();
      let c= json.city, r= json.region, cn= json.country_name;
      if(c) location+= r ? `${c}, ${r}`:c;
      else if(r) location+= r;
      if(cn) location+= c||r ? ` (${cn})`:cn;
      if(json.org) carrier= `Brought to you by ${json.org}`;
    }
    catch (error) { 
      console.error(error);
      // in case API fails, guess location from navigator.language and hope for the best xd
      location= countryName(navigator.language.split('-')[1]);
    }

    elmLocation.children[1].innerHTML=location;
    elmLocation.children[2].innerHTML=carrier;
    elmLocation.classList.remove("invisible");
  }

  // The welcome thing
  const elmExcuses= document.getElementById("excuses-container");
  const elmExcuseTemplate= document.getElementById("excuse-template");

  var bWaiting= false;
  async function generateExcuse(){

    if(bWaiting) {
      console.log("generateExcuse() => Please wait until previous excuse finishes generating");
      return;
    }

    bWaiting= true;

    let gen= apis[ApiData.GEN_OFFSET + excuseWeights[randomRange(0, excuseWeights.length)]];

    try {
      let response= await gen.fetchApi();
      let elm= elmExcuseTemplate.content.children[0].cloneNode(true);
      
      // using response[1]?? gives an "unreachable" error in babel-eslint
      elm.children[0].innerHTML= response[0];
      elm.children[1].innerHTML= response[1];
      
      elmExcuses.innerHTML= "";
      elmExcuses.append(elm);
    }
    catch(e){ console.error(e); }

    bWaiting= false;
  }

  // Startup

  initWelcomeDiv();
  document.getElementById("generate").addEventListener("click", ()=>{ generateExcuse(); });

  /**
   *  --------------------------------- Nothing to see down below here... is just the title's glow animation code ---------------------------------
   */ 

  const elmTitleGlow= document.getElementById("title-glow");
  const NCHECK= -2147483648;

  let boundingBox, offsetX, offsetY, objAngle, xFactor, yFactor, shadowX, shadowY, musDistRaw, objScale, shadowAlpha, shadowSpread;
  function animateTitleGlow(musX, musY) {
    for(const e of elmTitleGlow.children) {
      boundingBox = e.getBoundingClientRect();
      offsetX= musX - boundingBox.x - boundingBox.width * .5;
      offsetY= musY - boundingBox.y - boundingBox.height * .5;
      xFactor= offsetX * .00625;
      yFactor= offsetY * .00625;
      musDistRaw= xFactor*xFactor + yFactor*yFactor; // no normalized!
      objScale= clamp(1.15 - musDistRaw * .035, 1.0, 1.15);
      objAngle = offsetX&NCHECK ? max(4.0 - musDistRaw, .0) : min(-4.0 + musDistRaw, .0);
      shadowAlpha= clamp(1.0 - musDistRaw * .045, .0, 1.0);
      shadowSpread= 1.0 - (objScale-1.0) * 3;
      shadowX = offsetX * -.0125 * objScale;
      shadowY = offsetY * .0125 * objScale;

      e.style.textShadow = `${shadowX*objScale}px ${-shadowY*objScale}px ${20-15*shadowSpread}px rgba(220,210,230,${shadowAlpha})`;
      e.style.transform = `scale(${objScale}) rotate(${objAngle}deg)`;
    }
  }

  let u= true;
  document.addEventListener("mousemove", (e) => {
    if( (u=!u) ) window.requestAnimationFrame(function () { animateTitleGlow(e.clientX, e.clientY); });
  });

  {
    let str= elmTitleGlow.innerHTML;
    let nstr= "";
    for(let c of str) nstr+=`<span>${c}</span>`;
    elmTitleGlow.innerHTML= nstr;
  }
};
