import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Paginador } from '../components/paginador/paginador';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: Paginador[];

  constructor(private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  
  
      this.activatedRoute.paramMap.subscribe(
        params => {
          let page:number = +params.get('page');
          if(!page){
            page = 0;
          }
          this.clienteService.getClientes(page).subscribe(
            clientes => {
              
              console.log(clientes);
             this.clientes = clientes._embedded.clientes
             this.paginador = clientes.page
           console.log(clientes);
             console.log(this.clientes)
            console.log(this.paginador)}
          );
        }

      )
  }


  borrar(cliente: Cliente){

    let mensajeBorrar = `Deseas borrar el cliente ${cliente.nombre}`;
    let mensajeActivar = `Deseas activar el cliente ${cliente.nombre}`;

     let clienteEliminado = 'Cliente Eliminado!'
     let clienteActivado= 'Cliente Activado!'

     let exitoBorrado = `cliente ${cliente.nombre} eliminado con éxito`;
     let exitoActivado = `cliente ${cliente.nombre} activado con éxito`;

     let siBorrar = 'Si, Borrar!';
     let siActivar = 'Si, Activar!';

    swal.fire({
      title: 'Estás seguro?',
      text: cliente.estatus ? mensajeBorrar : mensajeActivar,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: cliente.estatus ? siBorrar : siActivar,
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        cliente.estatus = !cliente.estatus;
        // cliente.dataEstado.id = cliente.dataEstado.idEstado;
        this.clienteService.update(cliente).subscribe(
          cliente => 
               swal.fire(
                cliente.estatus ? clienteActivado: clienteEliminado,
                cliente.estatus ? exitoActivado: exitoBorrado,
                'success'
              )
        )
      }
    })


   
}


}
