export const ConfirmIcon = () => (
  <svg
    width="215"
    height="215"
    viewBox="0 0 215 215"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_473_1042)">
      <rect
        x="38"
        y="38"
        width="139"
        height="139"
        rx="69.5"
        fill="url(#paint0_radial_473_1042)"
      />
      <path
        d="M78.3339 107.5L97.7794 126.946L136.666 88.0547"
        stroke="white"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_473_1042"
        x="0"
        y="0"
        width="215"
        height="215"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="8"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow_473_1042"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="15" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.752941 0 0 0 0 0.796078 0 0 0 0.75 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_473_1042"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_473_1042"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_473_1042"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(107.5 107.5) rotate(90) scale(69.5)"
      >
        <stop stopColor="#FFC0CB" />
        <stop offset="0.025" stopColor="#FFC0CB" />
        <stop offset="1" stopColor="#FFC0CB" />
      </radialGradient>
    </defs>
  </svg>
);
