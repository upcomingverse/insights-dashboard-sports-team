import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  CartesianGrid,
  YAxis,
  XAxis,
  ReferenceLine,
  Label,
} from "recharts";

const CompatibilityChart = ({
  category,
  filterData,
}: {
  category: string | undefined;
  filterData: any;
}) => {
  const [compatibilityData, setCompatibilityData] = useState<
    { name: string; iOSCompatible: number; androidCompatible: number }[]
  >([]);
  const [device, setDevice] = useState("Android");
  useEffect(() => {
    const vendors = filterData?.map((item: string[]) => item[1]);
    const iOSCompatibility = filterData?.map((item: string[]) => item[11]);
    const androidCompatibility = filterData?.map((item: string[]) => item[12]);
    // console.log(device);
    const data =
      device === "IOS"
        ? vendors?.slice(1).map((vendor: string[], index: number) => ({
            name: vendor,
            iOSCompatible: iOSCompatibility[index + 1] === "Yes" ? 1 : -1,
          }))
        : vendors?.slice(1).map((vendor: string[], index: number) => ({
            name: vendor,
            androidCompatible:
              androidCompatibility[index + 1] === "Yes" ? 1 : -1,
          }));

    setCompatibilityData(data);
  }, [filterData, device]);

  return (
    <>
      {category && compatibilityData?.length > 0 && (
        <>
          <div className="flex flex-col bg-white w-fit rounded-md p-4">
            <span className="font-bold text-lg p-2">
              Device Compatibility:{" "}
            </span>
            <select
              onChange={(e) => setDevice(e.target.value)}
              className="border p-4 mb-2 rounded-md w-32"
            >
              <option value={"Android"}>Android</option>
              <option value={"IOS"}>IOS</option>
            </select>
            <BarChart
              className="p-4 shadow-md border "
              width={700}
              height={300}
              data={compatibilityData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis>
                <Label value="1: yes" angle={-90} position="insideLeft" />
                <Label value="-1: no" angle={-90} position="insideBottomLeft" />
              </YAxis>
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="androidCompatible" fill="#8884d8" />
              <Bar dataKey="iOSCompatible" fill="#5e548e" />
            </BarChart>
          </div>
        </>
      )}
    </>
  );
};

export default CompatibilityChart;
