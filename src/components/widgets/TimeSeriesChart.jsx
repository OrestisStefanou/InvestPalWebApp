import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { safeFormatDate } from "../../lib/utils";

export function TimeSeriesChart({ data }) {
    const { series, chart_type, x_axis_label, y_axis_label, date_range, format: yAxisFormat } = data;

    // Assuming single series for MVP, but adaptable
    const primarySeries = series?.[0] || { data: [], name: 'Value' };

    // Defensive sorting: prevent crashes if timestamp is invalid. 
    // Only sort if all data points have valid date timestamps.
    const allValidDates = (primarySeries.data || []).every(item => !isNaN(new Date(item.timestamp).getTime()));

    const sortedData = allValidDates
        ? [...(primarySeries.data || [])].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        : [...(primarySeries.data || [])];

    const isPositive = sortedData.length > 1 && sortedData[sortedData.length - 1].value >= sortedData[0].value;
    const color = primarySeries.color || (isPositive ? '#16a34a' : '#dc2626'); // Green or Red default

    const formatYAxis = (val) => {
        if (yAxisFormat === 'currency') return `$${val.toLocaleString()}`;
        if (yAxisFormat === 'percentage') return `${val}%`;
        return val.toLocaleString();
    };

    return (
        <Card className="w-full">
            <CardHeader className="pb-0">
                <CardTitle className="flex justify-between items-center">
                    <span>{primarySeries.name}</span>
                    {sortedData.length > 0 && (
                        <span className={`text-xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {formatYAxis(sortedData[sortedData.length - 1].value)}
                        </span>
                    )}
                </CardTitle>
                <CardDescription className="flex justify-between items-center">
                    <span>Historical Performance</span>
                    {date_range && <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-medium">{date_range}</span>}
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sortedData} margin={{ left: -20, right: 10 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="timestamp"
                            tickFormatter={(str) => safeFormatDate(str, format, 'MMM d')}
                            stroke="#9ca3af"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            label={x_axis_label ? { value: x_axis_label, position: 'insideBottom', offset: -5, fontSize: 10 } : null}
                        />
                        <YAxis
                            domain={['auto', 'auto']}
                            tickFormatter={formatYAxis}
                            stroke="#9ca3af"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            label={y_axis_label ? { value: y_axis_label, angle: -90, position: 'insideLeft', offset: 10, fontSize: 10 } : null}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            labelFormatter={(label) => safeFormatDate(label, format, 'MMM d, yyyy')}
                            formatter={(value) => [formatYAxis(value), primarySeries.name]}
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
