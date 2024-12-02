import { useState, useContext, useEffect } from "react";
import {
  CertificationChart,
  CompatibilityChart,
  PriceGraph,
  SizeWeightChart,
} from "../Graph/index";
import { DataContext } from "../Context/DataProvider";
import FdaApproval from "../Graph/FdaApproval";

function Dashboard({ isShow }: { isShow: boolean }) {
  const [category, setCategory] = useState<string>();
  const data = useContext(DataContext);
  const [filterData, setfilterData] = useState(data);

  useEffect(() => {
    const result = data?.filter((item) => item[0] === category);
    setfilterData(result);
  }, [category]);

  return (
    <section
      className={`${
        isShow ? "w-[95%]" : "w-[80%]"
      } p-4 flex-1`}
    >
      <div className="flex gap-3 items-center mt-4">
        <div className="flex flex-col items-center justify-center gap-2  bg-white w-[30%] h-[100px] rounded-md border">
          <span className="font-bold text-lg">Vendors</span>
          <span className="text-3xl font-bold text-blue-500">
            {data && data?.slice(1).map((item) => item[1]).length}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2  bg-white w-[30%] h-[100px] rounded-md  border">
          <span className="font-bold text-lg text-center">
            Product Category
          </span>
          <span className="text-3xl font-bold text-blue-500">
            {" "}
            {data &&
              Array.from(new Set(data?.slice(1).map((item) => item[0]))).length}
          </span>
        </div>
      </div>

      <br />

      <div className="flex flex-col bg-white w-fit rounded-md p-4 border">
        <span className="text-blue-500 font-semibold">Product Category: </span>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="border p-4 rounded-md"
          name=""
          id=""
        >
          <option>--Select--</option>
          {Array.from(new Set(data?.slice(1).map((item) => item[0]))).map(
            (category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            )
          )}
        </select>
      </div>

      <br />

      <div>
        <div className="font-bold text-lg capitalize">{category}</div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <PriceGraph category={category} filterData={filterData} />
          <SizeWeightChart category={category} filterData={filterData} />
          <CompatibilityChart category={category} filterData={filterData} />

          {/* <div className="bg-white">
            <MetricsTrackedChart category={category} filterData={filterData} />
          </div> */}

          <CertificationChart category={category} filterData={filterData} />
          <FdaApproval category={category} filterData={filterData} />
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
