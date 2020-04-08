export class Cliente {

    idCliente: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaCreacion: Date;
    telefono: number;
    email: string;
    estatus: boolean;


    public constructor(init?: Partial<Cliente>) {
         Object.assign(this, init);
    }
}
