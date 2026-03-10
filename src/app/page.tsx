import Link from 'next/link'

export default function Home() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center gap-8 p-8"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)' }}
    >
      <div className="text-center">
        <h1
          className="text-6xl font-black tracking-widest mb-2"
          style={{ color: '#f5c518', textShadow: '0 0 40px rgba(245,197,24,0.5)' }}
        >
          FAMILIADA
        </h1>
        <p className="text-blue-300 text-lg">System do prowadzenia gry</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl">
        <Link
          href="/host"
          className="flex-1 flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-blue-500 hover:border-yellow-400 hover:bg-blue-900/30 transition-all group"
        >
          <span className="text-5xl">🎙️</span>
          <span className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
            Prowadzący
          </span>
          <span className="text-sm text-blue-300 text-center">Panel kontrolny gry</span>
        </Link>

        <Link
          href="/board"
          target="_blank"
          rel="noopener"
          className="flex-1 flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-blue-500 hover:border-yellow-400 hover:bg-blue-900/30 transition-all group"
        >
          <span className="text-5xl">📺</span>
          <span className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
            Plansza
          </span>
          <span className="text-sm text-blue-300 text-center">
            Ekran dla graczy — otwórz w nowej zakładce
          </span>
        </Link>
      </div>

      <div className="mt-4 p-4 rounded-xl bg-blue-950/60 border border-blue-800 text-sm text-blue-300 max-w-md text-center">
        <strong className="text-yellow-400">Jak uruchomić:</strong>
        <ol className="mt-2 text-left space-y-1 list-decimal list-inside">
          <li>
            Otwórz panel <span className="text-white">Prowadzący</span>
          </li>
          <li>
            Kliknij <span className="text-white">Plansza</span> — otworzy się w nowej zakładce
          </li>
          <li>Wyświetl planszę na projektorze / TV</li>
          <li>Graj!</li>
        </ol>
      </div>
    </main>
  )
}
