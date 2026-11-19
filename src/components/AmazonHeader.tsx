import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  ShoppingCart,
  Menu,
  ChevronDown,
  X,
} from 'lucide-react';
import { AmazonSgLogo } from './AmazonBranding';

const SEARCH_CATEGORIES = [
  'All Departments',
  'Electronics',
  'Mobile Phones & Accessories',
  'Amazon International Store',
  'Computers',
];

const AUTOCOMPLETE_SUGGESTIONS = [
  'iphone duo case',
  'iphone duo case magsafe',
  'iphone duo case spigen',
  'iphone duo leather folio',
  'iphone duo screen protector',
  'iphone 16 pro max case 2 pack',
];

const SECONDARY_NAV_ITEMS = [
  { label: 'Fresh', filterDepartment: null, action: 'fresh' },
  { label: 'Best Sellers', filterDepartment: null, action: 'bestsellers' },
  { label: 'Deals', filterDepartment: null, action: 'deals' },
  { label: 'Prime', filterDepartment: null, action: 'prime' },
  { label: 'Electronics', filterDepartment: 'Foldable Phone Cases', action: 'dept' },
  { label: 'International Store', filterDepartment: null, action: 'intl' },
  { label: 'Gift Cards', filterDepartment: null, action: 'gift' },
  { label: 'Customer Service', filterDepartment: null, action: 'service' },
];

interface AmazonHeaderProps {
  searchQuery: string;
  onSearchSubmit: (q: string) => void;
  searchCategory: string;
  onSearchCategoryChange: (cat: string) => void;
  postalCode: string;
  locationLabel: string;
  onOpenLocationModal: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAllMenu: () => void;
  onQuickNavAction: (action: string) => void;
  signedInUser: string | null;
  onOpenAccountModal: () => void;
  onOpenOrdersModal: () => void;
}

