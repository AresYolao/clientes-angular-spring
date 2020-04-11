import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {

  constructor(private http: HttpClient) { }


  getEstados(): Observable<any>{
    return this.http.get('http://localhost:8080/api/v1/estados')
    // .pipe(
    //   map((resp:any[]) => {
    //     return resp
    //     // .map(estado=>{
    //     //   return{
    //     //     idEstado: estado.idEstado,
    //     //     nombre: estado.nombre
    //     //   }
    //     // })
    //   })
    // )
  }
}

