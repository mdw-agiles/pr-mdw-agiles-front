import {Role} from './role.model';

export interface Token {
  token: string;
  mobile?: number;
  name?: string;
  roles?: Array<Role>;
}
