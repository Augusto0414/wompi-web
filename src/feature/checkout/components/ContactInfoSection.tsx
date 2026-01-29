import React from 'react';

export const ContactInfoSection: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-black text-white text-xs flex items-center justify-center">1</span>
            Contact Information
        </h2>
        <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
                type="email" 
                placeholder="you@example.com" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none" 
            />
        </div>
    </div>
  );
};
