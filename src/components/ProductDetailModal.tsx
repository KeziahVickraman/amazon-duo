import React, { useState } from 'react';
import { X, MapPin, ShieldCheck, CheckCircle2, ThumbsUp, Smartphone } from 'lucide-react';
import { Product } from '../data/products';
import {
  PrimeBadge,
  StarRating,
  formatSgdPriceParts,
  getDeliveryPromiseText,
} from './AmazonBranding';

interface ProductDetailModalProps {
  product: Product;
  initialColorIdx: number;
  postalCode: string;
  locationLabel: string;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    colorName: string,
    image: string,
    quantity: number
  ) => void;
  onBuyNow: (
    product: Product,
    colorName: string,
    image: string,
    quantity: number
  ) => void;
}

export function ProductDetailModal({
  product,
  initialColorIdx,
  postalCode,
  locationLabel,
  onClose,
  onAddToCart,
  onBuyNow,
}: ProductDetailModalProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(initialColorIdx);
  const [selectedModel, setSelectedModel] = useState(product.compatibility[0]);
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [helpfulIds, setHelpfulIds] = useState<string[]>([]);

  const activeVariant = product.colors[selectedColorIdx] || product.colors[0];
  const { whole, cents } = formatSgdPriceParts(product.price);
  const delivery = getDeliveryPromiseText(product.deliveryDays, product.isPrime);
  const savings = product.listPrice
    ? Math.round(((product.listPrice - product.price) / product.listPrice) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/55"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
    >
      <div
        className="relative w-full max-w-[1060px] max-h-[92vh] bg-white rounded-lg shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-[#e7e7e7] px-5 py-3 flex items-center justify-between">
          <div className="text-[12px] text-[#565959] truncate pr-4">
            <span className="text-[#007185] font-medium">{product.department}</span>
            <span className="mx-1.5">›</span>
            <span className="font-medium text-[#0f1111]">{product.brand}</span>
            <span className="mx-1.5">·</span>
            <span className="font-mono text-[11px]">ASIN: {product.asin}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="p-1.5 rounded-md text-[#565959] hover:text-[#0f1111] hover:bg-gray-100 cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column: Studio Image */}
          <div className="lg:col-span-5">
            <div className="aspect-square bg-[#f7f7f7] rounded-md border border-[#e7e7e7] p-6 flex items-center justify-center">
              {!imgError ? (
                <img
                  src={activeVariant.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <Smartphone className="w-12 h-12 mb-2 text-slate-400" />
                  <span className="text-sm font-medium">{product.brand}</span>
                </div>
              )}
            </div>

            {product.colors.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {product.colors.map((variant, idx) => (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={() => {
                      setSelectedColorIdx(idx);
                      setImgError(false);
                    }}
                    className={`w-14 h-14 rounded border p-1 bg-[#f7f7f7] shrink-0 cursor-pointer ${
                      idx === selectedColorIdx
                        ? 'border-[#007185] ring-2 ring-[#007185]/30'
                        : 'border-[#d5d9d9] hover:border-[#888c8c]'
                    }`}
                  >
                    <img
                      src={variant.image}
                      alt={variant.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Middle Column: Details & Variants */}
          <div className="lg:col-span-4 space-y-3.5">
            <div>
              <div className="text-[13px] text-[#007185] font-medium mb-0.5">
                Visit the {product.brand} Store
              </div>
              <h2 className="font-display text-[20px] leading-[1.3] font-semibold text-[#0f1111]">
                {product.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 pb-3 border-b border-[#e7e7e7]">
              <span className="text-[14px] font-medium tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <StarRating rating={product.rating} size="sm" />
              <span className="text-[13px] text-[#007185] tabular-nums">
                {product.reviewCount.toLocaleString('en-SG')} ratings
              </span>
            </div>

            {/* Price */}
            <div className="pb-3 border-b border-[#e7e7e7]">
              <div className="flex items-baseline gap-2">
                {savings > 0 && (
                  <span className="text-[22px] font-normal text-[#cc0c39] tabular-nums">
                    -{savings}%
                  </span>
                )}
                <span className="inline-flex items-start text-[#0f1111] tabular-nums">
                  <span className="text-[13px] font-medium pt-1">S$</span>
                  <span className="text-[28px] font-medium leading-none">{whole}</span>
                  <span className="text-[13px] font-medium pt-1">{cents}</span>
                </span>
              </div>
              {product.listPrice && (
                <div className="text-[12px] text-[#565959] mt-1 tabular-nums">
                  List Price:{' '}
                  <span className="line-through">
                    S${product.listPrice.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="text-[12px] text-[#565959] mt-1">
                Prices include GST for Singapore delivery.
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <div className="text-[13px] mb-1.5">
                <span className="text-[#565959]">Colour: </span>
                <span className="font-bold text-[#0f1111]">{activeVariant.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((variant, idx) => (
                  <button
                    key={variant.name}
                    type="button"
                    onClick={() => {
                      setSelectedColorIdx(idx);
                      setImgError(false);
                    }}
                    className={`px-3 py-1.5 rounded-[4px] border text-[12px] flex items-center gap-2 cursor-pointer transition-colors ${
                      idx === selectedColorIdx
                        ? 'border-[#e77600] bg-[#fefaf6] font-bold ring-1 ring-[#e77600]'
                        : 'border-[#d5d9d9] hover:border-[#888c8c]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: variant.hex }}
                    />
                    <span>{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compatible Model Selection */}
            <div>
              <div className="text-[13px] mb-1.5">
                <span className="text-[#565959]">Compatible Model: </span>
                <span className="font-bold text-[#0f1111]">{selectedModel}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.compatibility.map((model) => (
                  <button
                    key={model}
                    type="button"
                    onClick={() => setSelectedModel(model)}
                    className={`px-3 py-1.5 rounded-[4px] border text-[12px] cursor-pointer ${
                      selectedModel === model
                        ? 'border-[#e77600] bg-[#fefaf6] font-bold ring-1 ring-[#e77600]'
                        : 'border-[#d5d9d9] hover:border-[#888c8c]'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>

            {/* About this item */}
            <div className="pt-2">
              <h3 className="font-bold text-[14px] mb-2">About this item</h3>
              <ul className="list-disc pl-4 space-y-1.5 text-[13px] text-[#0f1111] leading-relaxed">
                {product.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Contiguous Buy Box */}
          <div className="lg:col-span-3">
            <div className="border border-[#d5d9d9] rounded-lg p-4 space-y-3 bg-white sticky top-16">
              <div className="inline-flex items-start text-[#0f1111] tabular-nums">
                <span className="text-[12px] font-medium pt-0.5">S$</span>
                <span className="text-[24px] font-medium leading-none">{whole}</span>
                <span className="text-[12px] font-medium pt-0.5">{cents}</span>
              </div>

              {product.isPrime && (
                <div>
                  <PrimeBadge />
                </div>
              )}

              <div className="text-[13px] leading-snug">
                <span>{delivery.prefix}</span>
                <strong className="font-bold">{delivery.boldDate}</strong>
                <div className="text-[12px] text-[#565959] mt-0.5">
                  Order within <span className="text-[#007600] font-medium">5 hrs 18 mins</span>
                </div>
              </div>

              <div className="flex items-start gap-1.5 text-[12px] text-[#007185]">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#0f1111]" />
                <span>
                  Deliver to {locationLabel} {postalCode}
                </span>
              </div>

              <div className="text-[17px] font-medium text-[#007600]">In Stock</div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <label htmlFor="pdp-qty" className="text-[13px]">
                  Qty:
                </label>
                <select
                  id="pdp-qty"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="h-[32px] px-2.5 text-[13px] bg-[#f0f2f2] border border-[#d5d9d9] rounded-[7px] shadow-xs cursor-pointer focus:outline-none focus:border-[#007185]"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, activeVariant.name, activeVariant.image, quantity);
                    onClose();
                  }}
                  className="w-full py-2 px-4 text-[13px] font-medium rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-[#0f1111] cursor-pointer transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onBuyNow(product, activeVariant.name, activeVariant.image, quantity);
                    onClose();
                  }}
                  className="w-full py-2 px-4 text-[13px] font-medium rounded-full bg-[#ffa41c] hover:bg-[#fa8900] border border-[#ff8f00] text-[#0f1111] cursor-pointer transition-colors"
                >
                  Buy Now
                </button>
              </div>

              <div className="pt-2 border-t border-[#e7e7e7] text-[12px] space-y-1.5 text-[#565959]">
                <div className="grid grid-cols-3 gap-1">
                  <span>Ships from</span>
                  <span className="col-span-2 text-[#0f1111] font-medium">
                    {product.shipsFrom}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span>Sold by</span>
                  <span className="col-span-2 text-[#0f1111]">
                    {product.brand} Official SG
                  </span>
                </div>
                <div className="flex items-center gap-1.5 pt-1 text-[#007185]">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>15-day Returns & SG Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="px-5 sm:px-7 py-5 bg-[#fafafa] border-t border-[#e7e7e7]">
          <h3 className="font-display text-[17px] font-bold text-[#0f1111] mb-4">
            Top reviews from Singapore
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {product.reviews.map((rev) => {
              const markedHelpful = helpfulIds.includes(rev.id);
              return (
                <div
                  key={rev.id}
                  className="bg-white border border-[#e7e7e7] rounded-md p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-[#0f1111]">
                      {rev.author}
                    </span>
                    <span className="text-[11px] text-[#565959]">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={rev.rating} size="xs" />
                    <span className="text-[13px] font-bold text-[#0f1111]">
                      {rev.title}
                    </span>
                  </div>
                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#c45500]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Purchase</span>
                    </div>
                  )}
                  <p className="text-[13px] text-[#0f1111] leading-relaxed">
                    {rev.body}
                  </p>
                  <div className="pt-1 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setHelpfulIds((prev) =>
                          prev.includes(rev.id)
                            ? prev.filter((id) => id !== rev.id)
                            : [...prev, rev.id]
                        )
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border text-[12px] cursor-pointer ${
                        markedHelpful
                          ? 'bg-[#f0f8fa] border-[#007185] text-[#007185] font-medium'
                          : 'bg-white border-[#d5d9d9] text-[#0f1111] hover:bg-gray-50'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>
                        Helpful ({rev.helpfulCount + (markedHelpful ? 1 : 0)})
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
