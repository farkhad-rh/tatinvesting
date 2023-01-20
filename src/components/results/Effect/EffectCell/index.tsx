import { FC } from 'react'

import { Typography } from '@material-tailwind/react'
import clsx from 'clsx'

import styles from './EffectCell.module.scss'

interface EffectCellProps {
  label?: string
  measure?: string
}

const EffectCell: FC<EffectCellProps> = ({ label, measure }) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <Typography
          className={clsx(styles.text, styles.label)}
          variant='small'
        >
          {label}
        </Typography>
      )}

      {measure && (
        <Typography
          className={clsx(styles.text, styles.measure)}
          variant='small'
        >
          {measure}
        </Typography>
      )}
    </div>
  )
}

export default EffectCell
