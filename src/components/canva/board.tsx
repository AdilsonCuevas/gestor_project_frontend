'use client';

import { useState } from "react";
import TaskCard from "./Card";
import TaskFilterBar from "./filter";
import TaskCalendarView from "./TaskCalendar";

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in_progress' | 'review' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignedTo: string;
    active: boolean;
    dueDate?: string;
}

const columns = ['todo', 'in_progress', 'review', 'done'] as const;

// Colores por estado
const columnColors: Record<string, string> = {
    todo: 'bg-blue-100',
    in_progress: 'bg-yellow-100',
    review: 'bg-purple-100',
    done: 'bg-green-100',
};

interface TaskBoardProps {
    tasks: Task[];
    onTaskSelect?: (task: Task) => void;
    selectedTask?: Task | null;
}

export default function TaskBoard({ tasks, onTaskSelect, selectedTask }: TaskBoardProps) {
    const [filters, setFilters] = useState({
        status: '',
        priority: '',
        assignedTo: '',
    });

    const filteredTasks = Array.isArray(tasks)
        ? tasks.filter((task) => {
            const matchStatus = filters.status ? task.status === filters.status : true;
            const matchPriority = filters.priority ? task.priority === filters.priority : true;
            const matchAssigned = filters.assignedTo
                ? task.assignedTo.toLowerCase().includes(filters.assignedTo.toLowerCase())
                : true;

            return matchStatus && matchPriority && matchAssigned;
        })
        : [];

    const tasksByColumn: Record<typeof columns[number], Task[]> = {
        todo: [],
        in_progress: [],
        review: [],
        done: [],
    };

    filteredTasks.forEach((task) => {
        tasksByColumn[task.status].push(task);
    });

    return (
        <div className="space-y-6 bg-blue-50 text-blue-900 min-h-screen p-4 sm:p-6 md:p-8">
            <TaskFilterBar filters={filters} onChange={setFilters} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {columns.map((col) => (
                    <div
                        key={col}
                        className={`${columnColors[col]} rounded-lg p-4 min-h-[300px] shadow-sm transition-all`}
                    >
                        <h2 className="font-bold text-center text-lg capitalize mb-3">
                            {col.replace('_', ' ')}
                        </h2>
                        <div className="space-y-2">
                            {tasksByColumn[col].map((task) => (
                                <div
                                    key={task.id}
                                    className={`cursor-pointer ${selectedTask?.id === task.id
                                        ? 'ring-2 ring-blue-500 rounded-md'
                                        : ''
                                        }`}
                                    onClick={() => onTaskSelect?.(task)}
                                >
                                    <TaskCard task={task} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Vista Calendario</h2>
                <TaskCalendarView tasks={filteredTasks} />
            </div>
        </div>
    );
}
