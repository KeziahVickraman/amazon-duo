import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { PrimeBadge, StarRating } from './AmazonBranding';

export interface FilterState {
  primeOnly: boolean;
  freeDeliveryOnly: boolean;
  department: string | null;
  minRating: number | null;
  brands: string[];
  priceRange: [number, number] | null;
  compatibility: string | null;
  features: string[];
  shipsFrom: string | null;
}

const DEPARTMENTS = [
  'Foldable Phone Cases',
  'Mobile Phone Cases & Covers',
  'Wallet Cases',
  'Basic Cases',
  'Screen Protectors',
];

const BRANDS = ['Spigen', 'Apple', 'ESR', 'TORRAS', 'Ringke', 'Mous', 'OtterBox', 'Nomad', 'Pitaka', 'CASETiFY', 'UAG'];

const PRICE_RANGES: { label: string; range: [number, number] }[] = [
  { label: 'Under S$25', range: [0, 25] },
  { label: 'S$25 to S$50', range: [25, 50] },
  { label: 'S$50 to S$100', range: [50, 100] },
  { label: 'S$100 & Above', range: [100, 9999] },
];

const COMPATIBILITY_OPTIONS = [
  'iPhone Duo',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'Universal 2-Pack',
];

const FEATURE_OPTIONS = [
  'MagSafe Compatible',
  'Hinge Protection',
  'Kickstand',
  'Clear / Transparent',
  'Shockproof',
];

