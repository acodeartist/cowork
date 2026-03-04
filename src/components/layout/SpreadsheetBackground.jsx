export default function SpreadsheetBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent, transparent 29px, #e6e6e3 29px, #e6e6e3 30px),
            repeating-linear-gradient(0deg, transparent, transparent 29px, #e6e6e3 29px, #e6e6e3 30px)
          `,
        }}
      />
    </div>
  );
}
