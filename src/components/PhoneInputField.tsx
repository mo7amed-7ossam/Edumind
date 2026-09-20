import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { CountryCode } from '../types';
import { COUNTRIES } from '../data/countries';

interface PhoneInputFieldProps {
  phoneNumber: string;
  onPhoneNumberChange: (val: string) => void;
  selectedCountry: CountryCode;
  onSelectCountry: (country: CountryCode) => void;
  placeholder?: string;
  isRtl: boolean;
}

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  selectedCountry,
  onSelectCountry,
  placeholder = '5X XXX XXXX',
  isRtl,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');

    // If Saudi Arabia and starts with 05, drop leading 0
    if (selectedCountry.code === 'SA' && raw.startsWith('05')) {
      raw = raw.slice(1);
    } else if (raw.startsWith('0')) {
      raw = raw.slice(1);
    }

    // Limit to max 9 digits for Saudi
    if (selectedCountry.code === 'SA' && raw.length > 9) {
      raw = raw.slice(0, 9);
    } else if (raw.length > 10) {
      raw = raw.slice(0, 10);
    }

    onPhoneNumberChange(raw);
  };

  return (
    <div className="relative space-y-1">
      <div className="relative flex items-center bg-white border border-[#E1D9CE] hover:border-[#CFBFA9] focus-within:border-[#B89360] focus-within:ring-2 focus-within:ring-[#B89360]/20 rounded-2xl transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-visible">
        
        {/* Country Code Picker Button */}
        <div ref={dropdownRef} className="relative">
          <button
            id="country-picker-btn"
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 py-3 px-3.5 border-e border-[#E8E1D6] hover:bg-[#FAF8F5] transition-colors cursor-pointer select-none"
          >
            <span className="text-base leading-none">{selectedCountry.flag}</span>
            <span className="text-xs font-semibold text-[#1C2532] font-mono dir-ltr">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8693A4]" />
          </button>

          {/* Country Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full start-0 mt-1.5 w-60 bg-white border border-[#E4DDD3] rounded-2xl shadow-xl z-50 py-1.5 max-h-60 overflow-y-auto">
              <div className="px-3 py-1 text-[10px] font-bold text-[#8693A4] uppercase tracking-wider">
                {isRtl ? 'اختر الدولة' : 'Select Country'}
              </div>
              {COUNTRIES.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    onSelectCountry(item);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs hover:bg-[#FAF7F2] transition-colors cursor-pointer ${
                    item.code === selectedCountry.code ? 'bg-[#F7F2E9] font-bold text-[#9D7945]' : 'text-[#1F2734]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.flag}</span>
                    <span>{isRtl ? item.nameAr : item.nameEn}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#788596] dir-ltr">{item.dialCode}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Phone Number Input */}
        <div className="relative flex-1 flex items-center">
          <input
            id="input-phone-number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            required
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full py-3 px-3.5 bg-transparent text-xs sm:text-sm font-medium text-[#19222E] placeholder:text-[#97A3B2] focus:outline-hidden dir-ltr font-mono tracking-wider"
          />
          <div className="pe-3.5 text-[#97A3B2] pointer-events-none">
            <Phone className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
