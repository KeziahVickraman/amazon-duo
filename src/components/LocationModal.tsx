import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

const PRESET_SINGAPORE_AREAS = [
  { label: 'Orchard', postal: '238801' },
  { label: 'Marina Bay', postal: '018956' },
  { label: 'Tampines', postal: '529510' },
  { label: 'Jurong East', postal: '609602' },
];

interface LocationModalProps {
  open: boolean;
  currentPostal: string;
  onClose: () => void;
  onSelectLocation: (label: string, postal: string) => void;
}

export function LocationModal({
  open,
  currentPostal,
  onClose,
  onSelectLocation,
}: LocationModalProps) {
  const [postalInput, setPostalInput] = useState(currentPostal);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = postalInput.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setError('Please enter a valid 6-digit Singapore postal code.');
      return;
    }
    setError('');
    onSelectLocation('Singapore', cleaned);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Choose your location"
    >
      <div
        className="w-full max-w-[400px] bg-white rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#f0f2f2] px-5 py-3.5 border-b border-[#d5d9d9] flex items-center justify-between">
          <h2 className="font-display text-[15px] font-bold text-[#0f1111]">
            Choose your location
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close location modal"
            className="p-1 rounded hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4 text-[#565959]" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-[13px]">
          <p className="text-[#565959] leading-relaxed">
            Delivery options and delivery speeds may vary for different Singapore
            postal codes.
          </p>

          <div className="space-y-2">
            <div className="font-semibold text-[#0f1111]">
              Quick-select Singapore neighbourhood
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_SINGAPORE_AREAS.map((area) => {
                const active = currentPostal === area.postal;
                return (
                  <button
                    key={area.postal}
                    type="button"
                    onClick={() => {
                      onSelectLocation(area.label, area.postal);
                      onClose();
                    }}
                    className={`p-2.5 rounded-md border text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-[#e77600] bg-[#fefaf6] ring-1 ring-[#e77600]'
                        : 'border-[#d5d9d9] hover:border-[#888c8c]'
                    }`}
                  >
                    <div className="font-bold text-[#0f1111] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#007185]" />
                      <span>{area.label}</span>
                    </div>
                    <div className="text-[12px] text-[#565959] tabular-nums pl-4">
                      Singapore {area.postal}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative py-1 flex items-center">
            <div className="flex-1 border-t border-[#e7e7e7]" />
            <span className="px-2 text-[11px] text-[#565959]">
              or enter a Singapore postal code
            </span>
            <div className="flex-1 border-t border-[#e7e7e7]" />
          </div>

          <form onSubmit={handleApply} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={postalInput}
                onChange={(e) => {
                  setPostalInput(e.target.value);
                  setError('');
                }}
                placeholder="e.g. 238801"
                aria-label="Singapore postal code"
                className="flex-1 h-[36px] px-3 border border-[#888c8c] rounded-[4px] text-[13px] tabular-nums focus:outline-none focus:border-[#007185]"
              />
              <button
                type="submit"
                className="px-4 h-[36px] rounded-[7px] border border-[#d5d9d9] bg-white hover:bg-[#f7fafa] text-[13px] font-medium shadow-xs cursor-pointer"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-[12px] text-[#cc0c39]">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
