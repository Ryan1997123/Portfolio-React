import React, { useState, useRef, useEffect } from "react";
import { Globe } from "@phosphor-icons/react";
import { useLanguage, LANGUAGES } from "../../lib/LanguageContext";

export function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLangObj = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <div
      className={`relative inline-block text-left select-none ${className}`}
      ref={dropdownRef}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onDoubleClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-zinc-300 transition-all hover:border-[#B10E1E] hover:text-white focus:outline-none"
        aria-label="Select website language"
        aria-expanded={isOpen}
        data-cursor="pointer"
      >
        <Globe size={16} weight="bold" className="text-[#B10E1E]" />
        <span>{activeLangObj.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="language-menu absolute right-0 mt-2 w-36 rounded-lg border border-white/15 bg-[#121212] p-1.5 shadow-xl backdrop-blur-md z-50">
          {LANGUAGES.map((item) => {
            const isSelected = item.code === lang;
            return (
              <button
                key={item.code}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.code !== lang) {
                    setLang(item.code);
                  }
                  setIsOpen(false);
                }}
                onDoubleClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-[#B10E1E]/20 text-white font-semibold"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                }`}
                data-cursor="pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{item.flag}</span>
                  <span>{item.label}</span>
                </span>
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B10E1E]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
