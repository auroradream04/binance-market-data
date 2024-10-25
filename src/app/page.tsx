import Dashboard from "./components/Dashboard";
import { getTradingPairs } from "./utils";

export default async function Home() {
  try {
    const tradingPairs = await getTradingPairs();
    console.log("Trading pairs fetched:", tradingPairs.length);
    
    if (!Array.isArray(tradingPairs)) {
      console.error("getTradingPairs did not return an array:", tradingPairs);
      return <div>Error: Failed to fetch trading pairs</div>;
    }

    if (tradingPairs.length === 0) {
      console.warn("getTradingPairs returned an empty array");
      return <div>Warning: No trading pairs available</div>;
    }

    return (
      <div className="w-full h-full min-h-screen bg-black text-white flex justify-center items-center">
        <Dashboard tradingPairs={tradingPairs} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching trading pairs:", error);
    return <div>Error: Failed to fetch trading pairs</div>;
  }
}
