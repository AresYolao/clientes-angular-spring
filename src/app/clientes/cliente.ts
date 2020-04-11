import { Estado } from './estado';
export class Cliente {

    idCliente: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaCreacion: Date;
    telefono: number;
    email: string;
    estatus: boolean;
    dataEstado: Estado;


    public constructor(init?: Partial<Cliente>) {
        this.dataEstado = new Estado(); 
        Object.assign(this, init);
         
    }
}
