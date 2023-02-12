import { FC } from 'react'

import clsx from 'clsx'

import styles from './HeatmapCell.module.scss'
import { Tooltip } from '@material-tailwind/react'

interface HeatmapCellProps {
  type?: 'main' | 'head' | 'body'
  label?: string | number
  rangeX?: number
  rangeY?: number
}

const HeatmapCell: FC<HeatmapCellProps> = ({ type, label, rangeX, rangeY }) => {
  const classes = {
    [styles.main]: type === 'main',
    [styles.head]: type === 'head',
    [styles.body]: type === 'body',
  }

  return (
    <Tooltip
      className='bg-black/70'
      offset={10}
      content={
        <div className={styles.tooltip}>
          <p>
            {'Капитальные затраты без НДС:'} <span>{`${rangeX}%`}</span>
          </p>
          <p>
            {'Объем производства:'} <span>{`${rangeY}%`}</span>
          </p>
        </div>
      }
    >
      <div className={clsx(styles.wrapper, classes)}>
        <span>{label}</span>
      </div>
    </Tooltip>
  )
}

export default HeatmapCell
