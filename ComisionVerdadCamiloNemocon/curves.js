
let xPts = [];
let yPts = [];
let textosTarget = [];

class curves
{

  constructor(datos)
  {    
    this.x = 0;
    this.y = 0;

    this.t = random(360);
    this.tStep = 0.003;

    this.R = random(100,150);
    this.Rx = random(500,600);
    this.Ry = random(300,700);
    this.Px = random(300,500);
    this.Py = random(50,100);

    this.datos = datos;

    textosTarget= split(this.datos,'-');
    this.cantidad = textosTarget.length;

  }

  mostrar()
  { 
    strokeWeight(8);
    for (let i = 0; i < this.cantidad; i++) 
    {
        this.x = this.Rx + (this.R * i * cos(this.t));
        this.y = this.Ry + (this.R * i * sin(this.t));

        xPts[i] = this.x;
        yPts[i] = this.y;

        this.t += this.tStep;

        stroke(100,100,0);
        noFill();
        bezier(xPts[0], yPts[0],xPts[0], yPts[0],this.Px,this.Py,xPts[i+1], yPts[i+1]);

        if(i==0)
        {          
          stroke(100,100,0);
          fill(100,100,0);
        }
        else
        {
          stroke(100,0,0);
          fill(100,0,0);
        }
        circle(xPts[i], yPts[i], 20);

        noStroke();
        fill(255);
        text(textosTarget[i], xPts[i], yPts[i]);  

       
    }


        
        //bezier(xPts[0], yPts[0],xPts[0], yPts[0],300, 50,xPts[2], yPts[2]);

  }
    



}