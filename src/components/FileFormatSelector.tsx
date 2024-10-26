import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FileFormatSelectorProps = {
    fileFormat: string;
    setFileFormat: (format: string) => void;
};

const FILE_FORMATS = ["CSV", "XLSX"];

export default function FileFormatSelector({ fileFormat, setFileFormat }: FileFormatSelectorProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium">File Format</label>
            <Select value={fileFormat} onValueChange={setFileFormat}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select file format" />
                </SelectTrigger>
                <SelectContent>
                    {FILE_FORMATS.map((format) => (
                        <SelectItem key={format} value={format}>
                            {format}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
