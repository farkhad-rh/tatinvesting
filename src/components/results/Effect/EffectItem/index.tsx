import { FC, PropsWithChildren } from 'react'

import { Single } from '@components/results'

import styles from './EffectItem.module.scss'

interface EffectItemProps extends PropsWithChildren {
  label?: string
}

const EffectItem: FC<EffectItemProps> = ({ label, children }) => {
  return (
    <div className={styles.wrapper}>
      <Single
        label='Наименование продукции (NP)'
        value={label}
      />

      <div className={styles.table}>{children}</div>
    </div>
  )
}

export default EffectItem
