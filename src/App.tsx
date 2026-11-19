import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import { PRODUCTS, RELATED_SEARCHES, Product } from './data/products';
import { AmazonHeader } from './components/AmazonHeader';
import { FilterSidebar, FilterState } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { AllMenuDrawer, AccountOrdersModal, PlacedOrder } from './components/AllMenuDrawer';
import { AmazonFooter } from './components/AmazonFooter';
import { PrimeBadge } from './components/AmazonBranding';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

const INITIAL_FILTERS: FilterState = {
  primeOnly: false,
  freeDeliveryOnly: false,
  department: null,
  minRating: null,
  brands: [],
  priceRange: null,
  compatibility: null,
  features: [],
  shipsFrom: null,
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('iphone duo case');
  const [searchCategory, setSearchCategory] = useState('All Departments');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [currentPage, setCurrentPage] = useState(1);

  // Singapore Location State
  const [postalCode, setPostalCode] = useState('238801');
  const [locationLabel, setLocationLabel] = useState('Singapore');
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // Drawers & Modals
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [allMenuOpen, setAllMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    product: Product;
    colorIdx: number;
  } | null>(null);
  const [accountModalMode, setAccountModalMode] = useState<'account' | 'orders' | null>(null);
  const [signedInUser, setSignedInUser] = useState<string | null>(null);
  const [orders, setOrders] = useState<PlacedOrder[]>([]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleAddToCart = (
    product: Product,
    colorName: string,
    image: string,
    quantity = 1
  ) => {
    const key = `${product.id}__${colorName}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { key, product, colorName, image, quantity }];
    });
    showToast(`Added ${product.brand} ${colorName} to Cart`);
  };

  const handleBuyNow = (
    product: Product,
    colorName: string,
    image: string,
    quantity = 1
  ) => {
    handleAddToCart(product, colorName, image, quantity);
    setCartOpen(true);
  };

  const handleUpdateCartQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleOrderPlaced = (orderNumber: string, total: number, itemCount: number) => {
    setOrders((prev) => [
      {
        orderNumber,
        date: '18 Nov 2026',
        total,
        itemCount,
        postalCode,
      },
      ...prev,
    ]);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tokens = q.split(/\s+/).filter(Boolean);

    const matched = PRODUCTS.filter((p) => {
      // Search category filter
      if (searchCategory === 'Amazon International Store' && p.shipsFrom === 'Amazon.sg') {
        return false;
      }

      // Search query match (keep all relevant duo case products when default query is active)
      if (q && q !== 'iphone duo case') {
        const haystack = `${p.title} ${p.brand} ${p.department} ${p.compatibility.join(' ')} ${p.features.join(' ')}`.toLowerCase();
        const matchesAllTokens = tokens.every((t) => haystack.includes(t));
        if (!matchesAllTokens) return false;
      }

      if (filters.primeOnly && !p.isPrime) return false;
      if (filters.freeDeliveryOnly && !p.isFreeDelivery) return false;
      if (filters.department && p.department !== filters.department) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      if (filters.brands.length > 0 && !filters.brands.includes(p.brand)) return false;
      if (
        filters.priceRange &&
        (p.price < filters.priceRange[0] || p.price > filters.priceRange[1])
      ) {
        return false;
      }
      if (
        filters.compatibility &&
        !p.compatibility.includes(filters.compatibility)
      ) {
        return false;
      }
      if (
        filters.features.length > 0 &&
        !filters.features.every((f) => p.features.includes(f))
      ) {
        return false;
      }
      if (filters.shipsFrom && p.shipsFrom !== filters.shipsFrom) return false;

      return true;
    });

    const sorted = [...matched];
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'newest') {
      sorted.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }
    return sorted;
  }, [searchQuery, searchCategory, filters, sortBy]);

  // Pagination (12 per page on Page 1, remaining on Page 2 when >= 13 results)
  const itemsPerPage = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleQuickNav = (action: string) => {
    setCurrentPage(1);
    if (action === 'prime') {
      setFilters((prev) => ({ ...prev, primeOnly: !prev.primeOnly }));
      showToast('Toggled Amazon Prime Singapore filter');
    } else if (action === 'bestsellers') {
      setSortBy('rating');
      showToast('Sorted by top-rated Best Sellers');
    } else if (action === 'deals') {
      setFilters({ ...INITIAL_FILTERS, priceRange: [0, 65] });
      showToast('Showing iPhone Duo deals under S$65');
    } else if (action === 'intl') {
      setFilters({ ...INITIAL_FILTERS, shipsFrom: 'Amazon US' });
    } else if (action === 'dept') {
      setFilters({ ...INITIAL_FILTERS, department: 'Foldable Phone Cases' });
    } else {
      setFilters(INITIAL_FILTERS);
      setSearchQuery('iphone duo case');
    }
  };

  const activeFilterTags: { label: string; clear: () => void }[] = [];
  if (filters.primeOnly) {
    activeFilterTags.push({
      label: 'Prime',
      clear: () => setFilters((f) => ({ ...f, primeOnly: false })),
    });
  }
  if (filters.freeDeliveryOnly) {
    activeFilterTags.push({
      label: 'Free Delivery',
      clear: () => setFilters((f) => ({ ...f, freeDeliveryOnly: false })),
    });
  }
  if (filters.department) {
    activeFilterTags.push({
      label: filters.department,
      clear: () => setFilters((f) => ({ ...f, department: null })),
    });
  }
  if (filters.minRating) {
    activeFilterTags.push({
      label: `${filters.minRating}★ & Up`,
      clear: () => setFilters((f) => ({ ...f, minRating: null })),
    });
  }
  filters.brands.forEach((b) =>
    activeFilterTags.push({
      label: b,
      clear: () =>
        setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) })),
    })
  );
  if (filters.priceRange) {
    activeFilterTags.push({
      label:
        filters.priceRange[1] >= 9999
          ? `S$${filters.priceRange[0]}+`
          : `S$${filters.priceRange[0]}–S$${filters.priceRange[1]}`,
      clear: () => setFilters((f) => ({ ...f, priceRange: null })),
    });
  }
  if (filters.compatibility) {
    activeFilterTags.push({
      label: filters.compatibility,
      clear: () => setFilters((f) => ({ ...f, compatibility: null })),
    });
  }
  filters.features.forEach((feat) =>
    activeFilterTags.push({
      label: feat,
      clear: () =>
        setFilters((f) => ({
          ...f,
          features: f.features.filter((x) => x !== feat),
        })),
    })
  );
  if (filters.shipsFrom) {
    activeFilterTags.push({
      label: `Ships from ${filters.shipsFrom}`,
      clear: () => setFilters((f) => ({ ...f, shipsFrom: null })),
    });
  }

  const startIndex =
    filteredProducts.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(safePage * itemsPerPage, filteredProducts.length);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0f1111]">
      <AmazonHeader
        searchQuery={searchQuery}
        onSearchSubmit={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        searchCategory={searchCategory}
        onSearchCategoryChange={(cat) => {
          setSearchCategory(cat);
          setCurrentPage(1);
        }}
        postalCode={postalCode}
        locationLabel={locationLabel}
        onOpenLocationModal={() => setLocationModalOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenAllMenu={() => setAllMenuOpen(true)}
        onQuickNavAction={handleQuickNav}
        signedInUser={signedInUser}
        onOpenAccountModal={() => setAccountModalMode('account')}
        onOpenOrdersModal={() => setAccountModalMode('orders')}
      />

      {/* Search Results Summary Bar */}
      <div className="w-full border-b border-[#e7e7e7] shadow-[0_1px_2px_rgba(0,0,0,0.06)] bg-white">
        <div className="max-w-[1500px] mx-auto px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2 text-[13px]">
          <div className="flex items-center gap-2">
            <span>
              {filteredProducts.length > 0 ? (
                <>
                  <span className="tabular-nums">
                    {startIndex}-{endIndex}
                  </span>{' '}
                  of{' '}
                  {activeFilterTags.length === 0 && searchQuery === 'iphone duo case'
                    ? 'over 1,000'
                    : filteredProducts.length}{' '}
                  results for{' '}
                </>
              ) : (
                '0 results for '
              )}
              <strong className="font-bold text-[#c45500]">
                &quot;{searchQuery}&quot;
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Trigger */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f2f2] border border-[#d5d9d9] rounded-[7px] text-[12px] font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterTags.length > 0 && (
                <span className="tabular-nums font-bold text-[#007185]">
                  ({activeFilterTags.length})
                </span>
              )}
            </button>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="sort-select" className="text-[12px] text-[#565959] hidden sm:inline">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                  setCurrentPage(1);
                }}
                className="h-[28px] px-2.5 text-[12px] font-medium bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] rounded-[7px] shadow-xs cursor-pointer focus:outline-none focus:border-[#007185]"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-3 sm:px-5 py-4 flex items-start gap-5">
        <FilterSidebar
          filters={filters}
          onChange={(next) => {
            setFilters(next);
            setCurrentPage(1);
          }}
          onClearAll={() => {
            setFilters(INITIAL_FILTERS);
            setCurrentPage(1);
          }}
          mobileOpen={mobileFiltersOpen}
          onCloseMobile={() => setMobileFiltersOpen(false)}
        />

        <div className="flex-1 min-w-0">
          {/* Active Filter Controls */}
          {activeFilterTags.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="text-[#565959] font-medium">Active filters:</span>
              {activeFilterTags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={tag.clear}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f0f2f2] hover:bg-[#e3e6e6] border border-[#d5d9d9] rounded-[4px] text-[#0f1111] font-medium cursor-pointer"
                >
                  <span>{tag.label}</span>
                  <X className="w-3 h-3 text-[#565959]" />
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFilters(INITIAL_FILTERS)}
                className="text-[#007185] hover:text-[#c45500] hover:underline ml-1 cursor-pointer"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Sponsored Brand Spotlight Strip */}
          {safePage === 1 && (
            <div className="mb-4 border border-[#e7e7e7] rounded-[4px] bg-[#fafafa] p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-16 h-16 bg-white border border-[#e7e7e7] rounded p-1.5 shrink-0">
                  <img
                    src="/src/assets/images/case_duo_clear_magsafe_1795058801546.jpg"
                    alt="Spigen iPhone Duo Collection"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] text-[#565959]">
                    Sponsored · Spigen Official Store Singapore
                  </div>
                  <h2 className="font-display text-[15px] sm:text-[16px] font-bold text-[#0f1111] truncate">
                    Engineered for iPhone Duo: MagFit &amp; Hinge Armor
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5 text-[12px] text-[#565959]">
                    <PrimeBadge compact />
                    <span>Next-day delivery across Singapore</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setFilters({ ...INITIAL_FILTERS, brands: ['Spigen'] });
                  setCurrentPage(1);
                }}
                className="px-4 py-1.5 bg-white hover:bg-[#f7fafa] border border-[#d5d9d9] rounded-[7px] text-[13px] font-medium text-[#0f1111] shadow-xs whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-center"
              >
                Shop Spigen
              </button>
            </div>
          )}

          {/* Results Section Header */}
          <div className="mb-3 flex items-baseline justify-between">
            <div>
              <h1 className="font-display text-[20px] font-bold text-[#0f1111]">
                Results
              </h1>
              <p className="text-[12px] text-[#565959]">
                Check each product page for other buying options. Price and other details may vary based on product size and colour.
              </p>
            </div>
          </div>

          {/* Product Grid or Empty State */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  postalCode={postalCode}
                  onSelectProduct={(p, idx) =>
                    setSelectedProduct({ product: p, colorIdx: idx })
                  }
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="border border-[#e7e7e7] rounded-md p-10 text-center space-y-3 bg-[#fafafa]">
              <h2 className="font-display text-[18px] font-bold text-[#0f1111]">
                No results found for &quot;{searchQuery}&quot;
              </h2>
              <p className="text-[13px] text-[#565959] max-w-[420px] mx-auto">
                Try clearing some filters or searching a broader term like &quot;iphone duo case&quot;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilters(INITIAL_FILTERS);
                  setSearchQuery('iphone duo case');
                  setSearchCategory('All Departments');
                  setCurrentPage(1);
                }}
                className="px-5 py-2 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-[13px] font-medium cursor-pointer"
              >
                Reset search &amp; filters
              </button>
            </div>
          )}

          {/* Related Searches */}
          <section className="mt-8 pt-6 border-t border-[#e7e7e7]">
            <h2 className="font-display text-[17px] font-bold text-[#0f1111] mb-3">
              Related searches
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {RELATED_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term);
                    setFilters(INITIAL_FILTERS);
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2.5 border border-[#d5d9d9] rounded-[4px] hover:bg-[#f7fafa] text-left text-[13px] text-[#0f1111] flex items-center gap-2.5 cursor-pointer transition-colors"
                >
                  <Search className="w-4 h-4 text-[#565959] shrink-0" />
                  <span className="truncate font-medium">{term}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav
                aria-label="Search results pagination"
                className="inline-flex items-center border border-[#d5d9d9] rounded-md overflow-hidden shadow-xs bg-white text-[13px]"
              >
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 flex items-center gap-1 border-r border-[#e7e7e7] disabled:text-[#a6a6a6] disabled:cursor-not-allowed hover:bg-[#f7fafa] cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 border-r border-[#e7e7e7] tabular-nums cursor-pointer ${
                      page === safePage
                        ? 'font-bold text-[#0f1111] border-b-2 border-b-[#e77600] bg-[#fefaf6]'
                        : 'text-[#0f1111] hover:bg-[#f7fafa]'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 flex items-center gap-1 disabled:text-[#a6a6a6] disabled:cursor-not-allowed hover:bg-[#f7fafa] cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>

      <AmazonFooter
        onFooterLinkClick={(label) => {
          if (label === 'Your Orders') setAccountModalMode('orders');
          else if (label === 'Your Account') setAccountModalMode('account');
          else showToast(`Opened ${label} information`);
        }}
      />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct.product}
          initialColorIdx={selectedProduct.colorIdx}
          postalCode={postalCode}
          locationLabel={locationLabel}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      )}

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        postalCode={postalCode}
        locationLabel={locationLabel}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onOrderPlaced={handleOrderPlaced}
      />

      <LocationModal
        open={locationModalOpen}
        currentPostal={postalCode}
        onClose={() => setLocationModalOpen(false)}
        onSelectLocation={(label, postal) => {
          setLocationLabel(label);
          setPostalCode(postal);
          showToast(`Delivery location updated to ${label} ${postal}`);
        }}
      />

      <AllMenuDrawer
        open={allMenuOpen}
        signedInUser={signedInUser}
        onClose={() => setAllMenuOpen(false)}
        onSelectCategory={(dept, q) => {
          setFilters({ ...INITIAL_FILTERS, department: dept });
          if (q) setSearchQuery(q);
          setCurrentPage(1);
        }}
        onOpenAccount={() => setAccountModalMode('account')}
      />

      <AccountOrdersModal
        mode={accountModalMode}
        signedInUser={signedInUser}
        orders={orders}
        onClose={() => setAccountModalMode(null)}
        onSignIn={(name) => {
          setSignedInUser(name);
          showToast(`Welcome back, ${name}`);
        }}
        onSignOut={() => {
          setSignedInUser(null);
          showToast('Signed out of Amazon.sg');
        }}
      />

      {/* Subtle Bottom Feedback Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#232f3e] text-white px-4 py-2.5 rounded-md shadow-lg text-[13px] flex items-center gap-2 border border-white/15"
        >
          <Check className="w-4 h-4 text-[#febd69] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
