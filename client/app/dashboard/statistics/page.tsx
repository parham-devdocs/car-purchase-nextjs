'use client';
import LineChart from "../../../component/dashboard/lineChart";
import PieChart from "../../../component/dashboard/pieChart";
// Make sure data is correct

const pie1 = [
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
export default function StatisticsPage() {

  return (
    <div className="min-h-screen min-w-screen bg-white dark:bg-gray-800 px-20 py-20" >
      <h1 className="text-blue-500 mb-4 text-4xl">Statistics</h1>
<div className=' flex flex-wrap gap-4 items-center justify-center'>
    <LineChart  color="#0EA5E9" dot="#ffffff"  title="totla revenue based on vehicle type" />
    <PieChart data={pie1} color="#059669" fill="#059669" title="lewkfnlek"/>
    <PieChart data={pie1} color="#059669" fill="#059669" title="lkvnlkedfnv"/>
</div>
    
    </div>
  );
}