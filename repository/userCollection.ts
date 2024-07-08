export class User {
  constructor(public id: string, public name: string, public email: string) {}
}

//object to store users
export const users: User[] = [];
