async function fetchData(url: string) {
    const response = await fetch(url);
    return response.json();
}

export async function getTradingPairs() {
    const data = await fetchData("https://api.binance.com/api/v3/ticker/price");

    const tradingPairs = data.map((item: { symbol: string, price: string }) => item.symbol);
    return tradingPairs;
}

