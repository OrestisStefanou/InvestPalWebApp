import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export function FinancialStatement({ data }) {
    const { statement_type, periods, rows } = data;
    const title = statement_type?.replace(/_/g, ' ') || 'Financial Statement';

    return (
        <Card className="w-full overflow-hidden mt-2">
            <CardHeader className="pb-3 border-b border-gray-100/50">
                <CardTitle className="capitalize text-sm font-bold text-gray-700">{title}</CardTitle>
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
                        {rows.map((row, idx) => {
                            const isTotal = row.line_item.toLowerCase().includes('total') || row.line_item.toLowerCase().includes('net income');
                            return (
                                <tr key={idx} className={`hover:bg-gray-50/30 ${isTotal ? 'bg-gray-50/50 font-semibold' : ''}`}>
                                    <td className="px-4 py-2 text-gray-900">{row.line_item}</td>
                                    {periods.map((period, i) => (
                                        <td key={i} className="px-4 py-2 text-right text-gray-700 tabular-nums">
                                            {row.values[period]?.toLocaleString()}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}
