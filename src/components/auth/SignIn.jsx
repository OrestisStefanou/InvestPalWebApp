import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { MessageSquare } from 'lucide-react';

export function SignIn({ onLoginSuccess, onLoginError }) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-blue-600 p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                        <MessageSquare className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">InvestPal</h1>
                        <p className="text-gray-500 font-medium mt-2">Your AI Financial Companion</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Sign in to access personalized market insights and track your portfolio.
                    </p>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={onLoginSuccess}
                            onError={onLoginError}
                            useOneTap
                            shape="pill"
                            size="large"
                            text="card_with_icon"
                            width="300"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                        By signing in, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
