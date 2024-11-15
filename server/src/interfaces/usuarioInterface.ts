

export interface IshowAllUser<T>{
    showAllUser(id:string): Promise<T | null>;
}



export interface IloginUser{
    login(email:string, password:string): Promise<boolean>;
}