export function AmazonHeader({
  searchQuery,
  onSearchSubmit,
  searchCategory,
  onSearchCategoryChange,
  postalCode,
  locationLabel,
  onOpenLocationModal,
  cartCount,
  onOpenCart,
  onOpenAllMenu,
  onQuickNavAction,
  signedInUser,
  onOpenAccountModal,
  onOpenOrdersModal,
}: AmazonHeaderProps) {
  const [draftQuery, setDraftQuery] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDraftQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = AUTOCOMPLETE_SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(draftQuery.trim().toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onSearchSubmit(draftQuery.trim() || 'iphone duo case');
  };

  return (
    <header className="w-full bg-[#131921] text-white select-none">
      {/* Primary Top Bar */}
      <div className="max-w-[1500px] mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onSearchSubmit('iphone duo case')}
          className="px-2 py-1.5 rounded-xs border border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-[#febd69] transition-colors shrink-0 cursor-pointer"
          aria-label="Amazon.sg Home"
        >
          <AmazonSgLogo />
        </button>

        {/* Deliver to Singapore */}
        <button
          type="button"
          onClick={onOpenLocationModal}
          className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xs border border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-[#febd69] transition-colors shrink-0 text-left cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-white mt-2 shrink-0" />
          <div className="leading-tight whitespace-nowrap">
            <div className="text-[11px] text-[#cccccc]">
              Deliver to {signedInUser ? signedInUser.split(' ')[0] : 'Singapore'}
            </div>
            <div className="text-[13px] font-bold text-white">
              {locationLabel} {postalCode}
            </div>
          </div>
        </button>

        {/* Desktop Search Bar */}
        <div ref={searchWrapperRef} className="hidden sm:block flex-1 relative min-w-0">
          <form
            onSubmit={handleSubmit}
            className="flex items-stretch h-[40px] rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#ff9900]"
          >
            {/* Category Select */}
            <div className="relative bg-[#e6e6e6] hover:bg-[#d4d4d4] border-r border-[#cdcdcd] transition-colors shrink-0 flex items-center">
              <select
                value={searchCategory}
                onChange={(e) => onSearchCategoryChange(e.target.value)}
                aria-label="Search in department"
                className="appearance-none bg-transparent text-[#555555] hover:text-[#0f1111] text-[12px] font-medium pl-3 pr-7 h-full cursor-pointer focus:outline-none max-w-[140px] truncate"
              >
                {SEARCH_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#555555] pointer-events-none absolute right-2" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 min-w-0 flex items-center">
              <input
                type="text"
                value={draftQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setDraftQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Search Amazon.sg"
                aria-label="Search Amazon.sg"
                className="w-full h-full px-3 text-[14px] text-[#0f1111] placeholder-[#6b7280] focus:outline-none bg-transparent"
              />
              {draftQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setDraftQuery('');
                    onSearchSubmit('iphone duo case');
                  }}
                  aria-label="Clear search"
                  className="p-1.5 mr-1 text-[#6b7280] hover:text-[#0f1111] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Submit */}
            <button
              type="submit"
              aria-label="Go"
              className="w-[45px] bg-[#febd69] hover:bg-[#f3a847] text-[#131921] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>
          </form>

          {/* Search Autocomplete Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-[42px] bg-white border border-[#d5d9d9] rounded-b-md shadow-lg z-50 py-1">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setDraftQuery(suggestion);
                    setShowSuggestions(false);
                    onSearchSubmit(suggestion);
                  }}
                  className="w-full px-3.5 py-2 text-left text-[14px] text-[#0f1111] hover:bg-[#f3f4f6] flex items-center gap-2.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 text-[#565959] shrink-0" />
                  <span className="truncate font-medium">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-2 ml-auto sm:ml-0 shrink-0">
          {/* Language / Region */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="hidden lg:flex items-center gap-1.5 px-2 py-2 rounded-xs border border-transparent hover:border-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Singapore · English · SGD"
          >
            <span className="inline-flex items-center justify-center w-5 h-3.5 rounded-[2px] overflow-hidden border border-white/30 text-[9px] font-bold bg-[#ef3340] text-white leading-none">
              SG
            </span>
            <span className="text-[13px] font-bold">EN</span>
            <ChevronDown className="w-3 h-3 text-[#a7acb2]" />
          </button>

          {/* Account & Lists */}
          <button
            type="button"
            onClick={onOpenAccountModal}
            className="hidden sm:flex flex-col items-start px-2 py-1.5 rounded-xs border border-transparent hover:border-white transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            <span className="text-[11px] text-[#cccccc] leading-tight">
              Hello, {signedInUser ? signedInUser.split(' ')[0] : 'sign in'}
            </span>
            <span className="text-[13px] font-bold leading-tight flex items-center gap-0.5">
              Account & Lists
              <ChevronDown className="w-3 h-3 text-[#a7acb2]" />
            </span>
          </button>

          {/* Returns & Orders */}
          <button
            type="button"
            onClick={onOpenOrdersModal}
            className="hidden lg:flex flex-col items-start px-2 py-1.5 rounded-xs border border-transparent hover:border-white transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            <span className="text-[11px] text-[#cccccc] leading-tight">Returns</span>
            <span className="text-[13px] font-bold leading-tight">& Orders</span>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Shopping Cart with ${cartCount} items`}
            className="flex items-end gap-1 px-2.5 py-1.5 rounded-xs border border-transparent hover:border-white focus-visible:outline-2 focus-visible:outline-[#febd69] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <div className="relative flex items-center">
              <ShoppingCart className="w-7 h-7 text-white stroke-[1.8]" />
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[13px] font-bold text-[#ff9900] tabular-nums bg-[#131921] px-1 rounded-full leading-none">
                {cartCount}
              </span>
            </div>
            <span className="text-[13px] font-bold pb-0.5 hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-3 pb-2.5">
        <form
          onSubmit={handleSubmit}
          className="flex items-stretch h-[40px] rounded-md overflow-hidden bg-white"
        >
          <input
            type="text"
            value={draftQuery}
            onChange={(e) => setDraftQuery(e.target.value)}
            placeholder="Search Amazon.sg"
            aria-label="Search Amazon.sg"
            className="flex-1 px-3 text-[14px] text-[#0f1111] focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="w-[44px] bg-[#febd69] hover:bg-[#f3a847] text-[#131921] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Secondary Nav Bar */}
      <nav
        aria-label="Main navigation"
        className="w-full bg-[#232f3e] border-t border-white/10"
      >
        <div className="max-w-[1500px] mx-auto px-3 sm:px-4 h-[39px] flex items-center gap-1 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={onOpenAllMenu}
            className="flex items-center gap-1 px-2 py-1 rounded-xs border border-transparent hover:border-white text-[13px] font-bold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>All</span>
          </button>

          {SECONDARY_NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onQuickNavAction(item.action)}
              className="px-2.5 py-1 rounded-xs border border-transparent hover:border-white text-[13px] font-medium text-white/95 hover:text-white whitespace-nowrap shrink-0 cursor-pointer transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Deliver-to strip */}
      <button
        type="button"
        onClick={onOpenLocationModal}
        className="md:hidden w-full bg-[#37475a] px-3 py-1.5 flex items-center gap-1.5 text-[12px] text-white cursor-pointer"
      >
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">
          Deliver to {locationLabel} {postalCode}
        </span>
      </button>
    </header>
  );
}
