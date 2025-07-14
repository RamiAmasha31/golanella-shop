import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "he", label: "עברית" },
];

export default function LanguageSelector({ language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-2xl"
        aria-label="Toggle language menu"
      >
        {language === "en" ? "US" : "HE"}
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg p-2 w-24 z-50">
          {languages.map(({ code }) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code);
                setMenuOpen(false);
              }}
              className={`block w-full text-center text-xl py-1 hover:bg-gray-200 rounded ${
                language === code ? "font-bold" : ""
              }`}
            >
              {code === "en" ? "US" : "HE"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
