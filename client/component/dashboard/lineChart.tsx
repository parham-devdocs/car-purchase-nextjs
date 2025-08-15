

import React from 'react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
const colors = [
  "#ffa726", 
  "#ffca28",
   "#ffee58", 
  "#66bb6a", 
  "#26a69a", 
  "#ef5350"
];const data = [
  { month: 'Jan',  Car: 400, Van: 240, SUV: 600, Truck: 120 },
  { month: 'Feb',  Car: 300, Van: 350, SUV: 550, Truck: 140 },
  { month: 'Mar',  Car: 500, Van: 320, SUV: 620, Truck: 160 },
  { month: 'Apr',  Car: 600, Van: 400, SUV: 700, Truck: 180 },
  { month: 'May',  Car: 720, Van: 450, SUV: 800, Truck: 200 },
  { month: 'Jun',  Car: 800, Van: 500, SUV: 850, Truck: 220 },
  { month: 'Jul',  Car: 900, Van: 550, SUV: 900, Truck: 240 },
  { month: 'Aug',  Car: 880, Van: 520, SUV: 880, Truck: 230 },
  { month: 'Sep',  Car: 750, Van: 480, SUV: 820, Truck: 210 },
  { month: 'Oct',  Car: 640, Van: 420, SUV: 750, Truck: 190 },
  { month: 'Nov',  Car: 520, Van: 380, SUV: 680, Truck: 170 },
  { month: 'Dec',  Car: 450, Van: 300, SUV: 620, Truck: 150 },
];
const dataKeys=["Car","Van","SUV","Truck"]
const lineChart = ({color,dot,title}:{color:string,dot:string,title:string}) => {
  return (
    <ResponsiveContainer height={300}   className={`border-2  rounded-md`}  style={{ borderColor: color,maxWidth:"400px"}} >
            <div className="flex flex-col  items-center justify-center ">

    <LineChart
    width={400}
    height={250}
    data={data}
    className=' p-3'
    
    >
     <XAxis dataKey="month" stroke="#374151" tick={{ fill: '#374151', fontSize: 12 }} />
      <YAxis tick={{ fill: '#374151', fontSize: 12 }} />

 
    {dataKeys.map((entry:string,index:number)=>{
        return <Line
         type="monotoneX"
         dataKey={dataKeys[index]}
      stroke={colors[index]}
      dot={{ 
        r: 4, 
        fill:colors[index] // ✅ Solid blue fill
      }}
      activeDot={{ 
        r: 5, 
        fill:colors[index], 
        stroke: colors[index], 
        strokeWidth: 2 
      }}         
       />
    })}
  </LineChart>
  <h3 className="text-base font-medium mt-2 text-center " style={{color}}>{title}</h3>
  </div>
    </ResponsiveContainer>

  )
}

export default lineChart