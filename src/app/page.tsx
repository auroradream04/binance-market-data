import Dashboard from "@/components/Dashboard";
import { getTradingPairs } from "./utils";

export default async function Home() {
  const tradingPairs = await getTradingPairs();
  
  return (
    <div className="w-full h-full min-h-screen bg-black text-white flex justify-center items-center">
      <Dashboard tradingPairs={tradingPairs} />
    </div>
  );
}
