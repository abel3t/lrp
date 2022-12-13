import { DiscipleshipProcess, FriendType } from './enums'
import { ColorsType } from './interface'

export const NotApplicable = 'N/A'

export const DiscipleshipProcessColor: ColorsType = {
  [DiscipleshipProcess.Basic]: 'warning',
  [DiscipleshipProcess.Commitment]: 'success',
  [DiscipleshipProcess.Equipment]: 'info',
  [DiscipleshipProcess.Empowerment]: 'primary'
}

export const FriendTypeText = {
  [FriendType.Unbeliever]: 'Unbeliever',
  [FriendType.Friend]: 'Friend',
  [FriendType.NextStep]: 'Next Step',
  [FriendType.NewLife]: 'New Life',
  [FriendType.AWalkWithGodClass]: 'A Walk With God Class'
}
