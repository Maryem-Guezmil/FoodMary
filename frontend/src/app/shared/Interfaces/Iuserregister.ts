export interface IuserRegister{
    //all the fileds we wanna send to the server + we get it from the api body
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    address:string;

}