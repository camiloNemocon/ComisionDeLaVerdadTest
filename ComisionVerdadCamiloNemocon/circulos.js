

class circulos 
{
  //se determinan los variables del objeto
  constructor(x, y, diameter, name, valor, baseDato) 
  {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.name = name;
    this.valor = valor;
    this.baseDato = baseDato;

    this.over = false;

    this.f = color(218, 165, 32);
    this.t = color(72, 61, 139);
  }

  //se crea la función donde se determina si el mouse esta encima de la burbuja, le entra como para metro mouseX y mouseY
  mouseOver(px, py) 
  {
    //distancia que hay entre la posición del mouse y la burbuja
    let distancia = dist(px, py, this.x, this.y);

    //si la distancia entre el mouse y la burbuja es cercana
    if(distancia < 20)
    {
      // entonces la variable over pongala en true
      this.over = true; 
    }
    //si la distancia entre el mouse y la burbuja es lejana
    else
    {   
      // entonces la variable over pongala en false
      this.over = false;
    }
  }

  //muestra la burbuja
  dibujar() 
  {
    stroke(50);
    strokeWeight(0.8);
    fill(lerpColor(this.f, this.t, (1/this.baseDato)));
    //dibuja la burbuja segun los datos obtenidos del archivo en el setup
    ellipse(this.x, this.y, this.diameter, this.diameter);

    noStroke();
    fill(0);
    push();
    textAlign(CENTER);
    textSize(10);
    text(this.name,this.x, this.y);
    pop();

    //si la variable over es igual a true, es decir, si esta cerca a la burbuja  
    if (this.over == true) 
    {
      noStroke();
      fill(255);
      //coloca el texto del dato mas abajo de la burbuja
      textSize(15);
      text("level: "+this.valor, this.x-20, this.y+30);
    }
  }
}
