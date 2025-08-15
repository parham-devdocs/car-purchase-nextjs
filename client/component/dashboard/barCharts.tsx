

import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const barCharts = ({  color, fill, title }: {  color: string; fill: string; title: string }) => {
    const data = [
        {
          "type": "Car",
          "number": 90
        },
        {
            "type": "SUV",
            "number": 56
          },
          {
            "type": "Truck",
            "number": 56
          },
        {
          "type": "Van",
         "number":35
        }
      ]

return (   <ResponsiveContainer
    width={400}
    height={320}
    className={`border-2 py-1 px-1 rounded-md`}
    style={{ borderColor: color }}
  >
    <div className="flex flex-col items-center justify-center h-full">
    <BarChart width={400} height={300}  data={data} className=' px-3' margin={{top: 20, right: 20, bottom: 20}}>
  <CartesianGrid  />
  <XAxis dataKey="type" />
  <YAxis />
  <Tooltip contentStyle={{color,backgroundColor:"#ffecb3",borderRadius:"5px"  }} />
  <Legend  wrapperStyle={{margin:"3px", fontSize: '15px',fontWeight: 500, }} formatter={(value) => <span style={{ color}}>{value}</span>}/>
  <Bar dataKey="number" fill={color} radius={5}   activeBar={{ stroke: color,strokeWidth: 2,fill:"#ffecb3",opacity: 0.8,speed:20}}  />
</BarChart>  

      {/* Title below the chart, centered */}
      <h3 className="text-base font-medium -mt-2   text-center" style={{color}}>{title}</h3>
    </div>
  </ResponsiveContainer>)
}

export default barCharts