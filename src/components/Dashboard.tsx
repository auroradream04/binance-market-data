'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronsUpDown, Check } from "lucide-react"
import { generateMarketData } from '@/app/main'

const INTERVALS = ["1s", "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1mo"]

type TProps = {
    tradingPairs: string[]
}

export default function Dashboard({ tradingPairs = [] }: TProps) {
  const [selectedPairs, setSelectedPairs] = useState<string[]>([])
  const [filteredPairs, setFilteredPairs] = useState<string[]>(tradingPairs)
  // const [selectedPairs, setSelectedPairs] = useState<string[]>(["BTCUSDT"]) // Development
  const [interval, setInterval] = useState(INTERVALS[0])
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [selectAll, setSelectAll] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    console.log("Trading pairs in Dashboard:", tradingPairs);
    console.log("Trading pairs length:", tradingPairs.length);
  }, [tradingPairs]);

  useEffect(() => {
    if (selectAll) {
      setSelectedPairs(tradingPairs)
    } else {
      setSelectedPairs([])
    }
  }, [selectAll, tradingPairs])

  useEffect(() => {
    setFilteredPairs(tradingPairs.filter(pair => 
      pair.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }, [searchTerm])

  const handleSubmit = async () => {
    setIsGenerating(true);
    const startTimestamp = startDate ? startDate.getTime() : undefined
    const endTimestamp = endDate ? endDate.getTime() : undefined

    await generateMarketData(selectedPairs, interval, startTimestamp, endTimestamp)
    setIsGenerating(false);
  }

  // const filteredPairs = useMemo(() => {
  //   console.log("Filtering pairs, current tradingPairs:", tradingPairs);
  //   return (tradingPairs || []).filter(pair => 
  //     pair.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // }, [searchTerm])

  useEffect(() => {

  })

  if (!Array.isArray(tradingPairs)) {
    console.error("tradingPairs is not an array:", tradingPairs);
    return <div>Error: Trading pairs data is invalid</div>;
  }

  const handleSelectPair = (pair: string) => {
    setSelectedPairs(current => 
      current.includes(pair) 
        ? current.filter(p => p !== pair)
        : [...current, pair]
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Binance Historical Data Download</CardTitle>
        <CardDescription>Select trading pairs and time range to download historical market data</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Trading Pairs</label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="selectAll"
              checked={selectAll}
              onCheckedChange={(checked) => setSelectAll(checked as boolean)}
            />
            <label htmlFor="selectAll" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                <CommandInput placeholder="Search trading pair..." onValueChange={setSearchTerm} />
                <CommandEmpty>No trading pair found.</CommandEmpty>
                <CommandList>
                <CommandGroup>
                  <ScrollArea className="h-72">
                    {filteredPairs && filteredPairs.length > 0 ? (
                      filteredPairs.map((pair) => (
                        <CommandItem
                          key={pair}
                          onSelect={() => handleSelectPair(pair)}
                        >
                          <Checkbox
                            checked={selectedPairs.includes(pair)}
                            className="mr-2"
                          />
                          {pair}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedPairs.includes(pair) ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))
                    ) : (
                      <CommandItem>No trading pairs available</CommandItem>
                    )}
                  </ScrollArea>
                </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Interval</label>
          <Select value={interval} onValueChange={setInterval}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              {INTERVALS.map((int) => (
                <SelectItem key={int} value={int}>
                  {int}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-parent-width-full">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="popover-parent-width-full">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={isGenerating} className="w-full" onClick={() => handleSubmit()}>Generate Market Data</Button>
      </CardFooter>
    </Card>
  )
}

