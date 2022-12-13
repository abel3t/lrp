import { ThemeColor } from './layouts/types';
import { DiscipleshipProcess } from './enums';
import { ColorsType } from './interface';

export const NotApplicable = 'N/A'

export const DiscipleshipProcessColor: ColorsType = {
  [DiscipleshipProcess.Basic]: 'warning',
  [DiscipleshipProcess.Commitment]: 'success',
  [DiscipleshipProcess.Equipment]: 'info',
  [DiscipleshipProcess.Empowerment]: 'primary'
}
