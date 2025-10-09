'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RepresentativeLookupService,
  RepresentativeLookupResult,
  Legislator,
  MessageTemplateService,
  MessageTemplate,
  GeocodingService,
} from '@/lib/representativeLookup';
import { ContactService, ContactResult } from '@/lib/contactService';

interface RepresentativeLookupProps {
  className?: string;
}

export default function RepresentativeLookup({ className = '' }: RepresentativeLookupProps) {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState<RepresentativeLookupResult | null>(null);
  const [selectedLegislator, setSelectedLegislator] = useState<Legislator | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [contactResult, setContactResult] = useState<ContactResult | null>(null);
  const [suggestions, setSuggestions] = useState<{ label: string; value: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const closeSuggestionsTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (!address || address.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsSuggesting(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    setIsSuggesting(true);
    const id = window.setTimeout(async () => {
      const results = await GeocodingService.suggestAddresses(address);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setActiveSuggestionIndex(-1);
      setIsSuggesting(false);
    }, 250);

    return () => window.clearTimeout(id);
  }, [address]);

  const handleSelectSuggestion = (value: string) => {
    setAddress(value);
    setShowSuggestions(false);
  };

  const handleAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (activeSuggestionIndex >= 0) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[activeSuggestionIndex].value);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address.trim()) return;

    setIsLoading(true);
    setLookupResult(null);
    setSelectedLegislator(null);
    setSelectedTemplate(null);

    try {
      const result = await RepresentativeLookupService.lookupRepresentatives(address);
      setLookupResult(result);
    } catch (error) {
      console.error('Lookup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPositionColor = (position?: string) => {
    switch (position) {
      case 'strong_support': return 'bg-green-100 text-green-800 border-green-200';
      case 'support': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'neutral': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'oppose': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'strong_oppose': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPositionLabel = (position?: string) => {
    switch (position) {
      case 'strong_support': return 'Strongly Supports';
      case 'support': return 'Supports';
      case 'neutral': return 'Neutral/Unknown';
      case 'oppose': return 'Opposes';
      case 'strong_oppose': return 'Strongly Opposes';
      default: return 'Position Unknown';
    }
  };

  const templates = MessageTemplateService.getTemplates();

  const handleSendMessage = async () => {
    if (!selectedLegislator || !selectedTemplate || !userName || !userEmail) return;

    setIsSending(true);
    setContactResult(null);

    try {
      const personalizedMessage = MessageTemplateService.formatTemplate(
        selectedTemplate,
        userName,
        selectedLegislator.name,
        selectedLegislator.district,
        lookupResult?.address.city || ''
      );

      const result = await ContactService.sendEmail(
        selectedLegislator,
        selectedTemplate,
        personalizedMessage,
        userName,
        userEmail
      );

      setContactResult(result);

      if (result.success) {
        // Track the engagement
        await ContactService.trackEngagement({
          userName,
          userEmail,
          legislator: selectedLegislator,
          template: selectedTemplate,
          message: personalizedMessage,
          method: 'email',
          status: 'sent',
        });
      }
    } catch (error) {
      setContactResult({
        success: false,
        error: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyMessage = () => {
    if (!selectedLegislator || !selectedTemplate || !userName) return;

    const personalizedMessage = MessageTemplateService.formatTemplate(
      selectedTemplate,
      userName,
      selectedLegislator.name,
      selectedLegislator.district,
      lookupResult?.address.city || ''
    );

    navigator.clipboard.writeText(personalizedMessage);
    // You could add a toast notification here
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Address Input Form */}
      <div className="border border-border-primary p-8 shadow-soft bg-surface-primary">
        <h3 className="text-xl font-black mb-6">FIND YOUR DISTRICT</h3>
        <form onSubmit={handleLookup} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">
                YOUR NAME
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full p-3 border-2 border-black focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                YOUR EMAIL
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full p-3 border-2 border-black focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-bold mb-2">
              YOUR ADDRESS
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={handleAddressKeyDown}
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => {
                // Delay closing so click can register
                closeSuggestionsTimeout.current = window.setTimeout(() => setShowSuggestions(false), 120);
              }}
              placeholder="123 Main St, Charlotte, NC 28202"
              className="w-full p-3 border-2 border-black focus:outline-none"
              required
            />
            {showSuggestions && (
              <div
                className="absolute z-20 left-0 right-0 mt-1 border-2 border-black bg-white max-h-64 overflow-auto shadow-soft"
                role="listbox"
                aria-label="Address suggestions limited to North Carolina"
                onMouseDown={(e) => {
                  // Prevent input blur before click selects
                  if (closeSuggestionsTimeout.current) {
                    window.clearTimeout(closeSuggestionsTimeout.current);
                    closeSuggestionsTimeout.current = null;
                  }
                  e.preventDefault();
                }}
              >
                {isSuggesting && (
                  <div className="px-3 py-2 text-sm text-gray-600">Searching addresses…</div>
                )}
                {!isSuggesting && suggestions.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-600">No matches in North Carolina</div>
                )}
                {suggestions.map((s, idx) => (
                  <button
                    key={`${s.value}-${idx}`}
                    type="button"
                    role="option"
                    aria-selected={activeSuggestionIndex === idx}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      activeSuggestionIndex === idx ? 'bg-gray-100' : ''
                    }`}
                    onMouseEnter={() => setActiveSuggestionIndex(idx)}
                    onClick={() => handleSelectSuggestion(s.value)}
                  >
                    {s.label}
                  </button>
                ))}
                <div className="px-3 py-2 text-xs text-gray-500 border-t">North Carolina addresses only</div>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading || !address.trim() || !userName.trim() || !userEmail.trim()}
            className="w-full bg-black text-white hover:bg-gray-800 py-3 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
                <span>FINDING REPRESENTATIVES...</span>
              </div>
            ) : (
              'FIND MY REPRESENTATIVES'
            )}
          </button>
        </form>
      </div>

      {/* Results */}
      <AnimatePresence>
        {lookupResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Address Confirmation */}
            <div className="border-2 border-black p-6 bg-white">
              <h3 className="text-lg font-black mb-4">ADDRESS CONFIRMED</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-bold">Street:</span> {lookupResult.address.street}</p>
                <p><span className="font-bold">City:</span> {lookupResult.address.city}</p>
                <p><span className="font-bold">State:</span> {lookupResult.address.state}</p>
                <p><span className="font-bold">ZIP:</span> {lookupResult.address.zipCode}</p>
              </div>
            </div>

            {/* Representatives */}
            <div className="border-2 border-black p-6 bg-white">
              <h3 className="text-lg font-black mb-4">
                YOUR REPRESENTATIVES ({lookupResult.legislators.length})
              </h3>

              {lookupResult.legislators.length === 0 ? (
                <p className="text-gray-600">No representatives found for this address.</p>
              ) : (
                <div className="space-y-4">
                  {lookupResult.legislators.map((legislator) => (
                    <motion.div
                      key={legislator.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`border-2 border-black p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedLegislator?.id === legislator.id ? 'bg-brand-50 border-brand-500' : ''
                      }`}
                      onClick={() => setSelectedLegislator(legislator)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-bold text-lg">{legislator.name}</h4>
                            <span className={`px-2 py-1 text-xs font-bold border ${
                              legislator.party === 'D' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              legislator.party === 'R' ? 'bg-red-100 text-red-800 border-red-200' :
                              'bg-gray-100 text-gray-800 border-gray-200'
                            }`}>
                              {legislator.party}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {legislator.title} - {legislator.district}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium border ${getPositionColor(legislator.singleStairPosition)}`}>
                              {getPositionLabel(legislator.singleStairPosition)}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium ${
                              legislator.priority >= 4 ? 'bg-green-100 text-green-800' :
                              legislator.priority >= 2 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              Priority: {legislator.priority}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Templates */}
            {selectedLegislator && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-black p-6 bg-white"
              >
                <h3 className="text-lg font-black mb-4">CHOOSE A MESSAGE TEMPLATE</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`border-2 border-black p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedTemplate?.id === template.id ? 'bg-brand-50 border-brand-500' : ''
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <h4 className="font-bold mb-2">{template.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{template.subject}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium ${
                          template.category === 'email' ? 'bg-blue-100 text-blue-800' :
                          template.category === 'letter' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {template.category}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium ${
                          template.tone === 'formal' ? 'bg-gray-100 text-gray-800' :
                          template.tone === 'personal' ? 'bg-pink-100 text-pink-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {template.tone}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedTemplate && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 pt-6 border-t-2 border-black"
                  >
                    <h4 className="font-bold mb-4">PREVIEW MESSAGE</h4>
                    <div className="bg-gray-50 p-4 border border-gray-200 mb-4">
                      <p className="text-sm font-medium mb-2">Subject: {selectedTemplate.subject}</p>
                      <div className="text-sm whitespace-pre-wrap">
                        {MessageTemplateService.formatTemplate(
                          selectedTemplate,
                          userName,
                          selectedLegislator.name,
                          selectedLegislator.district,
                          lookupResult.address.city
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleSendMessage}
                        disabled={isSending || !userEmail.trim()}
                        className="flex-1 bg-black text-white hover:bg-gray-800 py-3 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSending ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></div>
                            <span>SENDING...</span>
                          </div>
                        ) : (
                          'SEND EMAIL'
                        )}
                      </button>
                      <button
                        onClick={handleCopyMessage}
                        className="flex-1 border-2 border-black text-black hover:bg-black hover:text-white py-3 font-bold transition-colors"
                      >
                        COPY MESSAGE
                      </button>
                    </div>

                    {/* Contact Result */}
                    {contactResult && (
                      <div className={`p-3 border-2 ${
                        contactResult.success
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                      }`}>
                        {contactResult.success ? (
                          <div>
                            <p className="font-bold">✓ Message Sent Successfully!</p>
                            {contactResult.trackingUrl && (
                              <p className="text-sm mt-1">
                                Track: <span className="font-mono">{contactResult.trackingUrl}</span>
                              </p>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="font-bold">✗ Send Failed</p>
                            <p className="text-sm mt-1">{contactResult.error}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Error Display */}
            {lookupResult && !lookupResult.success && lookupResult.error && (
              <div className="border-2 border-red-500 p-4 bg-red-50">
                <p className="text-red-800 font-bold">Error:</p>
                <p className="text-red-700">{lookupResult.error}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
