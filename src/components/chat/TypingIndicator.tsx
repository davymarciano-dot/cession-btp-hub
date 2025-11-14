export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
      <div className="flex gap-1">
        <span className="animate-bounce" style={{ animationDelay: '0ms' }}>●</span>
        <span className="animate-bounce" style={{ animationDelay: '150ms' }}>●</span>
        <span className="animate-bounce" style={{ animationDelay: '300ms' }}>●</span>
      </div>
      <span>En train d'écrire...</span>
    </div>
  );
};