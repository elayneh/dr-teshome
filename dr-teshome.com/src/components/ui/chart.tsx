import * as React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartJSTooltip,
  Legend as ChartJSLegend,
} from "chart.js"
import { Line as ChartJSLine, Bar as ChartJSBar, Pie as ChartJSPie } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartJSTooltip,
  ChartJSLegend
)

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
}

interface ChartDataItem {
  name: string
  value?: number
  [key: string]: any
}

interface ChartContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'data'> {
  data: ChartDataItem[]
  xField: string
  yFields: string[]
}

interface ChartChildProps {
  name?: string
  dataKey: string
  stroke?: string
  fill?: string
}

export function ChartContainer({ className, children, data, xField, yFields, ...props }: ChartContainerProps) {
  return <div className={className} {...props}>{children}</div>
}

export function LineChart({ data = [], children, ...props }: { data?: ChartDataItem[] } & any) {
  const chartData = {
    labels: data.map((item: ChartDataItem) => item.name),
    datasets: React.Children.map(children, (child: any) => {
      if (React.isValidElement<ChartChildProps>(child) && child.type === Line) {
        return {
          label: child.props.name || 'Data',
          data: data.map((item: ChartDataItem) => item[child.props.dataKey]),
          borderColor: child.props.stroke || '#2e8b57',
          backgroundColor: child.props.stroke || '#2e8b57',
        }
      }
      return null
    }).filter(Boolean)
  }
  return <ChartJSLine data={chartData} options={defaultOptions} {...props} />
}

export function BarChart({ data = [], children, ...props }: { data?: ChartDataItem[] } & any) {
  const chartData = {
    labels: data.map((item: ChartDataItem) => item.name),
    datasets: React.Children.map(children, (child: any) => {
      if (React.isValidElement<ChartChildProps>(child) && child.type === Bar) {
        return {
          label: child.props.name || 'Data',
          data: data.map((item: ChartDataItem) => item[child.props.dataKey]),
          backgroundColor: child.props.fill || '#2e8b57',
        }
      }
      return null
    }).filter(Boolean)
  }
  return <ChartJSBar data={chartData} options={defaultOptions} {...props} />
}

export function PieChart({ data = [], children, ...props }: { data?: ChartDataItem[] } & any) {
  const pieChild = React.Children.toArray(children).find((child: any) => 
    React.isValidElement<ChartChildProps>(child) && child.type === Pie
  ) as React.ReactElement<ChartChildProps> | undefined

  const chartData = {
    labels: data.map((item: ChartDataItem) => item.name),
    datasets: [{
      data: data.map((item: ChartDataItem) => item[pieChild?.props?.dataKey || 'value']),
      backgroundColor: pieChild?.props?.fill || '#2e8b57',
    }]
  }
  return <ChartJSPie data={chartData} options={defaultOptions} {...props} />
}

export function XAxis(props: any) {
  return null // Chart.js handles this internally
}

export function YAxis(props: any) {
  return null // Chart.js handles this internally
}

export function CartesianGrid(props: any) {
  return null // Chart.js handles this internally
}

export function Tooltip(props: any) {
  return null // Chart.js handles this internally
}

export function Legend(props: any) {
  return null // Chart.js handles this internally
}

export function Line(props: any) {
  return null // Chart.js handles this internally
}

export function Bar(props: any) {
  return null // Chart.js handles this internally
}

export function Pie(props: any) {
  return null // Chart.js handles this internally
}

export function Cell(props: any) {
  return null // Chart.js handles this internally
}

export function CustomTooltip(props: any) {
  return null // Chart.js handles this internally
} 