import { getTradingPairs } from "./utils";

export default async function Home() {
  const tradingPairs = await getTradingPairs();
  console.log(tradingPairs.length);
  return (
    <div className="w-full h-full bg-black text-white">
      <div className="flex flex-col gap-4">
        {tradingPairs.map((pair: string) => (
        <div key={pair}>{pair}</div>
      ))}
        </div>
    </div>
  );
}
