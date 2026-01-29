import React from 'react';

export const PaymentInfoSection: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
        
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2 relative z-10">
                <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">3</span>
            Payment Details
        </h2>

        <div className="space-y-6 relative z-10">
            {/* Card Preview/Icon */}
            <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2 border border-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-blue-700 text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                        <path d="M2 10h20" strokeWidth="2" />
                    </svg>
                    Credit Card
                </div>
                <div className="flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 text-sm font-medium hover:border-gray-300 cursor-pointer transition-colors opacity-50">
                    <svg className="w-4 h-4" viewBox="0 0 24 20" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                    PayPal
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Card Number</label>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000" 
                            className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                        />
                         <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.5" />
                            <path d="M2 10h20" strokeWidth="1.5" />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Expiry Date</label>
                         <input 
                            type="text" 
                            placeholder="MM / YY" 
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">CVC</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="123" 
                                maxLength={4}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-center"
                            />
                             <svg className="w-4 h-4 absolute right-3 top-3.5 text-gray-400 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name on Card</label>
                     <input 
                        type="text" 
                        placeholder="e.g. John Doe" 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Payments are secure and encrypted.</span>
            </div>
        </div>
    </div>
  );
};
