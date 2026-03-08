import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function FireGrowthChart({ size }) {

  if(!size) return null;

  const data = [
    { time: 0, area: 1 },
    { time: 3, area: size * 0.1 },
    { time: 6, area: size * 0.25 },
    { time: 12, area: size * 0.5 },
    { time: 24, area: size }
  ];

  return (
    <div style={{height:"200px", marginTop:"20px"}}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" label={{value:"Saat", position:"insideBottom"}} />
          <YAxis label={{value:"Alan (ha)", angle:-90}} />
          <Tooltip />
          <Line type="monotone" dataKey="area" stroke="#ef4444" strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FireGrowthChart;