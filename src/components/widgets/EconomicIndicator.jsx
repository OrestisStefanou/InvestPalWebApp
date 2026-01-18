import { Card, CardContent } from "../ui/Card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function EconomicIndicator({ data }) {
    const { indicator_name, current_value, previous_value, trend, as_of_date } = data;

    const TrendIcon = {
        up: TrendingUp,
        down: TrendingDown,
        stable: Minus
    }[trend] || Minus;

    const trendColor = {
        up: "text-green-600",
        down: "text-red-600",
        stable: "text-gray-500"
    }[trend] || "text-gray-500";

    return (
        <Card className="w-full max-w-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{indicator_name}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                            <h3 className="text-2xl font-bold">{current_value.toLocaleString()}</h3>
                            <span className={`flex items-center text-xs font-medium ${trendColor}`}>
                                <TrendIcon className="w-3 h-3 mr-1" />
                                {trend.toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-gray-400">Previous</p>
                        <p className="text-sm font-medium text-gray-600">{previous_value.toLocaleString()}</p>
                    </div>
                </div>
                {as_of_date && (
                    <p className="text-[10px] text-gray-400 mt-4 text-right">As of {as_of_date}</p>
                )}
            </CardContent>
        </Card>
    );
}
