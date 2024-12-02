import { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";

const FdaApproval = ({
  category,
  filterData,
}: {
  category: string | undefined;
  filterData: any;
}) => {
  const [certificationData, setCertificationData] = useState<
    { name: string; fdaApproval: number; ceCertification: number }[]
  >([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const vendors = filterData?.map((item: string[]) => item[1]);
    const ceCertification = filterData?.map((item: string[]) => item[9]);

    let yes = 0;
    let no = 0;
    const vendorWithYes: { name: string }[] = [];
    const vendorWithNO: { name: string }[] = [];

    ceCertification?.forEach((certification: string, index: number) => {
      certification = certification?.toLowerCase(); // Convert to lowercase for case-insensitive check
      // console.log(certification);

      if (certification === "yes") {
        yes += 1;
        vendorWithYes.push({ name: vendors[index] });
      }

      if (certification === "no") {
        no += 1;
        vendorWithNO.push({ name: vendors[index] });
      }
    });

    // console.log(vendorWithYes);
    const result = [
      {
        name: `Yes`,
        value: yes,
        vendors_name: vendorWithYes,
      },
      {
        name: "No",
        value: no,
        vendors_name: vendorWithNO,
      },
    ];

    //@ts-expect-error
    setCertificationData(result);
  }, [filterData]);

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      vendors_name,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />

        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >
          {vendors_name?.map((item: { name: string }, index: number) => (
            <tspan
              key={index}
              x={ex + (cos >= 0 ? 1 : -1) * 12}
              dy={`${1.2}em`}
            >
              {item?.name}
            </tspan>
          ))}
          <tspan
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            dy={`${vendors_name?.length * 1.2}em`}
          >
            {`(Percent ${(percent * 100).toFixed(2)}%)`}
          </tspan>
        </text>
      </g>
    );
  };

  const onPieEnter = useCallback(
    (_: string, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <>
      {category && (
        <div className="bg-white">
          <h6 className="font-bold text-lg text-center p-2">
            {"FDA Approved"}
          </h6>

          <PieChart width={400} height={400}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={certificationData}
              cx={200}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            />
          </PieChart>
        </div>
      )}
    </>
  );
};

export default FdaApproval;
