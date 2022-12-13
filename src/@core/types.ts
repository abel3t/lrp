import { FriendType } from './enums'

export type FormMode = 'create' | 'update'

export type Member = {
  id?: string
  name?: string
  phone?: string
  gender?: string
  birthday?: string
  career?: string
  address?: string
  email?: string
  description?: string
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
