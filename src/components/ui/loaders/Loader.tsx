export default function Loader() {
  const delays = [0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7, 3]

  return (
    <section className="z-10 fixed inset-0 flex justify-center items-center w-dvw h-dvh size-full bg-bg">
      {delays.map((delay, i) => (
        <i
          key={i}
          className="block absolute size-12 opacity-0 rounded-full animate-[hole-scale_3s_linear_infinite]"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      <style>{`
        @keyframes hole-scale {
          0% {
            transform: scale(2);
            opacity: 0;
            box-shadow: 0px 0px 50px rgba(255, 255, 255, 0.5);
          }
          50% {
            transform: scale(1) translate(0px, -5px);
            opacity: 1;
            box-shadow: 0px 8px 20px rgba(255, 255, 255, 0.5);
          }
          100% {
            transform: scale(0.1) translate(0px, 5px);
            opacity: 0;
            box-shadow: 0px 10px 20px rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </section>
  )
}
