import Dashboard from "@/components/Dashboard";
import { getTradingPairs } from "./utils";

export default async function Home() {
  const tradingPairs = await getTradingPairs();
  const USD_TRADING_PAIRS = tradingPairs.filter((pair: string) => pair.includes("USDT"));
  
  return (
    <div className="w-full h-full min-h-screen bg-black text-white flex justify-center items-center">
      <Dashboard tradingPairs={USD_TRADING_PAIRS} />
    </div>
  );
}
