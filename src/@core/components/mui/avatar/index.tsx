
import { Ref, forwardRef } from 'react'

import useBgColor, { UseBgColorType } from 'src/@core/hooks/useBgColor'
import { ThemeColor } from 'src/@core/layouts/types'


import MuiAvatar from '@mui/material/Avatar'
import { lighten, useTheme } from '@mui/material/styles'


import { CustomAvatarProps } from './types'

const Avatar = forwardRef((props: CustomAvatarProps, ref: Ref<any>) => {
  // ** Props
  const { sx, src, skin, color } = props

  // ** Hook
  const theme = useTheme()
  const bgColors: UseBgColorType = useBgColor()

  const getAvatarStyles = (skin: 'filled' | 'light' | 'light-static' | undefined, skinColor: ThemeColor) => {
    let avatarStyles

    if (skin === 'light') {
      avatarStyles = { ...bgColors[`${skinColor}Light`] }
    } else if (skin === 'light-static') {
      avatarStyles = {
        color: bgColors[`${skinColor}Light`].color,
        backgroundColor: lighten(theme.palette[skinColor].main, 0.88)
      }
    } else {
      avatarStyles = { ...bgColors[`${skinColor}Filled`] }
    }

    return avatarStyles
  }

  const colors: UseBgColorType = {
    primary: getAvatarStyles(skin, 'primary'),
    secondary: getAvatarStyles(skin, 'secondary'),
    success: getAvatarStyles(skin, 'success'),
    error: getAvatarStyles(skin, 'error'),
    warning: getAvatarStyles(skin, 'warning'),
    info: getAvatarStyles(skin, 'info')
  }

  return <MuiAvatar ref={ref} {...props} sx={!src && skin && color ? Object.assign(colors[color], sx) : sx} />
})

Avatar.defaultProps = {
  skin: 'filled',
  color: 'primary'
}

export default Avatar
