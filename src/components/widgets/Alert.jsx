import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { cn } from "../../lib/utils";

export function Alert({ data }) {
    const { message, severity = "info", actionable, action_label } = data;

    const styles = {
        info: "bg-blue-50 text-blue-700 border-blue-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
        success: "bg-green-50 text-green-700 border-green-200",
        error: "bg-red-50 text-red-700 border-red-200",
    };

    const icons = {
        info: <Info className="w-5 h-5 flex-shrink-0" />,
        warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
        success: <CheckCircle className="w-5 h-5 flex-shrink-0" />,
        error: <XCircle className="w-5 h-5 flex-shrink-0" />,
    };

    return (
        <div className={cn("p-4 rounded-lg border flex items-start gap-3 my-2", styles[severity] || styles.info)}>
            {icons[severity] || icons.info}
            <div className="flex-1 text-sm font-medium">
                {message}
            </div>
            {actionable && (
                <button
                    onClick={() => data.action_payload && window.dispatchEvent(new CustomEvent('alert-action', { detail: data.action_payload }))}
                    className="text-xs font-bold underline decoration-2 underline-offset-2 hover:opacity-80"
                >
                    {action_label || "View"}
                </button>
            )}
        </div>
    );
}
