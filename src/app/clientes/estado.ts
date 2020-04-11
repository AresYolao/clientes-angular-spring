export class Estado {

    idEstado: number;
    id: number;
    nombre: string;
    

         
    public constructor(init?: Partial<Estado>) {
        Object.assign(this, init);
        this.id = this.idEstado;
        
    }

}