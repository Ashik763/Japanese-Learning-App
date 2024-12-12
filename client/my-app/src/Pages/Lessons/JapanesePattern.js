export function JapanesePattern() {
    return (
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="japanese-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M20 2 L38 20 L20 38 L2 20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#japanese-pattern)" className="text-sky-300" />
        </svg>
      </div>
    )
  }
  
  