import { FC, PropsWithChildren } from 'react'

import styles from './TableCol.module.scss'

const TableCol: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>
}

export default TableCol
