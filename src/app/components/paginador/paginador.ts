export class Paginador {
size: number;
totalElements: number;
totalPages: number;
number: number;


    public constructor(init?: Partial<Paginador>) {
        Object.assign(this, init);
    }
}
