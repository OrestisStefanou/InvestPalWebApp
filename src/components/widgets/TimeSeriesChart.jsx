import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export function TimeSeriesChart({ data }) {
    const { series, chart_type } = data;

    // Assuming single series for MVP, but adaptable
    const primarySeries = series?.[0] || { data: [], name: 'Value' };
    const sortedData = [...(primarySeries.data || [])].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const isPositive = sortedData.length > 1 && sortedData[sortedData.length - 1].value >= sortedData[0].value;
    const color = primarySeries.color || (isPositive ? '#16a34a' : '#dc2626'); // Green or Red default

    return (
        <Card className="w-full">
            <CardHeader className="pb-0">
                <CardTitle className="flex justify-between items-center">
                    <span>{primarySeries.name}</span>
                    {sortedData.length > 0 && (
                        <span className={`text-xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            ${sortedData[sortedData.length - 1].value.toLocaleString()}
                        </span>
                    )}
                </CardTitle>
                <CardDescription>
                    Historical Performance
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sortedData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(str) => format(new Date(str), 'MMM d')}
                            stroke="#9ca3af"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tickFormatter={(val) => `$${val}`}
                            stroke="#9ca3af"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            labelFormatter={(label) => format(new Date(label), 'MMM d, yyyy')}
                            formatter={(value) => [`$${value.toLocaleString()}`, primarySeries.name]}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
