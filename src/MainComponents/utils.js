export const getDisplayName = (cat, language) => {
  const translations = {
    icecream: "גלידות",
    coldBar: "פס קר",
    hotBar: "פס חם",
    pancake: "באנקיק",
    fishfish: "פשפיש",
    hotDrinks: "שתיה חמה",
    coldDrinks: "שתיה קרה",
    individualMeals: "מנות אישיות",
  };
  return language === "en" ? cat : translations[cat] || cat;
};
