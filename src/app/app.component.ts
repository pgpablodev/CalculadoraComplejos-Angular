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

  c1:Complejo = new Complejo(0,0,'b')
  c2:Complejo = new Complejo(0,0,'b')
  c3:Complejo = new Complejo(0,0,'b')

  plano: HTMLCanvasElement

  planoW: number
  planoH: number

  hayResultado:boolean = false    

  calcular(operacion:String):void{
    this.c1 = new Complejo(this.c1_n1,this.c1_n2,this.forma1)
    this.c2 = new Complejo(this.c2_n1,this.c2_n2,this.forma2)

    if(operacion==='s'){      
      this.c3 = this.c1.sumaComplejo(this.c2)
    }else if(operacion==='r'){
      this.c3 = this.c1.restaComplejo(this.c2)      
    }else if(operacion==='m'){
      this.c3 = this.c1.prodComplejo(this.c2)      
    }else if(operacion==='d'){
      this.c3 = this.c1.divComplejo(this.c2)      
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
      let coordenadas3 = this.redimensionaComplejo(this.c3)
      this.pintaPunto(ctx,coordenadas1[0],coordenadas1[1],"#970103")
      this.pintaPunto(ctx,coordenadas2[0],coordenadas2[1],"#d5a100")
      this.pintaPunto(ctx,coordenadas3[0],coordenadas3[1],"#0b9a02")
    },500)    
  }

  pintaPunto(ctx: CanvasRenderingContext2D, x: number, y: number, color: string){ 
    ctx.beginPath()
    ctx.strokeStyle = color  
    ctx.moveTo(this.xReal(0), this.yReal(0))
    ctx.lineTo(this.xReal(x), this.yReal(y))
    ctx.stroke()
    ctx.closePath()
  }

  xReal(x: number){
    return x + this.planoW/2
  }
  
  yReal(y: number){
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