export default function Crest({ size = 140, className = '' }) {
  return (
    <div
      className={`school-crest-wrap ${className}`}
      style={{ width: size, height: size }}
      aria-label="Mt. Elgon Academy Primary School Crest"
      role="img"
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="school-crest-svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="crestRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id="crestNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="crestSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="crestMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <filter id="crestShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer White Base Circle */}
        <circle cx="100" cy="100" r="96" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

        {/* Outer Navy Ring */}
        <circle cx="100" cy="100" r="91" fill="none" stroke="url(#crestNavy)" strokeWidth="6" />

        {/* Gold Accent Ring */}
        <circle cx="100" cy="100" r="85" fill="none" stroke="url(#crestGold)" strokeWidth="2" strokeDasharray="3 2" />

        {/* Inner Cream Field */}
        <circle cx="100" cy="100" r="82" fill="#F8FAFC" />

        {/* TOP RIBBON (Mt. Elgon Academy) */}
        <g filter="url(#crestShadow)">
          <path
            d="M 36 48 Q 100 32 164 48 L 160 66 Q 100 50 40 66 Z"
            fill="url(#crestRed)"
          />
          <path
            d="M 36 48 L 26 56 L 40 66 Z"
            fill="#991B1B"
          />
          <path
            d="M 164 48 L 174 56 L 160 66 Z"
            fill="#991B1B"
          />
          <path
            id="topRibbonPath"
            d="M 42 61 Q 100 45 158 61"
            fill="none"
          />
          <text fontSize="9.5" fontWeight="800" fill="#FFFFFF" letterSpacing="0.8">
            <textPath href="#topRibbonPath" startOffset="50%" textAnchor="middle">
              MT. ELGON ACADEMY
            </textPath>
          </text>
        </g>

        {/* CENTRAL SHIELD */}
        <g filter="url(#crestShadow)">
          {/* Shield Outline */}
          <path
            d="M 62 72 H 138 Q 140 114 100 144 Q 60 114 62 72 Z"
            fill="url(#crestSky)"
            stroke="url(#crestNavy)"
            strokeWidth="3.5"
          />

          {/* Left / Right Vertical Partition (Blue & White) */}
          <path
            d="M 63.5 73 H 100 V 143 Q 62 114 63.5 73 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          <path
            d="M 100 73 H 136.5 Q 138 114 100 143 Z"
            fill="#1E40AF"
            opacity="0.12"
          />

          {/* Sunburst behind Mountain */}
          <circle cx="100" cy="94" r="16" fill="url(#crestGold)" opacity="0.8" />

          {/* Mount Elgon Twin Peaks */}
          <path
            d="M 68 112 L 88 88 L 102 102 L 118 84 L 133 112 Z"
            fill="url(#crestMtn)"
          />
          {/* Snow Caps */}
          <path
            d="M 88 88 L 84 94 L 92 94 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 118 84 L 113 91 L 123 91 Z"
            fill="#FFFFFF"
          />

          {/* Open Book of Knowledge in Foreground */}
          <g transform="translate(100, 114)">
            {/* Book Base / Cover */}
            <path
              d="M -22 8 Q -10 2 0 6 Q 10 2 22 8 L 22 17 Q 10 11 0 15 Q -10 11 -22 17 Z"
              fill="url(#crestRed)"
            />
            {/* Book Pages */}
            <path
              d="M -20 6 Q -10 0 0 4 Q 10 0 20 6 L 20 14 Q 10 8 0 12 Q -10 8 -20 14 Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            {/* Text lines */}
            <line x1="-16" y1="9" x2="-4" y2="8" stroke="#64748B" strokeWidth="0.8" />
            <line x1="-16" y1="12" x2="-4" y2="11" stroke="#64748B" strokeWidth="0.8" />
            <line x1="4" y1="8" x2="16" y2="9" stroke="#64748B" strokeWidth="0.8" />
            <line x1="4" y1="11" x2="16" y2="12" stroke="#64748B" strokeWidth="0.8" />

            {/* Golden Key of Knowledge */}
            <g transform="translate(0, 18)">
              <circle cx="-10" cy="0" r="3.5" fill="none" stroke="url(#crestGold)" strokeWidth="1.6" />
              <line x1="-6.5" y1="0" x2="10" y2="0" stroke="url(#crestGold)" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="6" y1="0" x2="6" y2="3" stroke="url(#crestGold)" strokeWidth="1.6" strokeLinecap="round" />
              <line x1="9" y1="0" x2="9" y2="3.5" stroke="url(#crestGold)" strokeWidth="1.6" strokeLinecap="round" />
            </g>
          </g>
        </g>

        {/* BOTTOM MOTTO RIBBON (Elimu Ni Nguvu) */}
        <g filter="url(#crestShadow)">
          <path
            d="M 44 146 Q 100 162 156 146 L 152 164 Q 100 178 48 164 Z"
            fill="url(#crestNavy)"
          />
          <path
            d="M 44 146 L 34 154 L 48 164 Z"
            fill="#0F172A"
          />
          <path
            d="M 156 146 L 166 154 L 152 164 Z"
            fill="#0F172A"
          />
          <path
            id="bottomRibbonPath"
            d="M 50 160 Q 100 174 150 160"
            fill="none"
          />
          <text fontSize="8.5" fontWeight="800" fill="url(#crestGold)" letterSpacing="0.8">
            <textPath href="#bottomRibbonPath" startOffset="50%" textAnchor="middle">
              ELIMU NI NGUVU • KITALE
            </textPath>
          </text>
        </g>

        {/* Sub-text: PRIMARY SCHOOL */}
        <text
          x="100"
          y="186"
          textAnchor="middle"
          fontSize="7"
          fontWeight="700"
          fill="#475569"
          letterSpacing="1.2"
        >
          PRIMARY SCHOOL • EST. 1998
        </text>
      </svg>
    </div>
  )
}