const SHIPS_FROM_OPTIONS = ['Amazon.sg', 'Amazon US', 'Amazon Japan'];

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onClearAll: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function FilterSidebar({
  filters,
  onChange,
  onClearAll,
  mobileOpen = false,
  onCloseMobile,
}: FilterSidebarProps) {
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');

  const toggleBrand = (brand: string) => {
    const exists = filters.brands.includes(brand);
    onChange({
      ...filters,
      brands: exists
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };

  const toggleFeature = (feat: string) => {
    const exists = filters.features.includes(feat);
    onChange({
      ...filters,
      features: exists
        ? filters.features.filter((f) => f !== feat)
        : [...filters.features, feat],
    });
  };

  const handleCustomPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = minInput ? parseFloat(minInput) : 0;
    const max = maxInput ? parseFloat(maxInput) : 9999;
    if (!Number.isNaN(min) && !Number.isNaN(max)) {
      onChange({ ...filters, priceRange: [min, max] });
    }
  };

  const hasActiveFilters =
    filters.primeOnly ||
    filters.freeDeliveryOnly ||
    filters.department !== null ||
    filters.minRating !== null ||
    filters.brands.length > 0 ||
    filters.priceRange !== null ||
    filters.compatibility !== null ||
    filters.features.length > 0 ||
    filters.shipsFrom !== null;

  const sidebarContent = (
    <div className="space-y-5 text-[13px] text-[#0f1111]">
      {hasActiveFilters && (
        <div className="pb-2 border-b border-[#e7e7e7]">
          <button
            type="button"
            onClick={() => {
              setMinInput('');
              setMaxInput('');
              onClearAll();
            }}
            className="text-[12px] font-medium text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Delivery & Prime */}
      <section>
        <h3 className="font-bold text-[14px] mb-2">Delivery</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.primeOnly}
              onChange={(e) => onChange({ ...filters, primeOnly: e.target.checked })}
              className="w-4 h-4 accent-[#007185] rounded-xs cursor-pointer"
            />
            <PrimeBadge compact />
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.freeDeliveryOnly}
              onChange={(e) =>
                onChange({ ...filters, freeDeliveryOnly: e.target.checked })
              }
              className="w-4 h-4 accent-[#007185] rounded-xs cursor-pointer"
            />
            <span className="group-hover:text-[#c45500]">Eligible for Free Delivery</span>
          </label>
        </div>
      </section>

      {/* Department */}
      <section>
        <h3 className="font-bold text-[14px] mb-1.5">Department</h3>
        <ul className="space-y-1">
          {filters.department && (
            <li>
              <button
                type="button"
                onClick={() => onChange({ ...filters, department: null })}
                className="text-[13px] text-[#0f1111] hover:text-[#c45500] flex items-center gap-1 cursor-pointer"
              >
                <span className="text-[#565959]">‹</span> Any Department
              </button>
            </li>
          )}
          {DEPARTMENTS.map((dept) => {
            const active = filters.department === dept;
            return (
              <li key={dept}>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      department: active ? null : dept,
                    })
                  }
                  className={`text-left leading-snug cursor-pointer transition-colors ${
                    active
                      ? 'font-bold text-[#0f1111]'
                      : 'text-[#0f1111] hover:text-[#c45500]'
                  }`}
                >
                  {dept}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Customer Reviews */}
      <section>
        <h3 className="font-bold text-[14px] mb-1.5">Customer Reviews</h3>
        <ul className="space-y-1.5">
          {[4, 3, 2, 1].map((stars) => {
            const active = filters.minRating === stars;
            return (
              <li key={stars}>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      minRating: active ? null : stars,
                    })
                  }
                  className={`flex items-center gap-1.5 cursor-pointer group ${
                    active ? 'font-bold' : ''
                  }`}
                >
                  <StarRating rating={stars} size="xs" />
                  <span className="text-[12px] text-[#0f1111] group-hover:text-[#c45500]">
                    & Up
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Brands */}
      <section>
        <h3 className="font-bold text-[14px] mb-1.5">Brand</h3>
        <ul className="space-y-1.5">
          {BRANDS.map((brand) => {
            const checked = filters.brands.includes(brand);
            return (
              <li key={brand}>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <span
                    className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                      checked
                        ? 'bg-[#007185] border-[#007185] text-white'
                        : 'border-[#888c8c] bg-white group-hover:border-[#007185]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                      className="sr-only"
                    />
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <span className="group-hover:text-[#c45500]">{brand}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Price */}
      <section>
        <h3 className="font-bold text-[14px] mb-1.5">Price</h3>
        <ul className="space-y-1 mb-2.5">
          {PRICE_RANGES.map((item) => {
            const active =
              filters.priceRange?.[0] === item.range[0] &&
              filters.priceRange?.[1] === item.range[1];
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      priceRange: active ? null : item.range,
                    })
                  }
                  className={`cursor-pointer hover:text-[#c45500] ${
                    active ? 'font-bold text-[#0f1111]' : 'text-[#0f1111]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleCustomPrice} className="flex items-center gap-1.5">
          <div className="relative w-[68px]">
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[11px] text-[#565959]">
              S$
            </span>
            <input
              type="number"
              min="0"
              value={minInput}
              onChange={(e) => setMinInput(e.target.value)}
              placeholder="Min"
              aria-label="Minimum price in SGD"
              className="w-full h-[30px] pl-6 pr-1.5 text-[12px] border border-[#888c8c] rounded-[3px] focus:outline-none focus:border-[#007185] tabular-nums"
            />
          </div>
          <div className="relative w-[68px]">
            <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[11px] text-[#565959]">
              S$
            </span>
            <input
              type="number"
              min="0"
              value={maxInput}
              onChange={(e) => setMaxInput(e.target.value)}
              placeholder="Max"
              aria-label="Maximum price in SGD"
              className="w-full h-[30px] pl-6 pr-1.5 text-[12px] border border-[#888c8c] rounded-[3px] focus:outline-none focus:border-[#007185] tabular-nums"
            />
          </div>
          <button
            type="submit"
            className="h-[30px] px-2.5 text-[12px] font-medium bg-white border border-[#d5d9d9] rounded-[7px] shadow-xs hover:bg-[#f7fafa] cursor-pointer"
          >
            Go
          </button>
        </form>
      </section>

      {/* Compatible Phone Model */}
      <section>
        <h3 className="font-bold text-[14px] mb-1.5">Compatible Phone Models</h3>
        <ul className="space-y-1.5">
          {COMPATIBILITY_OPTIONS.map((model) => {
            const active = filters.compatibility === model;
            return (
              <li key={model}>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() =>
                      onChange({
                        ...filters,
                        compatibility: active ? null : model,
                      })
                    }
                    className="w-4 h-4 accent-[#007185] rounded-xs cursor-pointer"
                  />
                  <span className="group-hover:text-[#c45500]">{model}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Case Features */}
      <section>
        <h3 className="font-bold text-[14px] mb-1.5">Case Features</h3>
        <ul className="space-y-1.5">
          {FEATURE_OPTIONS.map((feat) => {
            const checked = filters.features.includes(feat);
            return (
              <li key={feat}>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFeature(feat)}
                    className="w-4 h-4 accent-[#007185] rounded-xs cursor-pointer"
                  />
                  <span className="group-hover:text-[#c45500]">{feat}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Ships From */}
      <section>
        <h3 className="font-bold text-[14px] mb-1.5">Seller & Fulfilment</h3>
        <ul className="space-y-1.5">
          {SHIPS_FROM_OPTIONS.map((origin) => {
            const active = filters.shipsFrom === origin;
            return (
              <li key={origin}>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() =>
                      onChange({
                        ...filters,
                        shipsFrom: active ? null : origin,
                      })
                    }
                    className="w-4 h-4 accent-[#007185] rounded-xs cursor-pointer"
                  />
                  <span className="group-hover:text-[#c45500]">{origin}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[240px] shrink-0 pr-5 border-r border-[#e7e7e7]">
        {sidebarContent}
      </aside>

      {/* Mobile Filter Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative w-[300px] max-w-[85vw] bg-white h-full overflow-y-auto p-4 shadow-xl z-10">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e7e7e7]">
              <span className="font-display font-bold text-[16px]">Filters</span>
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Close filters"
                className="p-1.5 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
