import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type TradingPairsSelectorProps = {
    tradingPairs: string[];
    selectedPairs: string[];
    setSelectedPairs: Dispatch<SetStateAction<string[]>>;
};

const BASE_CURRENCIES = ["ALL", "USDT", "BTC", "ETH"];

export default function TradingPairsSelector({
    tradingPairs,
    selectedPairs,
    setSelectedPairs,
}: TradingPairsSelectorProps) {
    const [filteredPairs, setFilteredPairs] = useState<string[]>(tradingPairs);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [open, setOpen] = useState(false);
    const [baseCurrency, setBaseCurrency] = useState(BASE_CURRENCIES[0]);

    useEffect(() => {
        let filtered = tradingPairs;

        if (baseCurrency !== "ALL") {
            filtered = filtered.filter((pair) => pair.endsWith(baseCurrency));
        }

        if (searchTerm) {
            filtered = filtered.filter((pair) =>
                pair.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPairs(filtered);

        if (selectAll) {
            setSelectedPairs(filtered);
        } else {
            setSelectedPairs([]);
        }
    }, [searchTerm, tradingPairs, baseCurrency, selectAll]);

    const handleSelectPair = (pair: string) => {
        setSelectedPairs((current) =>
            current.includes(pair)
                ? current.filter((p) => p !== pair)
                : [...current, pair]
        );
    };

    return (
        <div className="space-y-2 col-span-2">
            <div className="space-y-2">
                <label className="text-sm font-medium">Base Currency</label>
                <Select value={baseCurrency} onValueChange={setBaseCurrency}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select base currency" />
                    </SelectTrigger>
                    <SelectContent>
                        {BASE_CURRENCIES.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                                {currency}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

<div className="space-y-2 pt-2">
            <label className="text-sm font-medium">Trading Pairs</label>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id="selectAll"
                    checked={selectAll}
                    onCheckedChange={(checked) =>
                        setSelectAll(checked as boolean)
                    }
                />
                <label
                    htmlFor="selectAll"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Select All
                </label>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {selectedPairs.length > 0
                            ? `${selectedPairs.length} pairs selected`
                            : "Select trading pairs"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto popover-content-width-full p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search trading pair..."
                            onValueChange={setSearchTerm}
                        />
                        <CommandEmpty>No trading pair found.</CommandEmpty>
                        <CommandList>
                            <CommandGroup>
                                <ScrollArea className="h-72">
                                    {filteredPairs &&
                                    filteredPairs.length > 0 ? (
                                        filteredPairs.map((pair) => (
                                            <CommandItem
                                                key={pair}
                                                onSelect={() =>
                                                    handleSelectPair(pair)
                                                }
                                            >
                                                <Checkbox
                                                    checked={selectedPairs.includes(
                                                        pair
                                                    )}
                                                    className="mr-2"
                                                />
                                                {pair}
                                                <Check
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        selectedPairs.includes(
                                                            pair
                                                        )
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))
                                    ) : (
                                        <CommandItem>
                                            No trading pairs available
                                        </CommandItem>
                                    )}
                                </ScrollArea>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            </div>
        </div>
    );
}
