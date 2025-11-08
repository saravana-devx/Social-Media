export interface IUser{
  id : string;
  iat : number;
  exp : number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: IUser;
    }
  }
}