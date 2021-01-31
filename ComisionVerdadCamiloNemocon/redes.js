var t=0;
let temp = 100;
let mov;
let x;
let y;
let xCajas = [];
let yCajas = [];
let cantidadData = 0;
let textos = [];



class redes
{

  constructor(datos,posY)
  {    
    this.datos = datos;
    this.posY = posY;

    textos = split(this.datos,'-');
    cantidadData = textos.length;

    /*for (let i = 0; i < cantidadData; i++) 
    {
      print(textos[i]);
    }*/

    //print(this.datos);
  }

  mostrar()
  {
    strokeWeight(3);
    t += 0.05;
    
    mov= noise(temp, t / 10);

    if(cantidadData > 0)
    {
      for (let i = 0; i < cantidadData; i++) 
      {
        mov += 1;      
      
        x = (cos(mov * i) * 200)+550;

        if(this.posY > 300)
        {
          y = (sin(mov * (i - 1)) * 200)+this.posY ;  
        }
        else
        {
          y = (sin(mov * (i - 1)) * 200)+300; 
        }
        
        xCajas[i] = x;
        yCajas[i] = y;

        noFill();
        if(i==0)
        {          
          stroke(200,0,0);
        }
        else
        {
          stroke(100,100,0);
        }

       
        line(xCajas[i], yCajas[i], xCajas[i+1], yCajas[i+1]);
        line(xCajas[i], yCajas[i], xCajas[i+2], yCajas[i+2]);  
        

        let cWidth = textWidth(textos[i]);
        rect(xCajas[i], yCajas[i],cWidth+10,20);
        
        noStroke();
        fill(255);
        text(textos[i], xCajas[i]+5, yCajas[i]+15);       

      }    
    }
  }
    



}