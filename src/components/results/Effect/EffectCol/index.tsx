import { FC, PropsWithChildren } from 'react'

import { EffectCell } from '@components/results'

import styles from './EffectCol.module.scss'

const EffectCol: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <EffectCell />

      {children}
    </div>
  )
}

export default EffectCol
