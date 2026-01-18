import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export function SectorPerformance({ data }) {
    const { sectors, visualization } = data;

    const chartData = sectors?.map(s => ({
        name: s.sector,
        value: s.return_1d || s.return_ytd || 0
        // Prioritize 1d return for now, but label should indicate which one.
        // In a real app, we might toggle or show multiple.
    })).sort((a, b) => b.value - a.value); // Sort descending

    return (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle>Sector Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis
                            type="category"
                            dataKey="name"
                            width={120}
                            tick={{ fontSize: 11, fill: '#4b5563' }}
                            interval={0}
                        />
                        <Tooltip
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value) => [`${value > 0 ? '+' : ''}${value.toFixed(2)}%`, 'Return']}
                        />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {chartData?.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#16a34a' : '#dc2626'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
