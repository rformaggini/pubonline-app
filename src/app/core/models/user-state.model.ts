import { Role } from '@enums/role';

export class UserState {
  name!: string;
  email!: string;
  username!: string;
  role!: Role[];
}
