import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export function ComparisonTable({ data }) {
    const { entities = [], rows = [], comparison_type } = data;

    return (
        <Card className="w-full overflow-hidden">
            <CardHeader className="bg-gray-50/50 pb-4 border-b border-gray-100">
                <CardTitle className="capitalize text-base">
                    {comparison_type ? `${comparison_type.replace('_', ' ')} Comparison` : 'Comparison'}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-3 font-medium">Metric</th>
                            {entities.map((entity, i) => (
                                <th key={i} className="px-6 py-3 font-semibold text-gray-700">{entity}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rows.map((row, idx) => {
                            const formatValue = (val, format) => {
                                if (val === null || val === undefined) return '-';
                                if (format === 'currency') return `$${val.toLocaleString()}`;
                                if (format === 'percentage') return `${val}%`;
                                return typeof val === 'number' ? val.toLocaleString() : val;
                            };

                            return (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-3 font-medium text-gray-900 border-r border-gray-50 bg-white sticky left-0">{row.metric}</td>
                                    {entities.map((entity, i) => (
                                        <td key={i} className="px-6 py-3 text-gray-600">
                                            {formatValue(row.values[entity], row.format)}
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
