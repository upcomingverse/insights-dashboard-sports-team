import ExcelTable from "../Graph/ExcelTable";
import readExcelFile from "../lib/readSheet";
import { useState, useEffect } from "react";

function Vendors({ isShow }: { isShow: boolean }) {
  const [data, setData] = useState<any>();
  const [category, setCategory] = useState<string>();
  const [filteredVendors, setFilteredVendors] = useState<string[]>([]);

  async function getExcelData() {
    try {
      const res = await readExcelFile();
      setData(res);
    } catch (err) {
      console.log(err, "error in fetch data");
    }
  }

  useEffect(() => {
    getExcelData();
  }, []);

  useEffect(() => {
    if (category && data) {
      const vendors = data
        .filter((item: string[]) => item[0] === category)
        .map((item: string[]) => item[1]);

      setFilteredVendors(vendors);
    } else {
      setFilteredVendors([]);
    }
  }, [category, data]);

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
          {Array.from(
            new Set(data?.slice(1).map((item: string[]) => item[0]))
          ).map((category, index) => (//@ts-expect-error
            <option key={index} value={category}>
              {category}
            </option>
          ))}
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
