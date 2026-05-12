function ModeButtons({ mode, switchMode }) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => switchMode("focus")}
        className={`px-5 py-2 rounded-full font-semibold font-serif transition duration-300 ${
          mode === "focus"
            ? "bg-red-500 text-white"
            : "bg-white/10 hover:bg-white/20 text-gray-200"
        }`}
      >
        Focus
      </button>

      <button
        onClick={() => switchMode("break")}
        className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${
          mode === "break"
            ? "bg-green-500 text-white"
            : "bg-white/10 hover:bg-white/20 text-gray-200"
        }`}
      >
        Break
      </button>
    </div>
  );
}

export default ModeButtons;