import { FC, PropsWithChildren } from 'react'

import { Typography } from '@material-tailwind/react'

import styles from './Table.module.scss'

interface TableProps extends PropsWithChildren {
  label?: string
}

const Table: FC<TableProps> = ({ label, children }) => {
  if (!label) {
    return <div className={styles.list}>{children}</div>
  }

  return (
    <div className={styles.wrapper}>
      <Typography
        className={styles.label}
        variant='small'
      >
        {label}
      </Typography>

      <div className={styles.list}>{children}</div>
    </div>
  )
}

export default Table
