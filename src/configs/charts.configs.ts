import { ApexOptions } from 'apexcharts'
import { Props } from 'react-apexcharts'

export const globalChartsConfig: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    events: {
      dataPointMouseEnter(event) {
        event.target.style.cursor = 'pointer'
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: '#fff',
        fontSize: '13px',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
    },
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  yaxis: {
    labels: {
      style: {
        colors: '#fff',
        fontSize: '13px',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
      formatter(val) {
        return String(val)
      },
    },
  },
  grid: {
    show: true,
    borderColor: '#ffffff40',
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  states: {
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: 'dark',
    x: {
      show: false,
    },
    marker: {
      show: false,
    },
  },
  legend: {
    labels: {
      colors: '#fff',
    },
    itemMargin: {
      horizontal: 16,
    },
  },
}

export const globalStackChartsConfig: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    events: {
      dataPointMouseEnter(event) {
        event.target.style.cursor = 'pointer'
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: '#fff',
        fontSize: '13px',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
    },
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  },
  yaxis: {
    labels: {
      style: {
        colors: '#fff',
        fontSize: '13px',
        fontFamily: 'inherit',
        fontWeight: 300,
      },
      formatter(val) {
        return String(val)
      },
    },
  },
  grid: {
    show: true,
    borderColor: '#ffffff40',
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  states: {
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: 'dark',
    x: {
      show: false,
    },
    marker: {
      show: false,
    },
  },
  legend: {
    labels: {
      colors: '#fff',
    },
    itemMargin: {
      horizontal: 16,
    },
  },
}

export const barChartConfig: Props = {
  type: 'bar',
  height: 400,
  options: {
    ...globalChartsConfig,
    colors: ['#fff'],
    plotOptions: {
      bar: {
        columnWidth: '25%',
        borderRadius: 4,
      },
    },
  },
}

export const lineChartConfig: Props = {
  type: 'line',
  height: 400,
  options: {
    ...globalChartsConfig,
    colors: ['#fff'],
    stroke: {
      lineCap: 'round',
    },
    markers: {
      size: 5,
    },
  },
}

export const stackChartConfig: Props = {
  type: 'bar',
  height: 400,
  options: {
    ...globalStackChartsConfig,
    colors: ['#42a5f5', '#66bb6a', '#ffa726', '#ef5350', '#ab47bc'],
    chart: {
      ...globalStackChartsConfig.chart,
      stacked: true,
      stackType: '100%',
    },
    dataLabels: {
      ...globalStackChartsConfig.dataLabels,
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 'normal',
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 4,
      },
    },
  },
}
