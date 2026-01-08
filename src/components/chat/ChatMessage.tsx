interface ChatMessageProps {
  type: 'andrew' | 'user';
  content: string;
}

// Helper to parse simple markdown-style formatting
function parseFormattedText(text: string) {
  const parts = [];
  const regex = /(\*\*.*?\*\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the bold part
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        bold: false
      });
    }
    
    // Add bold text (remove ** markers)
    parts.push({
      text: match[0].replace(/\*\*/g, ''),
      bold: true
    });
    
    lastIndex = regex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      bold: false
    });
  }
  
  return parts.length > 0 ? parts : [{ text, bold: false }];
}

export default function ChatMessage({ type, content }: ChatMessageProps) {
  const isAndrew = type === 'andrew';
  const formattedParts = parseFormattedText(content);

  return (
    <div className={`flex ${isAndrew ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`rounded-2xl px-4 py-3 max-w-[85%] ${
          isAndrew
            ? 'bg-white text-[#003b3c]'
            : 'bg-[#009296] text-white'
        }`}
      >
        <p className="text-[14px] sm:text-base xl:text-lg leading-[1.5] whitespace-pre-line">
          {formattedParts.map((part, index) => 
            part.bold ? (
              <strong key={index} className="font-semibold">{part.text}</strong>
            ) : (
              <span key={index}>{part.text}</span>
            )
          )}
        </p>
      </div>
    </div>
  );
}