import { FC, PropsWithChildren } from 'react'

import { SAR as range } from '@constants'

import { Currencies, CurrenciesString, Powers, PowersString } from '@enums'

import { formatNumber } from '@utils'

import { iCAPEX } from '@services'

import HeatmapCell from './HeatmapCell'
import HeatmapCol from './HeatmapCol'

import styles from './Heatmap.module.scss'

interface HeatmapProps extends PropsWithChildren {
  capex: iCAPEX
  irr: number
  matrix: number[][]
  tooltip?: 'Объем производства' | 'Стоимость продукции'
}

const Heatmap: FC<HeatmapProps> = ({ capex, irr, matrix, tooltip }) => {
  const power = capex?.power || 'NONE'
  const currency = capex?.currency || 'RUB'
  const measure = `${PowersString[power]} ${CurrenciesString[currency]}`

  return (
    <div className={styles.wrapper}>
      <HeatmapCol type='body'>
        <HeatmapCell type='body' />
        <HeatmapCell
          type='main'
          label={`${formatNumber(irr)}%`}
        />

        {range?.map(IRR => (
          <HeatmapCell
            key={IRR}
            type='body'
            label={`${IRR}%`}
          />
        ))}
      </HeatmapCol>

      <div className={styles.table}>
        <div className={styles.head}>
          <div className={styles.row}>
            {capex?.matrix?.[0]?.map(value => (
              <HeatmapCell
                key={value}
                type='main'
                label={`${formatNumber(value / Powers[power] / Currencies[currency])} ${measure}`}
              />
            ))}
          </div>

          <div className={styles.row}>
            {range?.map(IRR => (
              <HeatmapCell
                key={IRR}
                type='head'
                label={`${IRR}%`}
              />
            ))}
          </div>
        </div>

        <div className={styles.body}>
          {matrix?.map((SAR, indexSAM) => (
            <HeatmapCol key={indexSAM}>
              {SAR?.map((_, indexSAR) => (
                <HeatmapCell
                  key={indexSAR}
                  label={`${formatNumber(matrix?.[indexSAR]?.[indexSAM])}%`}
                  tooltip={tooltip}
                  rangeX={range[indexSAM]}
                  rangeY={range[indexSAR]}
                />
              ))}
            </HeatmapCol>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Heatmap
