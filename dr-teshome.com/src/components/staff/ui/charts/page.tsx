"use client"

import type React from "react"
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
  type ChartData,
  type ChartOptions,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"

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

// Chart Container
const ChartContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={`w-full h-full ${className || ""}`}>{children}</div>
}

// Line Chart Component
const ChartLine = ({
  data,
  options,
}: {
  data: ChartData<"line">
  options?: ChartOptions<"line">
}) => {
  const defaultOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return <Line data={data} options={{ ...defaultOptions, ...options }} />
}

// Bar Chart Component
const ChartBar = ({
  data,
  options,
}: {
  data: ChartData<"bar">
  options?: ChartOptions<"bar">
}) => {
  const defaultOptions: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return <Bar data={data} options={{ ...defaultOptions, ...options }} />
}

// Pie Chart Component
const ChartPie = ({
  data,
  options,
}: {
  data: ChartData<"pie">
  options?: ChartOptions<"pie">
}) => {
  const defaultOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  }

  return <Pie data={data} options={{ ...defaultOptions, ...options }} />
}

export {
  ChartContainer,
  ChartLine,
  ChartBar,
  ChartPie,
  type ChartData,
  type ChartOptions,
} 