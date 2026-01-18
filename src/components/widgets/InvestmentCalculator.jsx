import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export function InvestmentCalculator({ data }) {
    const { initial_investment, annual_return, years, projections } = data;

    const finalValue = projections && projections.length > 0 ? projections[projections.length - 1].value : 0;
    const totalGain = finalValue - (projections ? projections[projections.length - 1].contributions : initial_investment);

    return (
        <Card className="w-full">
            <CardHeader className="pb-0">
                <CardTitle>Investment Growth</CardTitle>
                <CardDescription>
                    Starting with ${initial_investment.toLocaleString()}, growing at {annual_return}% for {years} years.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-600 font-medium uppercase">projected value</p>
                        <p className="text-xl font-bold text-blue-900">${Math.round(finalValue).toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-xs text-green-600 font-medium uppercase">total earnings</p>
                        <p className="text-xl font-bold text-green-900">+${Math.round(totalGain).toLocaleString()}</p>
                    </div>
                </div>

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={projections} margin={{ left: 10, right: 10 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis
                                hide
                            // axisLine={false} tickLine={false} tick={{fontSize: 12}} 
                            // tickFormatter={(val) => `$${val/1000}k`}
                            />
                            <Tooltip
                                formatter={(val) => `$${Math.round(val).toLocaleString()}`}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend verticalAlign="top" height={36} />
                            <Area
                                name="Total Value"
                                type="monotone"
                                dataKey="value"
                                stroke="#3b82f6"
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                strokeWidth={2}
                            />
                            <Area
                                name="Principal"
                                type="monotone"
                                dataKey="contributions"
                                stroke="#9ca3af"
                                fill="transparent"
                                strokeDasharray="5 5"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
