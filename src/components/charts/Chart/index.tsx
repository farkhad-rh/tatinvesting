import { FC, PropsWithChildren, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

import { barChartConfig } from '@configs/charts.configs'

import { formatAbsoluteNumber, formatNumber } from '@utils'

interface ChartProps extends PropsWithChildren {
  name: string
  data?: number[]
  years: number[]
  measure?: string
}

const Chart: FC<ChartProps> = ({ name, data, years, measure }) => {
  const [config, setConfig] = useState(barChartConfig)

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
                    return data?.map(number => `${formatNumber(number)} ${measure}`)?.[
                      series?.dataPointIndex
                    ] as string
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
      series={[
        {
          name: name,
          data: data?.map(number => formatAbsoluteNumber(number)) as Array<number>,
        },
      ]}
    />
  )
}

export default Chart
