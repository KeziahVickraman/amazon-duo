import React, { useState } from 'react';
import { X, ChevronRight, User, Package } from 'lucide-react';

interface AllMenuDrawerProps {
  open: boolean;
  signedInUser: string | null;
  onClose: () => void;
  onSelectCategory: (department: string | null, query?: string) => void;
  onOpenAccount: () => void;
}

export function AllMenuDrawer({
  open,
  signedInUser,
  onClose,
  onSelectCategory,
  onOpenAccount,
}: AllMenuDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        aria-label="All Departments Menu"
        className="relative z-10 w-[340px] max-w-[85vw] bg-white h-full flex flex-col shadow-2xl"
      >
        <div className="bg-[#232f3e] text-white px-6 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAccount();
            }}
            className="flex items-center gap-2.5 text-[16px] font-bold cursor-pointer"
          >
            <span className="w-7 h-7 rounded-full bg-white text-[#232f3e] flex items-center justify-center">
              <User className="w-4 h-4" />
            </span>
            <span>Hello, {signedInUser || 'sign in'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1 rounded hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#e7e7e7] text-[14px] text-[#0f1111]">
          <div className="py-3">
            <div className="px-6 py-2 font-display font-bold text-[16px]">
              Trending
            </div>
            {[
              { label: 'Best Sellers', dept: null, q: 'iphone duo case' },
              { label: 'New Releases', dept: null, q: 'iphone duo' },
              { label: 'Movers & Shakers', dept: 'Foldable Phone Cases', q: 'iphone duo case' },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  onSelectCategory(item.dept, item.q);
                  onClose();
                }}
                className="w-full px-6 py-2.5 text-left hover:bg-[#eaeded] flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#565959]" />
              </button>
            ))}
          </div>

          <div className="py-3">
            <div className="px-6 py-2 font-display font-bold text-[16px]">
              Shop By Department
            </div>
            {[
              'Foldable Phone Cases',
              'Mobile Phone Cases & Covers',
              'Wallet Cases',
              'Basic Cases',
              'Screen Protectors',
            ].map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => {
                  onSelectCategory(dept);
                  onClose();
                }}
                className="w-full px-6 py-2.5 text-left hover:bg-[#eaeded] flex items-center justify-between cursor-pointer"
              >
                <span>{dept}</span>
                <ChevronRight className="w-4 h-4 text-[#565959]" />
              </button>
            ))}
          </div>

          <div className="py-3">
            <div className="px-6 py-2 font-display font-bold text-[16px]">
              Programs & Features
            </div>
            {[
              { label: 'Amazon Prime Singapore', q: 'iphone duo case' },
              { label: 'Amazon International Store', q: 'iphone duo case' },
              { label: 'MagSafe Accessories', q: 'magsafe' },
            ].map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  onSelectCategory(null, item.q);
                  onClose();
                }}
                className="w-full px-6 py-2.5 text-left hover:bg-[#eaeded] flex items-center justify-between cursor-pointer"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#565959]" />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export interface PlacedOrder {
  orderNumber: string;
  date: string;
  total: number;
  itemCount: number;
  postalCode: string;
}

interface AccountOrdersModalProps {
  mode: 'account' | 'orders' | null;
  signedInUser: string | null;
  orders: PlacedOrder[];
  onClose: () => void;
  onSignIn: (name: string) => void;
  onSignOut: () => void;
}

export function AccountOrdersModal({
  mode,
  signedInUser,
  orders,
  onClose,
  onSignIn,
  onSignOut,
}: AccountOrdersModalProps) {
  const [nameInput, setNameInput] = useState('Keziah');

  if (!mode) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-[440px] bg-white rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#f0f2f2] px-5 py-3.5 border-b border-[#d5d9d9] flex items-center justify-between">
          <h2 className="font-display text-[15px] font-bold text-[#0f1111]">
            {mode === 'account' ? 'Your Amazon.sg Account' : 'Your Orders'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4 text-[#565959]" />
          </button>
        </div>

        <div className="p-5 text-[13px] space-y-4">
          {mode === 'account' ? (
            signedInUser ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-md bg-[#f7fafa] border border-[#d5d9d9]">
                  <div className="text-[12px] text-[#565959]">Signed in as</div>
                  <div className="font-display font-bold text-[16px] text-[#0f1111]">
                    {signedInUser}
                  </div>
                  <div className="text-[12px] text-[#007185] mt-0.5">
                    Amazon Prime Singapore Member
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onSignOut();
                    onClose();
                  }}
                  className="w-full py-2 px-4 rounded-lg border border-[#d5d9d9] hover:bg-[#f7fafa] font-medium cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (nameInput.trim()) {
                    onSignIn(nameInput.trim());
                    onClose();
                  }
                }}
                className="space-y-3"
              >
                <label className="block font-semibold text-[#0f1111]">
                  Sign in with your name for personalised SG delivery
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full h-[36px] px-3 border border-[#888c8c] rounded-[4px] focus:outline-none focus:border-[#007185]"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] font-medium cursor-pointer"
                >
                  Sign in
                </button>
              </form>
            )
          ) : orders.length === 0 ? (
            <div className="py-6 text-center space-y-2 text-[#565959]">
              <Package className="w-10 h-10 mx-auto text-[#888c8c]" />
              <div className="font-medium text-[#0f1111]">
                No orders placed yet in this session
              </div>
              <p className="text-[12px]">
                Add an item to your cart and complete checkout to track your Singapore order here.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[320px] overflow-y-auto">
              {orders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="p-3.5 rounded-md border border-[#d5d9d9] space-y-1"
                >
                  <div className="flex justify-between font-bold text-[#0f1111]">
                    <span className="font-mono text-[12px]">#{order.orderNumber}</span>
                    <span className="tabular-nums">S${order.total.toFixed(2)}</span>
                  </div>
                  <div className="text-[12px] text-[#565959]">
                    Placed {order.date} · {order.itemCount}{' '}
                    {order.itemCount === 1 ? 'item' : 'items'} · Delivering to Singapore{' '}
                    {order.postalCode}
                  </div>
                  <div className="text-[12px] font-semibold text-[#067d62]">
                    Preparing for dispatch
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
