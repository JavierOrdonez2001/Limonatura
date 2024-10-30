// src/interfaces
export interface IreadActions<T>{
    findAll(): Promise<T[]>;
    findOne(id:string): Promise<T | null>;  
}

export interface IupdateActions<T>{
    
    delete(id:string): Promise<T | null>;
    update(id:string,items:T): Promise<T>;
}

export interface IcreateActions<T>{
    create(item:T): Promise<T>;
} 


export interface IsaludoMessage{

   saludo(message:string): string;
}

