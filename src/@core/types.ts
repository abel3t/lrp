import { CarePriority, CareType, DisciplePriority, DiscipleType, PersonalType } from './enums';

export type FormMode = 'create' | 'update';

export type Account = {
  id: string;
  name?: string;
  role?: string;
};

export type Member = {
  id?: string;
  index?: number;
  name?: string;
  phone?: string;
  type?: string;
  gender?: string;
  birthday?: string;
  career?: string;
  address?: string;
  email?: string;
  description?: string;
  curator?: Account;
  friend?: any;
  discipleshipProcess?: string;
  believeInJesusDay?: string;
  firstComeToLEC?: string;
  introducedBy?: string;
  newLifeMentor?: string;
  weddingDate?: string;
  hometown?: string;
};

export type Friend = {
  id?: string;
  index?: number;
  name?: string;
  phone?: string;
  gender?: string;
  birthday?: string;
  address?: string;
  email?: string;
  description?: string;
  hometown?: string;
  type: PersonalType;
  friend?: any;
};

export type Care = {
  id?: string;
  member?: Member;
  person?: Member;
  curator?: any;
  memberId: string;
  type: CareType;
  priority: CarePriority;
  date?: Date;
  description?: string;
  image?: string;
  friend?: any;
};

export type Disciple = {
  id?: string;
  person?: Member;
  curator?: any;
  memberId: string;
  type: DiscipleType;
  priority: DisciplePriority;
  date?: Date;
  description?: string;
  image?: string;
};

export type Person = {
  id?: string;
  index?: number;
  name?: string;
  phone?: string;
  type?: string;
  gender?: string;
  birthday?: string;
  career?: string;
  address?: string;
  email?: string;
  description?: string;
  curator?: Account;
  discipleshipProcess?: string;
  believeInJesusDay?: string;
  firstComeToLEC?: string;
  introducedBy?: string;
  newLifeMentor?: string;
  weddingDate?: string;
  hometown?: string;
};

export type Absence = {
  id?: string;
  index?: number;
  type?: string;
  description?: string;
  member?: Member;
  person?: Member;
}
