import { Card } from "@/components/ui/card";

interface Task {
    title: string;
    description?: string;
    priority: string;
    assignedTo: string;
}

export default function TaskCard({ task }: { task: Task }) {
    return (
        <Card className="p-3 shadow-sm bg-white border rounded-md space-y-1">
            <div className="bg-blue-100 p-3 rounded-lg shadow-md flex flex-col gap-1">
                <div className="text-base font-semibold text-blue-900">{task.title}</div>

                <div className="text-sm text-blue-800 break-words line-clamp-3">
                    {task.description || 'Sin descripción'}
                </div>

                <div className="text-xs text-blue-700 mt-1">
                    <span className="font-medium">Prioridad:</span> {task.priority} &nbsp;|&nbsp;
                    <span className="font-medium">Asignado a:</span> {task.assignedTo || 'No asignado'}
                </div>
            </div>
        </Card>
    );
}
