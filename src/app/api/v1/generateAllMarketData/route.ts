import { generateMarketData } from "@/app/main";
import { getTradingPairs } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const interval = searchParams.get('interval')
    // const startTimestamp = searchParams.get('startTimestamp')  
    const isLoop = searchParams.get('isLoop')
    const loopInterval = searchParams.get('loopInterval') // in minutes

    // Check if all parameters are provided
    if (!interval || !isLoop || !loopInterval) {
        return NextResponse.json({ message: "All parameters are required" }, { status: 400 })
    }

    // Get all the trading pairs
    const tradingPairs = await getTradingPairs();
    
    // Get only the trading pairs with USDT
    const USD_TRADING_PAIRS = tradingPairs.filter((pair: string) => pair.includes("USDT"));

    // Loop the main functionality until process is closed using while loop
    while (true) {
        // Do not await generateMarketData to ensure we're doing the loop interval properly
        generateMarketData(USD_TRADING_PAIRS, interval, undefined, undefined, "CSV") // No need for start/end time, it will use the latest data for {interval} time https://developers.binance.com/docs/binance-spot-api-docs/rest-api/public-api-endpoints#uiklines
        // console.log(`Updated all pairs for: ${new Date().toISOString()}. Next update in ${loopInterval} minutes`) cant log as we're not awaiting the function

        await new Promise(resolve => setTimeout(resolve, parseInt(loopInterval) * 60 * 1000))
    }
}
