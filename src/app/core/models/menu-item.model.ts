import { Role } from "@enums/role";

export class MenuItem {
    icon!: string;
    label!: string;
    route?: string;
    role!: Role[];
}