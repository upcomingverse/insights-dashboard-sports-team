import { useContext, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { DataContext } from "../Context/DataProvider";
import { getIndexOfFeature } from "../lib/SheetFormat";

const SizeWeightChart = ({
  category,
  filterData,
}: {
  category: string | undefined;
  filterData: any;
}) => {
  const [sizeWeightData, setSizeWeightData] = useState<
    { name: string; size: number; weight: number }[]
  >([]);

  useEffect(() => {
    const vendors = filterData?.map((item: string[]) => item[1]);
    const sizes = filterData?.map((item: string[]) => item[6]);
    const weights = filterData?.map((item: string[]) => item[7]);

    const data = vendors?.slice(1).map((vendor: string[], index: number) => ({
      name: vendor,
      size: typeof (sizes[index] === "string")
        ? parseInt(sizes[index + 1].replace("mm", ""))
        : parseInt(sizes[index + 1]),
      weight: parseFloat(weights[index + 1]) || 0,
    }));
    setSizeWeightData(data);
  }, [filterData]);

  const COLORS = ["#8884d8", "beige"];

  return (
    <>
      {category && sizeWeightData?.length > 0 && (
        <div className="bg-white">
          <h6 className="font-bold text-lg text-center p-2">{"Weight"}</h6>
          <LineChart
            className="p-4 shadow-md border"
            width={700}
            height={400}
            data={sizeWeightData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} />

            <YAxis>
              {/* <Label value="Size (mm)" angle={-90} position="insideLeft" offset={-1} /> */}
              <Label
                value="Weight (oz)"
                angle={-90}
                position="insideBottom"
                offset={-1}
              />
            </YAxis>

            <Tooltip />
            <Legend />
            {/* <Line dataKey="size" stroke="black" fill={COLORS[0]} legendType="rect" /> */}
            <Line
              dataKey="weight"
              stroke="#8884d8"
              fill={COLORS[1]}
              legendType="rect"
            />
          </LineChart>
        </div>
      )}
    </>
  );
};

export default SizeWeightChart;
