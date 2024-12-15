import { jwtDecode } from 'jwt-decode';

export interface ClientUserList{
    userId:number;
    roleId?:number;
    userName: string;
    firstName:string;
    lastName: string;
    fullName: string;
}

export class ICLoginModel{
    icNumber: string;
}

export class VerifyOTPRequest{
    USER_ID: number;
    code: string;
}

export interface UserTokenModel {
    UserId: number;
    IcNumber: string;
    RoleId?: number;
    UserName: string;
    FirstName?: string;
    LastName?: string;
    FullName?: string;
    password: string;
    UserType: string;
    Email: string;
    IsVerified?: boolean;
    Mobile: string;
  }
  export class TokenService {
    decodeToken(token: string): UserTokenModel {
      return jwtDecode<UserTokenModel>(token);
    }
  }