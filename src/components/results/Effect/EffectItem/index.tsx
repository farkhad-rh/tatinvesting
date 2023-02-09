import { FC, PropsWithChildren } from 'react'

import { Single } from '@components/results'

import styles from './EffectItem.module.scss'

interface EffectItemProps extends PropsWithChildren {
  label: string
  value?: string
}

const EffectItem: FC<EffectItemProps> = ({ label, value, children }) => {
  return (
    <div className={styles.wrapper}>
      <Single
        label={label}
        value={value}
      />

      <div className={styles.table}>{children}</div>
    </div>
  )
}

export default EffectItem
