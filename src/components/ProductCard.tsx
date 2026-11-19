import React, { useState } from 'react';
import { Check, Smartphone } from 'lucide-react';
import { Product } from '../data/products';
import {
  PrimeBadge,
  StarRating,
  formatSgdPriceParts,
  getDeliveryPromiseText,
} from './AmazonBranding';

interface ProductCardProps {
  product: Product;
  postalCode: string;
  onSelectProduct: (product: Product, selectedColorIdx: number) => void;
  onAddToCart: (product: Product, selectedColorName: string, selectedImage: string) => void;
}

export function ProductCard({
  product,
  postalCode,
  onSelectProduct,
  onAddToCart,
}: ProductCardProps) {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant = product.colors[selectedColorIdx] || product.colors[0];
  const { whole, cents } = formatSgdPriceParts(product.price);
  const delivery = getDeliveryPromiseText(product.deliveryDays, product.isPrime);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, activeVariant.name, activeVariant.image);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article className="group flex flex-col bg-white border border-[#e7e7e7] rounded-[4px] overflow-hidden hover:border-[#c8cccc] transition-all duration-150">
      {/* Top Product Image Area */}
      <div
        onClick={() => onSelectProduct(product, selectedColorIdx)}
        className="relative aspect-square bg-[#f7f7f7] p-4 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {/* Single optional restrained badge (sharp corners, max 1 per card) */}
        {product.badge && (
          <div className="absolute top-0 left-0 z-10">
            {product.badge === 'Best Seller' && (
              <span className="inline-block bg-[#c45500] text-white text-[11px] font-semibold px-2 py-0.5 rounded-br-[4px]">
                Best Seller
              </span>
            )}
            {product.badge === "Amazon's Choice" && (
              <span className="inline-block bg-[#232f3e] text-white text-[11px] font-semibold px-2 py-0.5 rounded-br-[4px]">
                Amazon&apos;s <span className="text-[#febd69]">Choice</span>
              </span>
            )}
            {product.badge === 'Limited time deal' && (
              <span className="inline-block bg-[#cc0c39] text-white text-[11px] font-semibold px-2 py-0.5 rounded-br-[4px]">
                Limited time deal
              </span>
            )}
            {product.badge === 'Sponsored' && (
              <span className="inline-block bg-white/90 text-[#565959] text-[11px] px-2 py-0.5 border-b border-r border-[#e7e7e7]">
                Sponsored
              </span>
            )}
          </div>
        )}

        {!imgError ? (
          <img
            src={activeVariant.image}
            alt={`${product.title} - ${activeVariant.name}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 p-4 text-center rounded">
            <Smartphone className="w-10 h-10 mb-2 text-slate-400" />
            <span className="text-xs font-medium line-clamp-2">{product.brand} Duo Case</span>
          </div>
        )}
      </div>

      {/* Product Body Details */}
      <div className="flex flex-col flex-1 p-3.5 pt-2.5">
        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center gap-1.5 mb-2" aria-label="Color options">
            {product.colors.map((variant, idx) => {
              const isSelected = idx === selectedColorIdx;
              return (
                <button
                  key={variant.name}
                  type="button"
                  title={variant.name}
                  aria-label={`Select color ${variant.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorIdx(idx);
                    setImgError(false);
                  }}
                  className={`w-[18px] h-[18px] rounded-full p-[2px] cursor-pointer transition-transform ${
                    isSelected
                      ? 'ring-2 ring-[#007185] ring-offset-1 scale-105'
                      : 'border border-[#bbbfbf] hover:scale-105'
                  }`}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/15"
                    style={{ backgroundColor: variant.hex }}
                  />
                </button>
              );
            })}
            <span className="text-[11px] text-[#565959] ml-1 truncate">
              {activeVariant.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="mb-1.5">
          <button
            type="button"
            onClick={() => onSelectProduct(product, selectedColorIdx)}
            className="text-left text-[15px] leading-[1.35] font-normal text-[#0f1111] hover:text-[#c45500] line-clamp-3 cursor-pointer"
          >
            {product.title}
          </button>
        </h2>

        {/* Star Rating & Reviews */}
        <div className="flex items-center gap-1.5 mb-1">
          <button
            type="button"
            onClick={() => onSelectProduct(product, selectedColorIdx)}
            className="inline-flex items-center gap-1 cursor-pointer group/stars"
          >
            <span className="text-[12px] font-medium text-[#0f1111] tabular-nums">
              {product.rating.toFixed(1)}
            </span>
            <StarRating rating={product.rating} size="sm" />
            <span className="text-[12px] text-[#007185] group-hover/stars:text-[#c45500] tabular-nums">
              ({product.reviewCount.toLocaleString('en-SG')})
            </span>
          </button>
        </div>

        {/* Bought in past month */}
        {product.boughtInPastMonth && (
          <div className="text-[12px] text-[#565959] mb-2">
            {product.boughtInPastMonth}
          </div>
        )}

        {/* Price Block */}
        <div className="mt-auto pt-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="inline-flex items-start text-[#0f1111] leading-none tabular-nums">
              <span className="text-[12px] font-medium pt-[2px]">S$</span>
              <span className="text-[24px] font-medium tracking-tight">{whole}</span>
              <span className="text-[12px] font-medium pt-[2px]">{cents}</span>
            </span>

            {product.listPrice && (
              <span className="text-[12px] text-[#565959] tabular-nums">
                List:{' '}
                <span className="line-through">
                  S${product.listPrice.toFixed(2)}
                </span>
              </span>
            )}
          </div>

          {/* Prime + Delivery Info */}
          <div className="mt-1.5 space-y-0.5 text-[12px] leading-[1.35] text-[#0f1111]">
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.isPrime && <PrimeBadge compact />}
              <span>
                {delivery.prefix}
                <strong className="font-bold">{delivery.boldDate}</strong>
              </span>
            </div>
            <div className="text-[11px] text-[#565959]">
              {product.shipsFrom === 'Amazon.sg'
                ? `Ships to Singapore ${postalCode}`
                : `Ships from ${product.shipsFrom} · Free International Delivery`}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-3">
            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex items-center justify-center gap-1.5 px-4 py-1.5 text-[13px] font-medium rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                justAdded
                  ? 'bg-[#e7f4e4] border-[#067d62] text-[#067d62]'
                  : 'bg-[#ffd814] hover:bg-[#f7ca00] active:bg-[#f0b800] border-[#fcd200] text-[#0f1111]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Added to cart</span>
                </>
              ) : (
                <span>Add to cart</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
