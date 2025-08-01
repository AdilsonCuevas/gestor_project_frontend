import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface TaskFilterBarProps {
    filters: {
        status: string;
        priority: string;
        assignedTo: string;
    };
    onChange: (filters: {
        status: string;
        priority: string;
        assignedTo: string;
    }) => void;
}

export default function TaskFilterBar({ filters, onChange }: TaskFilterBarProps) {
    return (
        <div className="flex flex-wrap gap-4 p-4 bg-blue-50 rounded-md shadow-sm">
            <Select onValueChange={(val: any) => onChange({ ...filters, status: val })}>
                <SelectTrigger className="min-w-[150px] bg-white border border-blue-200 shadow-sm">
                    <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in_progress">En progreso</SelectItem>
                    <SelectItem value="review">Revisión</SelectItem>
                    <SelectItem value="done">Hecho</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={(val: any) => onChange({ ...filters, priority: val })}>
                <SelectTrigger className="min-w-[150px] bg-white border border-blue-200 shadow-sm">
                    <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="low">Baja</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
            </Select>

            <Input
                placeholder="Asignado a..."
                className="min-w-[150px] bg-white border border-blue-200 shadow-sm placeholder:text-sm text-sm"
                onChange={(e) => onChange({ ...filters, assignedTo: e.target.value })}
            />
        </div>

    );
}
