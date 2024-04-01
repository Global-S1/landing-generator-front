'use client'

import { useState } from "react";

interface Props {
    title: string;
    description: string;
}

export const GoalItem = (goal: Props) => {

    const [isOver, setIsOver] = useState(false)

    const handleMouseOver = () => {
        setIsOver(true)
    }

    const handleMouseLeave = () => {
        setIsOver(false)
    }

    return (
        <div
            className="bg-slate-200 p-2 rounded-md hover:bg-slate-300 transition-all cursor-pointer relative"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <input id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label form="default-radio-2" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">{goal.title}</label>

            {
                isOver &&
                <div className="bg-slate-600 text-white p-2 rounded-md transition-all absolute z-10">
                    {goal.description}
                </div>
            }
        </div>
    )
}
