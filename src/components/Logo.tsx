import React from "react";
import clsx from "clsx";

interface LogoProps {
  className?: string;
  title?: string;
}

// Inline SVG logo with true transparent background (no raster, no glow)
// ViewBox sized to fit shapes tightly; scales responsively via Tailwind classes
const Logo: React.FC<LogoProps> = ({ className, title = "CessionBTP" }) => {
  return (
    <svg
      viewBox="0 0 820 230"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={clsx("w-auto", className)}
    >
      <title>{title}</title>
      {/* Blue X */}
      <path
        d="M25 25 L70 25 L115 70 L160 25 L205 25 L145 85 L205 145 L160 145 L115 100 L70 145 L25 145 L85 85 Z"
        fill="#2563eb"
      />
      {/* Orange angled arrow */}
      <path
        d="M115 160 L170 160 L170 140 L230 200 L170 220 L170 200 L115 200 Z"
        fill="#f59e0b"
      />

      {/* Wordmark */}
      <text
        x="260"
        y="105"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'"
        fontWeight="800"
        fontSize="66"
        fill="#f59e0b"
      >
        Cession
      </text>

      <text
        x="260"
        y="185"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'"
        fontWeight="900"
        fontStyle="italic"
        fontSize="96"
        fill="#0f172a"
      >
        BTP
      </text>
    </svg>
  );
};

export default Logo;
