import { FC, PropsWithChildren } from 'react'

import clsx from 'clsx'

import styles from './HeatmapCol.module.scss'

interface HeatmapColProps extends PropsWithChildren {
  type?: 'body'
}

const HeatmapCol: FC<HeatmapColProps> = ({ type, children }) => {
  const classes = {
    [styles.body]: type === 'body',
  }

  return <div className={clsx(styles.wrapper, classes)}>{children}</div>
}

export default HeatmapCol
