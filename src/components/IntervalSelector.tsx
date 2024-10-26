import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

type IntervalSelectorProps = {
    interval: string;
    setInterval: Dispatch<SetStateAction<string>>;
    intervals: string[];
};

export default function IntervalSelector({ interval, setInterval, intervals }: IntervalSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">Interval</label>
            <Select value={interval} onValueChange={(value) => setInterval(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                    {intervals.map((int) => (
                        <SelectItem key={int} value={int}>
                            {int}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
