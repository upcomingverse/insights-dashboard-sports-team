import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { useEffect, useState } from "react";

export default function PriceGraph({
  category,
  filterData,
}: {
  category: string | undefined;
  filterData: any;
}) {
  const [finalData, setFinalData] = useState([{}]);

  useEffect(() => {
    const vendors = filterData?.map((item: string[]) => item[1]);
    const prices = filterData?.map((item: number[]) => item[5]);
    const data = prices
      ?.slice(1)
      .filter(
        (price: string | undefined) => price !== undefined && price !== ""
      )
      .map((price: string, index: number) => ({
        name: vendors[index + 1] || "vendors",
        price:
          price && typeof price === "string"
            ? parseFloat(price.replace("$", ""))
            : price,
      }));

    // console.log(data);
    setFinalData(data);
  }, [filterData]);

  return (
    <>
      {category && finalData?.length > 0 && (
        <div className="bg-white">
          <h6 className="font-bold text-lg text-center p-2">{"Price"}</h6>
          <BarChart
            className="shadow-md border p-4"
            width={500}
            height={400}
            data={finalData}
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
              <Label
                value="price ($)"
                angle={-90}
                position="insideLeft"
                offset={-5}
              />
            </YAxis>
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#8884d8" />
          </BarChart>
        </div>
      )}
    </>
  );
}
