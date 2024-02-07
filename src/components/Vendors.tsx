import ExcelTable from "../Graph/ExcelTable";
import { useState, useContext } from "react";
import { DataContext } from "../Context/DataProvider";

function Vendors({ isShow }: { isShow: boolean }) {
  const [category, setCategory] = useState<string>();
  const data = useContext(DataContext);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className={`${isShow ? "w-[8%]" : "w-[80%]"}  p-4 overflow-y-scroll`}
    >
      <div className="font-bold text-3xl p-4 mb-4">Vendors</div>
      <div className="flex flex-col bg-white w-fit rounded-md p-4 mb-2">
        <span className="text-blue-500 font-semibold ">Product Category: </span>
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
      {/* <ul className="bg-[white] p-4 rounded-md underline overflow-y-auto h-[400px]">
        {filteredVendors.map((vendor: string, key: number) => (
          <li
            className="mb-4 p-4 cursor-pointer rounded-md m-auto duration-75 hover:bg-[whitesmoke]"
            key={key}
          >
            {vendor}
          </li>
        ))}
      </ul> */}

      {category && (
        <section className=" overflow-scroll mt-8 text-[hsl(0,0%,20%)] bg-[white] p-4 rounded-sm">
          <ExcelTable data={data} category={category} />
        </section>
      )}
    </section>
  );
}

export default Vendors;
