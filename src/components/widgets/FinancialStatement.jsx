import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export function FinancialStatement({ data }) {
    const { statement_type, periods = [], rows = [], currency = 'USD' } = data;
    const title = statement_type?.replace(/_/g, ' ') || 'Financial Statement';

    const formatValue = (val) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(val);
    };

    // Group rows by category if present
    const groups = rows.reduce((acc, row) => {
        const cat = row.category || 'General';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(row);
        return acc;
    }, {});

    return (
        <Card className="w-full overflow-hidden mt-2">
            <CardHeader className="pb-3 border-b border-gray-100/50">
                <CardTitle className="capitalize text-sm font-bold text-gray-700 flex justify-between">
                    <span>{title}</span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase">{currency}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-4 py-2 text-left font-semibold text-gray-500 w-1/3">Line Item</th>
                            {periods.map((period, i) => (
                                <th key={i} className="px-4 py-2 text-right font-semibold text-gray-600">{period}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {Object.entries(groups).map(([category, items], gIdx) => (
                            <React.Fragment key={category}>
                                {category !== 'General' && (
                                    <tr className="bg-gray-50/30">
                                        <td colSpan={periods.length + 1} className="px-4 py-1 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                            {category}
                                        </td>
                                    </tr>
                                )}
                                {items.map((row, idx) => {
                                    const isTotal = row.line_item.toLowerCase().includes('total') || row.line_item.toLowerCase().includes('net income');
                                    return (
                                        <tr key={idx} className={`hover:bg-gray-50/30 ${isTotal ? 'bg-gray-50/50 font-semibold text-blue-900' : ''}`}>
                                            <td className="px-4 py-2 text-gray-900">{row.line_item}</td>
                                            {periods.map((period, i) => (
                                                <td key={i} className="px-4 py-2 text-right text-gray-700 tabular-nums">
                                                    {formatValue(row.values[period])}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}
