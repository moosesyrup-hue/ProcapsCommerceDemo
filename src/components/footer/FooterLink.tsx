interface FooterLinkProps {
  label: string;
  onClick?: () => void;
  isLastItem?: boolean;
}

export default function FooterLink({ label, onClick, isLastItem = false }: FooterLinkProps) {
  const isClickable = !!onClick;

  return (
    <p 
      className={`${isLastItem ? '' : 'mb-0'} ${isClickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
    >
      {label}
    </p>
  );
}
