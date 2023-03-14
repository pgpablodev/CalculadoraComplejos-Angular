export class Complejo{
    private n1: number;
    private n2: number;
    private forma: String;

    constructor(n1:number,n2:number,forma:String){
        this.n1 = n1;
        this.n2 = n2;
        this.forma = forma;
        if(this.forma === 'p'){
            while(this.n2>180)
                this.n2-=180;
            while(this.n2<-180)
                this.n2+=180;
        }
    }

    getN1(){
        return this.n1
    }

    getN2(){
        return this.n2
    }

    getForma(){
        return this.forma
    }

    esValido(){
        if(this.forma==='p'){
            while(this.n2>180)
                this.n2-=180;
            while(this.n2<-180)
                this.n2+=180;
            return this.n2>=-180 && this.n2<=180;
        }else{
            return this.forma==='b';
        }		
    }

    cambioForma(){
        if(this.esValido()){
            if(this.forma==='p'){
                let mod = this.n1;
                let arg = this.n2;
                this.n1 = mod*Math.cos(toRadians(arg));
                this.n2 = mod*Math.sin(toRadians(arg));
                this.forma = 'b';
            }else if(this.forma==='b'){
                let a = this.n1;
                let b = this.n2;
                this.n1 = Math.sqrt(a*a+b*b);
                this.n2 = Math.atan(b/a);
                this.n2 = toDegrees(this.n2);
                this.forma = 'p';
            }
        }
    }

    copiaCambioForma(){
        let c:Complejo = new Complejo(this.n1,this.n2,this.forma);
        if(this.esValido()){
            if(this.forma==='p'){
                let mod = this.n1;
                let arg = this.n2;
                c.n1 = mod*Math.cos(toRadians(arg));
                c.n2 = mod*Math.sin(toRadians(arg));
                c.forma = 'b';
            }else if(this.forma==='b'){
                let a = this.n1;
                let b = this.n2;
                c.n1 = Math.sqrt(a*a+b*b);
                c.n2 = Math.atan(b/a);
                c.n2 = toDegrees(c.n2);
                c.forma = 'p';
            }
            return c;
        }else{
            return new Complejo(0,0,'b');
        }
    }

    sumaComplejo(c: Complejo){
        if(this.forma==='p')
            this.cambioForma();
        if(this.forma==='p')
            c.cambioForma();
        return new Complejo(this.n1+c.n1,this.n2+c.n2,'b');
    }

    restaComplejo(c: Complejo){
        if(this.forma==='p')
            this.cambioForma();
        if(this.forma==='p')
            c.cambioForma();
        return new Complejo(this.n1-c.n1,this.n2-c.n2,'b');
    }

    prodComplejo(c: Complejo){
        if(this.forma==='b')
            this.cambioForma();
        if(this.forma==='b')
            c.cambioForma();
        return new Complejo(this.n1*c.n1,this.n2+c.n2,'p');
    }

    divComplejo(c: Complejo){
        if(this.forma==='b')
            this.cambioForma();
        if(this.forma==='b')
            c.cambioForma();
        if(c.n1===0 || c.n2===0)
            return new Complejo(0,0,'p');
        else
            return new Complejo(this.n1/c.n1,this.n2-c.n2,'p');
    }

    potenciaNesima(n: number){
		if(n>=0){
			if(this.forma==='b') this.cambioForma();
			return new Complejo(Math.pow(this.n1,n),this.n2*n,'p');
		}
		return new Complejo(0,0,'b');
	}

    raizNesima(n: number){
		if(n>=2){
			let raices = [];
			if(this.forma==='b') this.cambioForma();
			let unidadImag = new Complejo(0,1,'b');	
            let angulo = toRadians(this.n2)	
			for(let i=0;i<n;i++){
				let aux = new Complejo(Math.pow(Math.E, (angulo+2*i*Math.PI)/n),0,'b');
				let miembro1 = new Complejo(Math.cos((angulo+2*i*Math.PI)/n),0,'b').divComplejo(aux.prodComplejo(unidadImag));
				let miembro2 = new Complejo(Math.sin((angulo+2*i*Math.PI)/n),0,'b').divComplejo(aux.prodComplejo(unidadImag)).prodComplejo(unidadImag);
				miembro1.n1 = aux.n1
                miembro2.n1 = aux.n1
                let resultado = miembro1.sumaComplejo(miembro2)
                if(resultado.forma==='p') resultado.cambioForma()
                raices.push(resultado)                
			}
			return raices;
		}
		return [];
	}

    conjugado(){
        if(this.forma==='p')
            this.cambioForma();
        return new Complejo(this.n1,-this.n2,this.forma);
    }

    opuesto(){
        if(this.forma==='p')
            this.cambioForma();
        return new Complejo(-this.n1,-this.n2,this.forma);
    }

    imprimir(){
        if(this.forma==='b'){
            if(this.n1!=0){
                if(this.n2>0)
                    return format(this.n1) +"+" +format(this.n2) +"i";
                else if(this.n2<0)
                    return format(this.n1) +""+format(this.n2) +"i";
                else
                    return format(this.n1) +"";	
            }else{
                if(this.n2>0 || this.n2<0)
                    return format(this.n2) +"i";
                else
                    return "0";	
            }
        }else{
            if(this.n2>0 || this.n2<0)
                return format(this.n1) +"∟" +format(this.n2) +"º";
            else
                return format(this.n1) +"";	
        }
    }
}

function toRadians(angulo: number){
    var pi = Math.PI;
    return angulo * (pi/180);
}

function toDegrees(angulo: number){
    var pi = Math.PI;
    return angulo * (180/pi);
}

function format(num: number){
    return (Math.round(num * 100) / 100).toFixed(2);
}