import { FC } from 'react'

import clsx from 'clsx'

import styles from './TableCell.module.scss'

interface TableCellProps {
  type: 'head' | 'body'
  label: string | number
}

const TableCell: FC<TableCellProps> = ({ type, label }) => {
  const classes = {
    [styles.head]: type === 'head',
    [styles.body]: type === 'body',
  }

  return <div className={clsx(styles.wrapper, classes)}>{label}</div>
}

export default TableCell
