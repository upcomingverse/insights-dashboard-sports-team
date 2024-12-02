import { BarChart2, Menu } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface HeadersProps {
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

function Headers({ setIsShow }: HeadersProps) {
  return (
    <header className="p-4 bg-white shadow-md">
      <div className="flex items-center gap-2">
        <button
          className="rounded-full bg-lime-500 w-[50px] h-[50px] grid place-content-center shadow-custom"
          onClick={() => setIsShow((s) => !s)}
        >
          <Menu color="#003049" size={20} />
        </button>
        <BarChart2 />
        <span className="font-bold text-xl">Insight</span>
      </div>
    </header>
  );
}

export default Headers;
