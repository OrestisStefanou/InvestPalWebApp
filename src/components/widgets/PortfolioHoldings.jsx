import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export function PortfolioHoldings({ data }) {
    const { holdings = [], total_value } = data;

    // Colors for the donut chart
    const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#e0f2fe'];

    const chartData = holdings?.map(h => ({
        name: h.symbol,
        value: h.value || (h.weight * total_value) // Fallback if value not explicitly provided but weight is
    })).filter(h => h.value > 0).slice(0, 6); // Top 6 for chart

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center">
                    <span>Portfolio Breakdown</span>
                    <span className="text-lg font-bold text-green-700 bg-green-50 px-3 py-1 rounded-lg">
                        ${total_value?.toLocaleString()}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-6 mt-4">
                    {/* Chart Section */}
                    <div className="w-full md:w-1/3 h-48 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value) => `$${value.toLocaleString()}`}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-xs text-gray-400 font-medium">Holdings</span>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="w-full md:w-2/3 overflow-hidden rounded-lg border border-gray-100">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Shares</th>
                                    <th className="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {holdings?.map((holding, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50">
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <div className="flex flex-col">
                                                <span>{holding.symbol}</span>
                                                <span className="text-[10px] text-gray-400 font-normal">
                                                    {holding.sector || holding.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm text-right text-gray-500">
                                            {holding.shares?.toLocaleString() || '-'}
                                        </td>
                                        <td className="px-2 py-2 whitespace-nowrap text-sm text-right text-gray-500">
                                            {(holding.weight)?.toFixed(1)}%
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                                            ${holding.value?.toLocaleString() || (holding.weight / 100 * total_value).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {data.as_of_date && (
                    <div className="mt-4 pt-2 border-t border-gray-50 flex justify-end">
                        <span className="text-[10px] text-gray-400 italic">As of {data.as_of_date}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
