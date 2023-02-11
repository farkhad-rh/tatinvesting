import { FC, PropsWithChildren } from 'react'
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
  return (
    <ReactApexChart
      type='bar'
      height={320}
      series={[
        {
          name: name,
          data: data?.map(number => formatAbsoluteNumber(number)) as Array<number>,
        },
      ]}
      options={{
        ...barChartConfig,
        xaxis: {
          ...barChartConfig.xaxis,
          categories: years,
        },
        tooltip: {
          ...barChartConfig.tooltip,
          y: {
            formatter: function (_, series) {
              return data?.map(number => `${formatNumber(number)} ${measure}`)?.[
                series?.dataPointIndex
              ] as string
            },
          },
        },
      }}
    />
  )
}

export default Chart
