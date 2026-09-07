export default function EnterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="enter-halo cut-corner relative border border-yellow bg-yellow/10 px-14 py-5 font-display text-xl font-bold tracking-[0.1em] text-yellow uppercase transition-colors hover:bg-yellow hover:text-bg md:text-2xl"
    >
      Войти
    </button>
  );
}
