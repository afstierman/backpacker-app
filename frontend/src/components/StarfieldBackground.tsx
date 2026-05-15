function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(42);
const stars = Array.from({ length: 200 }, () => ({
  x: rand() * 100,
  y: rand() * 100,
  r: 0.1 + rand() * 0.1,
  duration: 2 + rand() * 4,
  delay: -(rand() * 5),
}));

const StarfieldBackground = () => (
  <div
    className="fixed inset-0 overflow-hidden"
    style={{ background: "#06060e" }}>
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.85; }
          }
          .star { animation: twinkle var(--d) ease-in-out var(--del) infinite; }
        `}</style>
      </defs>
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="white"
          className="star"
          style={
            {
              "--d": `${s.duration}s`,
              "--del": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  </div>
);

export default StarfieldBackground;
