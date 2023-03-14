import { Component, Input } from '@angular/core';
import { Complejo } from '../complejo';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css'],
})
export class ResultadoComponent {
  @Input() mostrar: boolean;
  @Input() complejo: Complejo;  
  @Input() raices: Complejo[];
  @Input() operacion: String;
  @Input() c1: Complejo;
}
