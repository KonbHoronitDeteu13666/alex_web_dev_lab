export default function EnterButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="enter-halo cut-corner relative grid gap-1 border border-yellow bg-yellow/10 px-12 py-4.5 text-yellow transition-colors hover:bg-yellow hover:text-bg"
    >
      <span className="font-display text-xl font-bold tracking-[0.1em] uppercase md:text-[22px]">
        Войти
      </span>
      <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase opacity-75">
        подключение к креслу
      </span>
    </button>
  );
}
