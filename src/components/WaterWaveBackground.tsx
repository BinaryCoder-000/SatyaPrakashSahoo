export function WaterWaveBackground() {
  return (
    <div className="water-wave-background" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none" role="presentation">
        <defs>
          <linearGradient id="water-gold-flow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#0c0c0b" />
            <stop offset="46%" stopColor="#141413" />
            <stop offset="100%" stopColor="#c4a35a" />
          </linearGradient>
          <filter id="water-distortion" x="-10%" y="-15%" width="120%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.022"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#water-gold-flow)" />

        <g className="water-wave-layer water-wave-layer--far" filter="url(#water-distortion)">
          <path d="M-200 190 C40 140 180 245 390 190 S760 140 990 190 S1360 245 1800 180" />
          <path d="M-200 350 C70 300 220 410 470 350 S830 295 1080 350 S1440 405 1800 335" />
          <path d="M-200 560 C80 510 270 610 510 558 S900 505 1160 558 S1510 620 1800 545" />
        </g>
        <g className="water-wave-layer water-wave-layer--mid" filter="url(#water-distortion)">
          <path d="M-200 250 C10 205 170 315 360 252 S725 205 930 255 S1310 315 1800 242" />
          <path d="M-200 455 C40 395 235 515 430 450 S790 395 1030 456 S1420 510 1800 442" />
          <path d="M-200 700 C40 645 205 755 425 698 S790 642 1015 705 S1430 755 1800 685" />
        </g>
        <g className="water-wave-layer water-wave-layer--near" filter="url(#water-distortion)">
          <path d="M-200 105 C80 50 245 160 455 105 S820 48 1060 110 S1430 165 1800 90" />
          <path d="M-200 620 C65 555 245 690 500 620 S875 553 1120 628 S1470 690 1800 612" />
          <path d="M-200 815 C55 755 250 865 475 808 S860 750 1110 815 S1490 875 1800 800" />
        </g>
      </svg>
    </div>
  );
}
