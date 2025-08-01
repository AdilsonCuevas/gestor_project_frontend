'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import type { Task } from './board';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';

interface TaskCalendarViewProps {
    tasks: Task[];
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function TaskCalendarView({ tasks }: TaskCalendarViewProps) {
    const [selectedDate, setSelectedDate] = useState<Value>(new Date());

    const tasksByDate = tasks.reduce((acc: Record<string, Task[]>, task) => {
        if (task.dueDate) {
            const dateKey = format(new Date(task.dueDate), 'yyyy-MM-dd');
            acc[dateKey] = acc[dateKey] || [];
            acc[dateKey].push(task);
        }
        return acc;
    }, {});

    const handleDateChange = (value: Value) => {
        setSelectedDate(value);
    };

    const formatted = selectedDate instanceof Date ? format(selectedDate, 'yyyy-MM-dd') : '';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-blue-50 rounded-lg shadow-sm">

            <div className="bg-white rounded-lg shadow-md p-4">
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    tileClassName={({ date }: { date: Date }) => {
                        const key = format(date, 'yyyy-MM-dd');
                        return tasksByDate[key] ? 'bg-blue-100 text-blue-800 font-semibold rounded-full' : '';
                    }}
                />
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                    Tareas para {selectedDate instanceof Date ? format(selectedDate, 'PPP') : Array.isArray(selectedDate) && selectedDate[0] instanceof Date
                        ? format(selectedDate[0], 'PPP') : 'ninguna fecha seleccionada'}
                </h3>

                {tasksByDate[formatted]?.length ? (
                    tasksByDate[formatted].map((task) => (
                        <Card key={task.id} className="p-4 bg-blue-100 border border-blue-200 rounded-md">
                            <div className="text-base font-semibold text-blue-900 truncate">{task.title}</div>
                            <div className="text-sm text-gray-700 truncate">{task.description}</div>
                            <div className="text-xs text-blue-800 mt-1">
                                Asignado a: <span className="font-medium">{task.assignedTo}</span>
                            </div>
                            <div className="text-xs text-blue-800">
                                Prioridad: <span className="font-medium capitalize">{task.priority}</span>
                            </div>
                        </Card>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No hay tareas para esta fecha.</p>
                )}
            </div>
        </div>

    );
}
