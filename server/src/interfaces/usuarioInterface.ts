

export interface IshowAllUser<T>{
    showAllUser(id:string): Promise<T | null>;
}



export interface IloginUser<T>{
    login(email:string, password:string): Promise<{user:T | null; token:string | null;}> ;
}