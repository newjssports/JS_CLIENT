export class RegisterModel {
    RoleId?: number;
    UserName?: string;
    FirstName?: string;
    LastName?: string;
    FullName?: string;
    Password!: string;
    UserType?: string;
    IcNumber: string;
    Email: string;
    Mobile:string = "123";
  }
  