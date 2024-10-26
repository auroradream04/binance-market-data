"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateMarketData } from "@/app/main";
import TradingPairsSelector from "@/components/TradingPairsSelector";
import IntervalSelector from "@/components/IntervalSelector";
import DateSelector from "@/components/DateSelector";
import FileFormatSelector from "@/components/FileFormatSelector";

const INTERVALS = [
    "1s",
    "1m",
    "3m",
    "5m",
    "15m",
    "30m",
    "1h",
    "2h",
    "4h",
    "6h",
    "8h",
    "12h",
    "1d",
    "3d",
    "1w",
    "1mo",
];

type TProps = {
    tradingPairs: string[];
};

export default function Dashboard({ tradingPairs = [] }: TProps) {
    const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
    const [interval, setInterval] = useState(INTERVALS[0]);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [fileFormat, setFileFormat] = useState("CSV");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleSubmit = async () => {
        setIsGenerating(true);
        const startTimestamp = startDate ? startDate.getTime() : undefined;
        const endTimestamp = endDate ? endDate.getTime() : undefined;

        await generateMarketData(
            selectedPairs,
            interval,
            startTimestamp,
            endTimestamp,
            fileFormat
        );
        setIsGenerating(false);
    };

    return (
        <Card className="w-full max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl leading-5">Binance Historical Data Download</CardTitle>
                <CardDescription>
                    Select trading pairs and time range to download historical
                    market data
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <TradingPairsSelector
                    tradingPairs={tradingPairs}
                    selectedPairs={selectedPairs}
                    setSelectedPairs={setSelectedPairs}
                />
                <IntervalSelector
                    interval={interval}
                    setInterval={setInterval}
                    intervals={INTERVALS}
                />
                <div className="grid grid-cols-2 gap-2">
                    <DateSelector
                        date={startDate}
                        setDate={setStartDate}
                        label="Start Date"
                    />
                    <DateSelector
                        date={endDate}
                        setDate={setEndDate}
                        label="End Date"
                    />
                </div>
                <FileFormatSelector
                    fileFormat={fileFormat}
                    setFileFormat={setFileFormat}
                />
            </CardContent>
            <CardFooter>
                <Button
                    disabled={isGenerating}
                    className="w-full"
                    onClick={() => handleSubmit()}
                >
                    Generate Market Data
                </Button>
            </CardFooter>
        </Card>
    );
}
