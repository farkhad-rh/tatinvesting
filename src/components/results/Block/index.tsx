import { FC, PropsWithChildren } from 'react'

import styles from './Block.module.scss'

const Block: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default Block
