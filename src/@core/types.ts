import { CarePriority, CareType, FriendType } from './enums'

export type FormMode = 'create' | 'update'

export type Account = {
  id: string
  name?: string
}

export type Member = {
  id?: string
  index?: number
  name?: string
  phone?: string
  gender?: string
  birthday?: string
  career?: string
  address?: string
  email?: string
  description?: string
  curator?: Account
  discipleshipProcess?: string
  believeInJesusDay?: string
  firstComeToLEC?: string
  introducedBy?: string
  newLifeMentor?: string
  memberClassDay?: string
  walkWithGodClassDay?: string
  weddingDate?: string
  giveChildDay?: string
  hometown?: string
  otherRole?: string
}

export type Friend = {
  id?: string
  index?: number
  name?: string
  phone?: string
  gender?: string
  birthday?: string
  address?: string
  email?: string
  description?: string
  hometown?: string
  type: FriendType
}

export type Care = {
  id?: string
  member?: Member
  curator?: any
  memberId: string
  type: CareType
  priority: CarePriority
  date?: Date
  description?: string
  imageUrl?: string
}
