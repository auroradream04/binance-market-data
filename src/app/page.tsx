import Dashboard from "./components/Dashboard";
import { getTradingPairs } from "./utils";

export default async function Home() {
  const tradingPairs = await getTradingPairs();
  console.log(tradingPairs.length);
  return (
    <div className="w-full h-full min-h-screen bg-black text-white flex justify-center items-center">
      <Dashboard tradingPairs={tradingPairs} />
    </div>
  );
}
