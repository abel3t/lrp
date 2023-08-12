import { CarePriority, CareType, DisciplePriority, DiscipleshipProcess, DiscipleType, FriendType } from './enums';
import { ColorsType } from './interface';

export const NotApplicable = 'N/A';

export const DiscipleshipProcessColor: ColorsType = {
  [DiscipleshipProcess.Basic]: 'warning',
  [DiscipleshipProcess.Commitment]: 'success',
  [DiscipleshipProcess.Equipment]: 'info',
  [DiscipleshipProcess.Empowerment]: 'primary'
};

export const FriendTypeText = {
  [FriendType.Unbeliever]: 'Unbeliever',
  [FriendType.Unsure]: 'Unsure',
  [FriendType.Friend]: 'Friend',
  [FriendType.NextStep]: 'Next Step',
  [FriendType.NewLife]: 'New Life',
  [FriendType.AWalkWithGodClass]: 'A Walk With God Class'
};

export const FriendTypeColor: ColorsType = {
  [FriendType.Unbeliever]: 'error',
  [FriendType.Unsure]: 'secondary',
  [FriendType.Friend]: 'warning',
  [FriendType.NextStep]: 'success',
  [FriendType.NewLife]: 'info',
  [FriendType.AWalkWithGodClass]: 'primary'
};

export const CareTypeColor: ColorsType = {
  [CareType.Message]: 'error',
  [CareType.Call]: 'warning',
  [CareType.FaceToFace]: 'info',
  [CareType.Visit]: 'primary'
};

export const CarePriorityColor: ColorsType = {
  [CarePriority.Warning]: 'error',
  [CarePriority.Normal]: 'warning',
  [CarePriority.Good]: 'success'
};

export const CareTypeText = {
  [CareType.Message]: 'Message',
  [CareType.FaceToFace]: 'Face To Face',
  [CareType.Call]: 'Call',
  [CareType.Visit]: 'Visit'
};

export const DiscipleTypeColor: ColorsType = {
  [DiscipleType.ShareGospel]: 'info',
  [DiscipleType.Believe]: 'success',
  [DiscipleType.Disciple]: 'primary'
};

export const DisciplePriorityColor: ColorsType = {
  [DisciplePriority.Warning]: 'error',
  [DisciplePriority.Normal]: 'warning',
  [DisciplePriority.Good]: 'success'
};

export const DiscipleTypeText = {
  [DiscipleType.ShareGospel]: 'Shared the Gospel',
  [DiscipleType.Believe]: 'Believed in Jesus',
  [DiscipleType.Disciple]: 'Disciple'
};
