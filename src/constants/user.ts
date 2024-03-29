export type UserProps = {
  avatar?: string;
  firstName: string;
  lastName: string;
  planType?: string;
  accountType: 'CLIENT' | 'COACH' | 'ADMIN' | null;
  id: string;
  registerDate: string;
  hasPhoto: boolean;
  age: number;
  weight: number;
  height: number;
};

export type RoleType = 'CLIENT' | 'COACH' | 'ADMIN';
