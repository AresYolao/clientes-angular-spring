import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { CatalogoService } from '../services/catalogo.service';
import { Estado } from './estado';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  forma: FormGroup;
  cliente: Cliente = new Cliente();
  estados: Estado[];
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private catalogoService: CatalogoService) { 
     
  }

  ngOnInit() {
    this.cargarCliente();
    this.forma = this.crearFormulario();

    this.catalogoService.getEstados()
    .subscribe(estados =>{
      this.estados = estados._embedded.estados;
      this.estados.unshift({
        id: null,
        idEstado: null,
        nombre: 'Seleccione Estado'
      })
      // this.estados.unshift({
      //   nombre: '[seleccione pais]',
      //   codigo: ''
      // })
      console.log(this.estados);
    });

  }

  cargarCliente(){
this.activatedRoute.params.subscribe(params =>{
  let id = params['id']
if(id){
  this.clienteService.getCliente(id).subscribe(
    cliente => {

      this.cliente = cliente
      console.log(this.cliente);
     this.forma =  this.crearFormulario();
    }
  )
}

})
  }
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoPaternoNoValido(){
    return this.forma.get('apellidoPaterno').invalid && this.forma.get('apellidoPaterno').touched
  }

  get apellidoMaternoNoValido(){
    return this.forma.get('apellidoMaterno').invalid && this.forma.get('apellidoMaterno').touched
  }

  get correoNoValido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }


  // crearFormulario() {
  //   this.forma = this.fb.group(new Cliente());
  //   console.log(this.forma);

  // }

  crearFormulario() {
    return  this.fb.group({
        idCliente: [this.cliente.idCliente],
        nombre:  [this.cliente.nombre,Validators.required],
        apellidoPaterno: [this.cliente.apellidoPaterno,Validators.required],
        apellidoMaterno: [this.cliente.apellidoMaterno,Validators.required],
        email: [this.cliente.email,[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),Validators.required]],
        fechaCreacion: [this.cliente.fechaCreacion],
        telefono: [this.cliente.telefono],
        estatus: [this.cliente.estatus],
        dataEstado: this.fb.group({
          // id: [this.cliente.dataEstado.idEstado],
          idEstado: [this.cliente.dataEstado.idEstado]
          // nombre: [this.cliente.dataEstado.nombre]
        }),
  });

  }

  guardar(){
    if(this.forma.invalid){
     return  Object.values(this.forma.controls).forEach(control =>{
      if(control instanceof FormGroup) {
        Object.values(control.controls).forEach(control => control.markAsTouched());
      }else{

        control.markAsTouched();
      }
      });
    }
    console.log(this.forma);
    console.log(this.forma.value);
    

    //  this.cliente = this.forma.value;
     
     this.cliente = new Cliente(this.forma.value);
    //  this.cliente.dataEstado.id = this.forma.value.dataEstado;
     console.log(this.cliente);
    this.clienteService.createCliente(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Registro Exitoso',`Nuevo cliente ${cliente.nombre}`,'success')}
    )

    this.forma.reset();
  }

update(){
  if(this.forma.invalid){
    return  Object.values(this.forma.controls).forEach(control =>{
     if(control instanceof FormGroup) {
       Object.values(control.controls).forEach(control => control.markAsTouched());
     }else{

       control.markAsTouched();
     }
     });
   }
    this.cliente = this.forma.value
   console.log(this.cliente);
  this.clienteService.update(this.cliente).subscribe(
    cliente => {
      this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado',`actualización de  cliente ${cliente.nombre}`,'success')
    }
  )
}


cancelar(){
  this.router.navigate(['/clientes'])
}

}
