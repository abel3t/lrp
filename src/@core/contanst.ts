import {
  CarePriority,
  CareType,
  DisciplePriority,
  DiscipleshipProcess,
  DiscipleType,
  PersonalType
} from './enums';
import { ColorsType } from './interface';

export const NotApplicable = 'N/A';

export const DiscipleshipProcessColor: ColorsType = {
  [DiscipleshipProcess.Basic]: 'warning',
  [DiscipleshipProcess.Commitment]: 'success',
  [DiscipleshipProcess.Equipment]: 'info',
  [DiscipleshipProcess.Empowerment]: 'primary'
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

export const PersonalTypeText = {
  [PersonalType.Unbeliever]: 'Unbeliever',
  [PersonalType.Unsure]: 'Unsure',
  [PersonalType.Friend]: 'Friend',
  [PersonalType.Member]: 'Member',
};

export const PersonalTypeColor: ColorsType = {
  [PersonalType.Unbeliever]: 'error',
  [PersonalType.Unsure]: 'secondary',
  [PersonalType.Friend]: 'warning',
  [PersonalType.Member]: 'primary'
};
