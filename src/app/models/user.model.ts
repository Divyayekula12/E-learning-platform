export class SignUpModel {
    name: string;
    email: string;
    password: string;
  
    constructor() {
      this.email = "";
      this.name = "";
      this.password = "";
    }
  }
  
  export class LoginModel {
    email: string;
    password: string;
  
    constructor() {
      this.email = "";
      this.password = "";
    }
  }
  