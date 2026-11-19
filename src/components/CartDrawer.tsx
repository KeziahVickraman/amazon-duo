import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { PrimeBadge } from './AmazonBranding';

export interface CartItem {
  key: string;
  product: Product;
  colorName: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  postalCode: string;
  locationLabel: string;
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (orderNumber: string, total: number, itemCount: number) => void;
}

export function CartDrawer({
  open,
  items,
  postalCode,
  locationLabel,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}: CartDrawerProps) {
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    count: number;
  } | null>(null);

  if (!open) return null;

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeThreshold = 40;
  const qualifiesFree = subtotal >= freeThreshold || items.some((i) => i.product.isPrime);

  const handleCheckout = () => {
    const orderNum = `408-${Math.floor(1000000 + Math.random() * 8999999)}-${Math.floor(
      1000000 + Math.random() * 8999999
    )}`;
    setConfirmedOrder({
      orderNumber: orderNum,
      total: subtotal,
      count: totalCount,
    });
    onOrderPlaced(orderNum, subtotal, totalCount);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => {
          setConfirmedOrder(null);
          onClose();
        }}
        aria-hidden="true"
      />

      <aside
        aria-label="Shopping Cart"
        className="relative z-10 w-full max-w-[440px] bg-white h-full flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-[#131921] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#febd69]" />
            <h2 className="font-display text-[17px] font-bold">
              Shopping Cart ({totalCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            aria-label="Close Cart"
            className="p-1.5 rounded hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {confirmedOrder ? (
            <div className="border border-[#067d62]/30 bg-[#f2fbf7] rounded-lg p-5 space-y-3">
              <div className="flex items-start gap-2.5 text-[#067d62]">
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-[16px] text-[#0f1111]">
                    Order placed, thank you!
                  </h3>
                  <p className="text-[13px] text-[#565959] mt-0.5">
                    Confirmation sent for delivery to {locationLabel} {postalCode}.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-[#067d62]/20 text-[13px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#565959]">Order ID</span>
                  <span className="font-mono text-[12px] font-medium">
                    #{confirmedOrder.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#565959]">Items</span>
                  <span className="tabular-nums font-medium">{confirmedOrder.count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#565959]">Order Total</span>
                  <span className="tabular-nums font-bold text-[#0f1111]">
                    S${confirmedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="w-full mt-2 py-2 px-4 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-[13px] font-medium text-[#0f1111] cursor-pointer"
              >
                Continue shopping on Amazon.sg
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto text-[#888c8c]" />
              <h3 className="font-display text-[17px] font-bold text-[#0f1111]">
                Your Amazon.sg Cart is empty
              </h3>
              <p className="text-[13px] text-[#565959] max-w-[280px] mx-auto">
                Add iPhone Duo cases or screen protectors from the search results to get started.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-[13px] font-medium cursor-pointer"
              >
                Browse search results
              </button>
            </div>
          ) : (
            <>
              {/* Free Delivery Banner */}
              <div className="p-3 rounded-md bg-[#f7fafa] border border-[#d5d9d9] text-[12px]">
                {qualifiesFree ? (
                  <div className="flex items-center gap-2 text-[#067d62] font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      Your order qualifies for FREE Delivery in Singapore ({postalCode}).
                    </span>
                  </div>
                ) : (
                  <div className="text-[#0f1111]">
                    Add{' '}
                    <strong className="text-[#b12704] tabular-nums">
                      S${(freeThreshold - subtotal).toFixed(2)}
                    </strong>{' '}
                    more for FREE Delivery by Amazon.
                  </div>
                )}
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-[#e7e7e7]">
                {items.map((item) => (
                  <div key={item.key} className="py-4 flex gap-3.5">
                    <div className="w-20 h-20 bg-[#f7f7f7] rounded border border-[#e7e7e7] p-1.5 shrink-0">
                      <img
                        src={item.image}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[13px] leading-snug text-[#0f1111] font-medium line-clamp-2">
                        {item.product.title}
                      </h3>
                      <div className="text-[12px] text-[#565959] mt-0.5">
                        Colour: <span className="text-[#0f1111]">{item.colorName}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[15px] font-bold text-[#0f1111] tabular-nums">
                          S${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        {item.product.isPrime && <PrimeBadge compact />}
                      </div>

                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="inline-flex items-center border border-[#d5d9d9] rounded-full bg-[#f0f2f2]">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, -1)}
                            aria-label="Decrease quantity"
                            className="p-1.5 hover:bg-gray-200 rounded-l-full cursor-pointer"
                          >
                            {item.quantity === 1 ? (
                              <Trash2 className="w-3.5 h-3.5 text-[#565959]" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <span className="px-3 text-[13px] font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.key, 1)}
                            aria-label="Increase quantity"
                            className="p-1.5 hover:bg-gray-200 rounded-r-full cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          className="text-[12px] text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {items.length > 0 && !confirmedOrder && (
          <div className="p-5 border-t border-[#e7e7e7] bg-[#fafafa] space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[15px] text-[#0f1111]">
                Subtotal ({totalCount} {totalCount === 1 ? 'item' : 'items'}):
              </span>
              <span className="text-[20px] font-bold text-[#0f1111] tabular-nums">
                S${subtotal.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-2.5 px-4 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-[14px] font-medium text-[#0f1111] shadow-xs cursor-pointer transition-colors"
            >
              Proceed to checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
