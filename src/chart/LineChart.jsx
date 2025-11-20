import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { month: "jan", sales: 4000 },
    { month: "feb", sales: 3600 },
    { month: "mar", sales: 2000 },
    { month: "apr", sales: 6000 },
    { month: "may", sales: 5400 },
];

function LineCharts({ width = 800, height = 300 }) {
    return (
        <>
            <LineChart width={width} height={height} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                />
            </LineChart>
        </>
    );
}

export default LineCharts;