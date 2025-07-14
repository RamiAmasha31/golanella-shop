export default function StickyLogo({ sticky }) {
  // sticky: boolean - if true, render as sticky top; else render as absolute center
  return sticky ? (
    <div className="sticky top-0 z-50 bg-black flex justify-center py-4 shadow-md">
      <img
        src="/images/white-logo.png"
        alt="Logo"
        className="h-24 md:h-36 object-contain drop-shadow-xl"
      />
    </div>
  ) : (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <img
        src="/images/white-logo.png"
        alt="Logo"
        className="h-64 md:h-96 object-contain drop-shadow-xl z-50"
      />
    </div>
  );
}
