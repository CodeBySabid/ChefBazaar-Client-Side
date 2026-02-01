import { FaUsers, FaDollarSign, FaTruck, FaClock } from "react-icons/fa";
import PaymentChart from "./PaymentChart";
import OrderPieChart from "./OrderPieChart";
import StatCard from "./StatCard"

const PlatformStatistics = () => {
  return (
    <div className="p-6 space-y-6 bg-base-200 min-h-screen">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Platform Statistics Overview</h1>
        <p className="text-gray-500">
          Key metrics and performance trends for platform administrators
        </p>
      </div>

      {/* Stat Cards */}
      <StatCard></StatCard>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentChart />
        <OrderPieChart />
      </div>
    </div>
  );
};

export default PlatformStatistics;
