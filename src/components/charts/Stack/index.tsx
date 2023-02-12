import { FC, PropsWithChildren, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

import { stackChartConfig } from '@configs/charts.configs'

import { formatAbsoluteNumber, formatNumber } from '@utils'

import { ICalculateStack } from '@services'

interface StackProps extends PropsWithChildren {
  data?: ICalculateStack[]
  years: number[]
  measure?: string
}

const Stack: FC<StackProps> = ({ data, years, measure }) => {
  const [config, setConfig] = useState(stackChartConfig)

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setConfig(prev => {
          return {
            ...prev,
            options: {
              ...prev.options,
              xaxis: {
                ...prev.options?.xaxis,
                categories: years,
              },
              tooltip: {
                ...prev.options?.tooltip,
                y: {
                  formatter: function (_, series) {
                    return series?.series?.[series?.seriesIndex]?.map(
                      (number: number) => `${formatNumber(number)} ${measure}`
                    )?.[series?.dataPointIndex] as string
                  },
                },
              },
            },
          }
        }),
      1700
    )

    return () => clearTimeout(timer)
  }, [years, measure])

  return (
    <ReactApexChart
      type={config.type}
      height={config.height}
      options={config.options}
      series={data?.map(product => {
        return {
          name: product?.name,
          data: product?.collection?.map(number => formatAbsoluteNumber(number)) as Array<number>,
        }
      })}
    />
  )
}

export default Stack
