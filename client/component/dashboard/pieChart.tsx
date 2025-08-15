import React from 'react';
import {  Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const PieChartComponent = ({  color, fill, title }: {  color: string; fill: string; title: string }) => {
  const data = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189,
    }
  ];
  return (
    <ResponsiveContainer
      width={400}
      height={320}
      className={`border-2 py-1 px-1 rounded-md`}
      style={{ borderColor: color }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={80}
            fill={fill}
            label
          />
       
            <Tooltip  contentStyle={{color,backgroundColor:"#c5e1a5",borderRadius:"5px"  }}  />
            <Legend      wrapperStyle={{margin:"3px", fontSize: '15px',fontWeight: 500, }}
            formatter={(value) => <span style={{ color:"#33691e" }}>{value}</span>}/>

        </PieChart>

        {/* Title below the chart, centered */}
        <h3 className="text-base font-medium -mt-2   text-center" style={{color}}>{title}</h3>
      </div>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;