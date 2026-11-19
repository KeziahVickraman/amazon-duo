import React from 'react';
import { Globe } from 'lucide-react';
import { AmazonSgLogo } from './AmazonBranding';

const FOOTER_COLUMNS = [
  {
    title: 'Get to Know Us',
    links: ['About Amazon', 'Careers', 'Amazon Science'],
  },
  {
    title: 'Make Money with Us',
    links: [
      'Sell on Amazon',
      'Sell under Amazon Accelerator',
      'Become an Affiliate',
      'Advertise Your Products',
    ],
  },
  {
    title: 'Amazon Payment Products',
    links: ['Shop with Points', 'Reload Your Balance', 'Amazon Currency Converter'],
  },
  {
    title: 'Let Us Help You',
    links: [
      'Your Account',
      'Your Orders',
      'Shipping Rates & Policies',
      'Returns & Replacements',
      'Help',
    ],
  },
];

interface AmazonFooterProps {
  onFooterLinkClick: (label: string) => void;
}

export function AmazonFooter({ onFooterLinkClick }: AmazonFooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 bg-[#232f3e] text-white">
      <button
        type="button"
        onClick={scrollToTop}
        className="w-full py-3.5 bg-[#37475a] hover:bg-[#485769] text-[13px] font-medium text-white text-center transition-colors cursor-pointer"
      >
        Back to top
      </button>

      <div className="max-w-[1000px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-[15px] font-bold mb-2.5 text-white">
              {col.title}
            </h3>
            <ul className="space-y-1.5 text-[13px] text-[#dddddd]">
              {col.links.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    onClick={() => onFooterLinkClick(link)}
                    className="text-left hover:underline cursor-pointer"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#3a4553] py-6 px-4">
        <div className="max-w-[1000px] mx-auto flex flex-wrap items-center justify-center gap-6">
          <AmazonSgLogo className="scale-90" />
          <div className="flex items-center gap-2 text-[12px] text-[#cccccc]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#848688] rounded-[3px]">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#848688] rounded-[3px]">
              <span>SGD (S$)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#848688] rounded-[3px]">
              <span>Singapore</span>
            </span>
          </div>
        </div>
      </div>

      <div className="bg-[#131a22] py-5 px-4 text-center text-[12px] text-[#dddddd]">
        <div className="flex flex-wrap justify-center gap-4 mb-1.5">
          <span>Conditions of Use & Sale</span>
          <span>Privacy Notice</span>
          <span>Interest-Based Ads Notice</span>
        </div>
        <div className="text-[#999999]">
          © 1996-2026, Amazon.com, Inc. or its affiliates · Amazon Singapore Storefront
        </div>
      </div>
    </footer>
  );
}
