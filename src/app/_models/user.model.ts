
export interface SignupData{
    firstName: string,
    lastName:string,
    email:string,
    password:string
}
export interface LoginData{
    email:string,
    password:string
}


export interface SignUpResponse{
    id:string,
    email:string,
    token:string,
    expiresIn:string
}

export interface LoginResponse{
    id:string,
    token:string
}

export class User{

    constructor(
        public id:string,
        public email:string,
        private _token:string,
        private _tokenExpirationDate:Date
    ){}
    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token
    }
}

export interface cities {
    id: number,
    name: string,
    governorate: string,
    created_at:string,
    updated_at:string,
}

export interface apart{
  id:number,
  description:string,
  approved:boolean,
  address:string,
  price:number,
  link?:string,
  gender:string,
  available:number,
  max:number,
  images:string,
  nearby?:string,
  owner_id:number,
  city_id:number,
  created_at:string,
  updated_at:string

}
