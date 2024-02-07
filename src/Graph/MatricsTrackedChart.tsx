import {  useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MetricsTrackedChart = ({
  category,
  filterData,
}: {
  category: string | undefined;
  filterData: any;
}) => {
  const [metricsData, setMetricsData] = useState<{ name: string }[]>([]);

  useEffect(() => {
    const vendors = filterData?.map((item: string[]) => item[1]);
    const metrics = filterData?.map((item: string[]) => item[4]);

    const data = vendors?.slice(1).map((vendors: string[], index: number) => {
      const Productmetrics = metrics[index + 1]?.split(", ") || [];
      return {
        name: vendors,
        ...Object.fromEntries(
          Productmetrics.map((metric: string[]) => [metric, 1])
        ),
      };
    });
    setMetricsData(data);
  }, [filterData]);

  return (
    <>
      {category && (
        <BarChart
          className="p-4 shadow-md border"
          width={800}
          height={400}
          data={metricsData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys((metricsData && metricsData?.[0]) || {}).map(
            (metric, index) => (
              <Bar
                key={index}
                dataKey={metric}
                stackId="a"
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            )
          )}
        </BarChart>
      )}
    </>
  );
};

export default MetricsTrackedChart;
