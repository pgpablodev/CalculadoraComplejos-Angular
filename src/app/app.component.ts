import { Component } from '@angular/core'
import { Complejo } from './complejo'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent{
  title = 'calculadora-complejos'

  c1_n1:number = 0
  c1_n2:number = 0
  c2_n1:number = 0
  c2_n2:number = 0
  forma1:String = 'b'
  forma2:String = 'b'

  exponenteP:number = 0
  exponenteRz:number = 2
  opSeleccionada:String = 's'

  c1:Complejo = new Complejo(0,0,'b')
  c2:Complejo = new Complejo(0,0,'b')
  c3:Complejo = new Complejo(0,0,'b')

  raices:Complejo[]

  plano: HTMLCanvasElement

  planoW: number
  planoH: number

  hayResultado:boolean = false

  calcular(operacion:String):void{
    this.c1 = new Complejo(this.c1_n1,this.c1_n2,this.forma1)
    this.c2 = new Complejo(this.c2_n1,this.c2_n2,this.forma2)

    this.raices = this.c1.raizNesima(this.exponenteRz)

    let segundoLeyenda = document.getElementById("segundoLeyenda") as HTMLElement
    
    if(operacion==='s'){    
      this.opSeleccionada = 's'  
      this.c3 = this.c1.sumaComplejo(this.c2)
    }else if(operacion==='r'){
      this.opSeleccionada = 'r'
      this.c3 = this.c1.restaComplejo(this.c2)      
    }else if(operacion==='m'){
      this.opSeleccionada = 'm'
      this.c3 = this.c1.prodComplejo(this.c2)      
    }else if(operacion==='d'){
      this.opSeleccionada = 'd'
      this.c3 = this.c1.divComplejo(this.c2)      
    }else if(operacion==='p'){      
      this.opSeleccionada = 'p'
      this.c3 = this.c1.potenciaNesima(this.exponenteP)
    }else if(operacion==='rz'){
      this.opSeleccionada = 'rz'
    }

    this.hayResultado = true

    setTimeout(()=>{
      this.plano = document.getElementById("plano") as HTMLCanvasElement
      let ctx = this.plano.getContext("2d") as CanvasRenderingContext2D
      ctx.clearRect(0, 0, this.plano.width, this.plano.height)      

      this.planoW = this.plano.clientWidth
      this.planoH = this.plano.clientHeight

      //Dibujamos el eje x
      ctx.beginPath()
      ctx.strokeStyle = "#374956"
      ctx.moveTo(0, this.planoH/2)
      ctx.lineTo(this.planoW, this.planoH/2)
      ctx.stroke()
      ctx.closePath()

      //Dibujamos el eje y
      ctx.beginPath()
      ctx.strokeStyle = "#374956"
      ctx.moveTo(this.planoW/2, 0)
      ctx.lineTo(this.planoW/2, this.planoH)
      ctx.stroke()
      ctx.closePath()

      let coordenadas1 = this.redimensionaComplejo(this.c1)
      let coordenadas2 = this.redimensionaComplejo(this.c2)
      let coordenadas3 = [0,0]
      let coordRaices = [[0,0]]
      if(operacion!=='rz'){
        coordenadas3 = this.redimensionaComplejo(this.c3)
      }else{
        coordRaices = []
        for(let raiz of this.raices as Complejo[]){
          console.log(raiz)
          coordRaices.push(this.redimensionaComplejo(raiz))
        }
      }
        
      if(operacion!=='rz')
        this.pintaPunto(ctx,coordenadas1[0],coordenadas1[1],"#970103")
      else
        this.pintaPunto(ctx,coordenadas1[0],coordenadas1[1],"#fff")
      if(operacion!=='p' && operacion!=='rz') this.pintaPunto(ctx,coordenadas2[0],coordenadas2[1],"#d5a100")
      if(operacion!=='rz'){
        this.pintaPunto(ctx,coordenadas3[0],coordenadas3[1],"#0b9a02")
      }else{
        for(let punto of coordRaices){
          this.pintaPunto(ctx,punto[0],punto[1],"#1095C1")
        }
      }

      if(operacion==='p')
        segundoLeyenda.style.visibility = "hidden"
      else
        segundoLeyenda.style.visibility = "visible"
    },500)    
  }

  pintaPunto(ctx: CanvasRenderingContext2D, x: number, y: number, color: string){ 
    ctx.beginPath()
    ctx.strokeStyle = color  
    ctx.moveTo(this.transportaX(0), this.transportaY(0))
    ctx.lineTo(this.transportaX(x), this.transportaY(y))
    ctx.stroke()
    ctx.closePath()
  }

  transportaX(x: number){
    return x + this.planoW/2
  }
  
  transportaY(y: number){
    return -y + this.planoH/2
  }
  
  redimensionaComplejo(c: Complejo){
    let n1 = c.getN1()
    let n2 = c.getN2()

    if(n1!==0 && n2!==0){
      while(Math.abs(n1)<this.planoW*0.05) n1*=10
      while(Math.abs(n2)<this.planoH*0.05) n2*=10
      while(Math.abs(n1)>this.planoW) n1/=10
      while(Math.abs(n2)>this.planoH) n2/=10
    }else{
      if(n1!==0){
        while(Math.abs(n1)<this.planoW*0.05) n1*=10
        while(Math.abs(n1)>this.planoW) n1/=10
      }
      if(n2!==0){
        while(Math.abs(n2)<this.planoH*0.05) n2*=10
        while(Math.abs(n2)>this.planoH) n2/=10
      }
    }

    return [n1, n2]
  }
}