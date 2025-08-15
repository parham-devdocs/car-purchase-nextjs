'use client';
import LineChart from "../../../component/dashboard/lineChart";
import PieChart from "../../../component/dashboard/pieChart";
import BarChart from "../../../component/dashboard/barCharts";

export default function StatisticsPage() {

  return (
    <div className="min-h-screen min-w-screen bg-white dark:bg-gray-800 md:px-15 lg:px-20 px-10 py-20" >
      <h1 className="text-blue-500 mb-4 text-4xl">Statistics</h1>
<div className=' flex flex-wrap gap-4 items-center justify-center'>
    <LineChart  color="#0EA5E9" dot="#ffffff"  title="totla revenue based on vehicle type" />
    <PieChart  color="#059669" fill="#059669" title="number of vehicles based on country"/>
    <PieChart  color="#059669" fill="#059669" title="number of vehicles based on continent"/>
    <BarChart color="#ffb300" fill="#ffb300" title="total number of vehicles based on type"/>
</div>
    
    </div>
  );
}