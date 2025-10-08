'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContactService, ContactAction } from '@/lib/contactService';

interface AdvocacyProgressProps {
  className?: string;
}

export default function AdvocacyProgress({ className = '' }: AdvocacyProgressProps) {
  const [stats, setStats] = useState(ContactService.getEngagementStats());
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Update stats when component mounts and when localStorage changes
    const updateStats = () => setStats(ContactService.getEngagementStats());

    updateStats();

    // Listen for storage changes (in case multiple tabs are open)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'advocacy_engagements') {
        updateStats();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for updates
    const interval = setInterval(updateStats, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'email': return '✉️';
      case 'letter': return '📮';
      case 'phone': return '📞';
      case 'social': return '📱';
      default: return '💬';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Stats */}
      <div className="border-2 border-black p-6 bg-white">
        <h3 className="text-xl font-black mb-6">YOUR ADVOCACY IMPACT</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-black text-brand-500 mb-2">
              {stats.totalActions}
            </div>
            <div className="text-sm font-medium text-gray-600">
              TOTAL ACTIONS
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-black text-blue-500 mb-2">
              {Object.keys(stats.byMethod).length}
            </div>
            <div className="text-sm font-medium text-gray-600">
              DIFFERENT METHODS
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-black text-green-500 mb-2">
              {stats.byStatus.sent || 0}
            </div>
            <div className="text-sm font-medium text-gray-600">
              MESSAGES SENT
            </div>
          </div>
        </div>
      </div>

      {/* Method Breakdown */}
      <div className="border-2 border-black p-6 bg-white">
        <h3 className="text-lg font-black mb-4">COMMUNICATION METHODS</h3>

        {Object.keys(stats.byMethod).length === 0 ? (
          <p className="text-gray-600 text-center py-4">
            No advocacy actions recorded yet. Start by contacting your representatives!
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.byMethod).map(([method, count]) => (
              <div key={method} className="text-center p-3 border border-gray-200">
                <div className="text-2xl mb-2">{getMethodIcon(method)}</div>
                <div className="font-bold text-lg">{count}</div>
                <div className="text-xs text-gray-600 uppercase">{method}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity Toggle */}
      {stats.recentActivity.length > 0 && (
        <div className="border-2 border-black p-6 bg-white">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full text-left flex items-center justify-between"
          >
            <h3 className="text-lg font-black">RECENT ACTIVITY</h3>
            <span className={`text-xl transition-transform ${showHistory ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-3"
            >
              {stats.recentActivity.map((action) => (
                <div key={action.id} className="border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getMethodIcon(action.method)}</span>
                      <div>
                        <div className="font-medium">
                          {action.template.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          to {action.legislator.name} ({action.legislator.party})
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${getStatusColor(action.status)}`}>
                      {action.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(action.timestamp).toLocaleDateString()} at{' '}
                    {new Date(action.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Call to Action */}
      <div className="border-2 border-brand-500 p-6 bg-brand-50">
        <h3 className="text-lg font-black mb-4 text-brand-800">
          KEEP UP THE GREAT WORK!
        </h3>
        <p className="text-brand-700 mb-4">
          Every message sent helps build momentum for single-stair housing policy reform.
          Your advocacy makes a real difference in North Carolina communities.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500"></span>
            <span>Messages are being delivered to representatives</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-500"></span>
            <span>Your engagement is being tracked and measured</span>
          </div>
        </div>
      </div>
    </div>
  );
}
