import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, filter,catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
private url: string = 'http://localhost:8080/api/v1/clientes';
private httpHeader = new HttpHeaders({'Content-Type': 'application/json'}) 
constructor(private http: HttpClient,
  private router: Router) { }

  getClientes(page:number): Observable<any>{
   return this.http.get(this.url + '?page=' + page + '&size=4')
}

createCliente(cliente: Cliente): Observable<Cliente>{
  cliente.fechaCreacion = new Date();
  cliente.estatus = true;
  return this.http.post<Cliente>(this.url,cliente,{headers: this.httpHeader}).pipe(
    catchError(e=>{
      this.router.navigate(['/clientes'])
      console.log(e);
      swal.fire('Error al guardar',e.error.debugMessage,'error')
      return throwError(e);
    })
  )
}

getCliente(id): Observable<any>{
  return this.http.get(`${this.url}/${id}`).pipe(
    catchError(e =>{

      this.router.navigate(['/clientes'])
      console.log(e);
      swal.fire('Error al editar',`El cliente con id ${id} no existe en la base de datos`,'error')
      return throwError(e);
    })
  )
  
  
}

update(cliente: Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.url}/${cliente.idCliente}`,cliente,{headers: this.httpHeader}).pipe(
    catchError(e=>{
      this.router.navigate(['/clientes'])
      console.log(e);
      swal.fire('Error al actualizar',e.error.debugMessage,'error')
      return throwError(e);
    })
  )
}






}


// export class ClientsWrapper{
//   _embedded: { clientes: Cliente[]};
// }