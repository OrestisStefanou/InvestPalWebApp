import React from 'react';
import { AlertCircle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 my-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-sm">Failed to render component</h3>
                        <p className="text-xs mt-1 text-red-600 opacity-90 leading-relaxed">
                            Something went wrong while displaying this part of the conversation.
                            {process.env.NODE_ENV === 'development' && <span className="block mt-2 font-mono bg-red-100/50 p-2 rounded">{this.state.error?.toString()}</span>}
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
