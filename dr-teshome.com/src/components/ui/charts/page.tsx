"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

// Default options for charts
const defaultOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
}

// Chart Container
const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`w-full h-full ${className || ""}`}>
      {children}
    </div>
  )
}

// Chart Line
const ChartLine = ({ data, options = {} }: { data: any, options?: any }) => {
  return <Line data={data} options={{ ...defaultOptions, ...options }} />
}

// Chart Bar
const ChartBar = ({ data, options = {} }: { data: any, options?: any }) => {
  return <Bar data={data} options={{ ...defaultOptions, ...options }} />
}

// Chart Pie
const ChartPie = ({ data, options = {} }: { data: any, options?: any }) => {
  return <Pie data={data} options={{ ...defaultOptions, ...options }} />
}

export {
  ChartContainer,
  ChartLine,
  ChartBar,
  ChartPie,
}
