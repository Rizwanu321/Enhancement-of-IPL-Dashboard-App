import {
  PieChart,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts'
import './index.css'

const COLORS = ['#28a745', '#dc3545', '#6c757d']

const renderCustomLabel = ({percent, name}) =>
  `${name} ${(percent * 100).toFixed(0)}%`

const PChart = ({data}) => (
  <div className="responsive-pie-chart-container">
    <ResponsiveContainer className="chart" width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          innerRadius="45%"
          outerRadius="80%"
          dataKey="value"
          label={renderCustomLabel}
          labelLine={false}
          cx="50%"
          cy="50%"
        >
          {data.map((item, i) => (
            <Cell key={`cell-${item}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend align="center" verticalAlign="bottom" iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  </div>
)

export default PChart
