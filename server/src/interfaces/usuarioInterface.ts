

export interface IshowAllUser<T>{
    showAllUser(id:string): Promise<T | null>;
}