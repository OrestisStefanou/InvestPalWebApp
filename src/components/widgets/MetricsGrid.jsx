import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

export function MetricsGrid({ data }) {
    const { metrics, columns = 2 } = data;

    return (
        <Card className="w-full">
            <CardHeader className="pb-3 border-b border-gray-100/50">
                <CardTitle className="text-base font-semibold text-gray-700 uppercase tracking-wide">Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <div
                    className="grid gap-4"
                    style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
                >
                    {metrics?.map((metric, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                            <p className="text-xs text-gray-500 font-medium truncate mb-1">{metric.label}</p>
                            <p className="font-semibold text-gray-900 tracking-tight">
                                {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                                {metric.change && (
                                    <span className={`ml-2 text-xs ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {metric.change > 0 ? '+' : ''}{metric.change}%
                                    </span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
