import { ApexOptions } from 'apexcharts'

export const сhartConfig: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
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
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: 'dark',
    x: {
      show: false,
    },
  },
}

export const barChartConfig: ApexOptions = {
  ...сhartConfig,
  colors: ['#fff'],
  plotOptions: {
    bar: {
      columnWidth: '25%',
      borderRadius: 4,
    },
  },
  xaxis: {
    ...сhartConfig.xaxis,
  },
}

export const lineChartConfig: ApexOptions = {
  ...сhartConfig,
  colors: ['#fff'],
  stroke: {
    lineCap: 'round',
  },
  markers: {
    size: 5,
  },
  xaxis: {
    ...сhartConfig.xaxis,
  },
}
