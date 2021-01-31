

let dataEdge = {}; 
let dataNodos = {};

let edges;
let nodos; 

let fuenteUnica = [];
let targetUnico = [];
let baseUnica = [];

let datoCompletoFuente = []; 
let datoCompletoTarget = []; 

let red;

let botonSelect = false;
let botonSelect2 = false;
let botonIdSelectRed = 0;
let botonIdSelectRed2 = 0;

let objs = [];
let objsNum = 3;

let circulo = [];

//let barra = []; 

var nombre = [];
var level = [];
var nivel = [];
let con = 0;

let cnv;
var from;
var to;


 
function preload() 
{
  dataEdge = loadJSON('assets/edges_hechos.json');
  dataNodos = loadJSON('assets/nodo_hechos.json');
}

function setup() 
{
  cnv = createCanvas(1280, 2200);

  cnv.parent(P5vis);

  edges = dataEdge.edges;
  nodos = dataNodos.nodos;



  procesamientoDatos();

  fuenteConexiones(); 

  targetConexiones();  

  

  for (let i = 0; i < nodos.length; i++)  
  {
    nombre = nodos[i].nombre;
    level = nodos[i].lvl;

    nivel[i] = nodos[i].lvl;

    var tempBD = 0;

    for (let k = 0; k < baseUnica.length; k++)  
    {
      if(nodos[i].bd == baseUnica[k])
      {
        tempBD = k+1;
      }
    }

    circulo.push(new circulos(random(50,width-100), random(1100,1600), (level*i)+50, nombre, level, tempBD));
   
  }

  con = width / (nodos.length + 1);

  from = color(218, 165, 32);
  to = color(72, 61, 139);
  

}

function procesamientoDatos()
{
	for (let i = 0; i < edges.length; i++) 
  {
  	if(fuenteUnica.includes(edges[i].source) == false)
    {
  		fuenteUnica.push(edges[i].source);
  	}
    if(targetUnico.includes(edges[i].target) == false)
    {
      targetUnico.push(edges[i].target);
    }
	}

  for (let i = 0; i < nodos.length; i++) 
  {      
    if(baseUnica.includes(nodos[i].bd) == false)
    {
      baseUnica.push(nodos[i].bd);
    }
  }


}

function fuenteConexiones()
{
  for (let i = 0; i < fuenteUnica.length; i++) 
  {
    var tempString = fuenteUnica[i];
    for (let k = 0; k < edges.length; k++) 
    { 
      if(fuenteUnica[i] == edges[k].source)
      {      
         tempString = tempString+"-"+edges[k].target;      
      }       
    }
    datoCompletoFuente[i] = tempString;   
  }
}

function targetConexiones()
{
  for (let i = 0; i < targetUnico.length; i++) 
  {
    var tempString = targetUnico[i];
    for (let k = 0; k < edges.length; k++) 
    { 
      if(targetUnico[i] == edges[k].target)
      {      
         tempString = tempString+"-"+edges[k].source;      
      }       
    }
    datoCompletoTarget[i] = tempString;   
  }
}  

function draw() 
{
  background(50);

  stroke(200,0,0);
  fill(200,0,0);
  textSize(20);
  text("SOURCE",50,80);
  for (let i = 0; i < fuenteUnica.length; i++) 
  {
    textSize(12);
    botonFuente(10,(40*i)+100, 30, fuenteUnica[i],i);
  }

  stroke(100,100,0);
  fill(100,100,0);
  textSize(20);
  text("TARGET",1150,80);
  for (let i = 0; i < targetUnico.length; i++) 
  {
    textSize(12);
    botonTarget(width-textWidth(targetUnico[i])-20,(40*i)+100, 30, targetUnico[i],i);
  }

  if(botonSelect == true)
  {
  	red.mostrar();
  }

  if(botonSelect2 == true)
  {    
    noFill();
    stroke(255);
    objs.mostrar();  
  }

  for (let k = 0; k < baseUnica.length; k++)  
  {    
    fill(lerpColor(from, to, (1/(k+1))));
    rect(20,1660+(k*30),20,20);
    textSize(18);
    text(baseUnica[k], 20+25,1660+(k*30)+15);
  }


  //diagrama de barras
  for (let i = 0; i < nodos.length; i++) 
  {
    circulo[i].dibujar();
    circulo[i].mouseOver(mouseX, mouseY);    

    var tempBD = 0;

    for (let k = 0; k < baseUnica.length; k++)  
    {
      if(nodos[i].bd == baseUnica[k])
      {
        tempBD = k+1;
      }
    }

    fill(lerpColor(from, to, (1/tempBD)));
    let altura = map(nivel[i],0,Math.max(...nivel),100,300);
    
    let x = con * (2.0 / 3 + i);
    rect(x, height, con / 3 * 2, -altura);

    push();
      translate(x+3, height - altura );
      rotate(- (PI / 2.0));
      fill(255);
      textSize(10);
      text(nodos[i].nombre, 4, 6);
    pop();
  } 

 
}


function botonFuente(x,y, alto, textoBtn, idBtn)
{

  let cWidth = textWidth(textoBtn);
  let ancho = cWidth+10;

  fill(255,0,0); 
  rect(x,y,ancho,alto);
  
  noStroke();
  fill(0); 
  text(textoBtn, x+5, y+20);

  if (mouseIsPressed) 
  {
    if(mouseX >= x && mouseX <= x+ancho)
    {
      if(mouseY >= y && mouseY <= y+alto)
      {
          botonSelect = true;
          botonIdSelect = idBtn;
          red = new redes(datoCompletoFuente[idBtn],y);         
      }     
    }
  }
}

function botonTarget(x,y, alto, textoBtn, idBtn)
{

  let cWidth = textWidth(textoBtn);
  let ancho = cWidth+10;

  fill(100,100,0); 
  rect(x,y,ancho,alto);

  noStroke();
  fill(0);  
  text(textoBtn, x+5, y+20);

  if (mouseIsPressed) 
  {
    if(mouseX >= x && mouseX <= x+ancho)
    {
      if(mouseY >= y && mouseY <= y+alto)
      {
          botonSelect2 = true;
          botonIdSelect2 = idBtn;
          objs = new curves(datoCompletoTarget[idBtn]);                 
      }     
    }
  }
}