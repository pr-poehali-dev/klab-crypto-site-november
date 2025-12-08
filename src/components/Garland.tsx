const Garland = () => {
  const colors = ['#FFD700', '#FF4444', '#44FF44', '#4444FF', '#FF44FF', '#44FFFF'];
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-around py-2 bg-gradient-to-b from-black/30 to-transparent">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full garland-light"
          style={{
            backgroundColor: colors[i % colors.length],
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Garland;
