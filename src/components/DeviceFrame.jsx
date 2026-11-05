/** Device shells for the screen recordings: a laptop, a browser window and a phone. */

export function Laptop({ children, glow = '#ff5b1f' }) {
  return (
    <div className="relative mx-auto w-full">
      <div
        className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 opacity-60 blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${glow}55, transparent 70%)` }}
      />
      <div className="rounded-[18px] border border-white/10 bg-[#0c0c0f] p-[1.6%] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative mx-auto mb-[0.8%] h-1.5 w-1.5 rounded-full bg-white/15" />
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-ink-3">{children}</div>
      </div>
      <div className="relative mx-auto h-3 w-[112%] -translate-x-[5.35%] rounded-b-[14px] rounded-t-[3px] bg-gradient-to-b from-[#2a2a2f] to-[#121215] sm:h-4">
        <div className="absolute left-1/2 top-0 h-1.5 w-[14%] -translate-x-1/2 rounded-b-md bg-black/50" />
      </div>
    </div>
  );
}

export function BrowserWindow({ children, url, glow = '#ff5b1f' }) {
  const host = url ? new URL(url).host : '';
  return (
    <div className="relative mx-auto w-full">
      <div
        className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 opacity-60 blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${glow}55, transparent 70%)` }}
      />
      <div className="overflow-hidden rounded-[14px] border border-white/10 bg-[#0c0c0f] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-3 border-b border-white/5 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="mx-auto max-w-[60%] truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[10px] text-ash sm:text-[11px]">
            {host}
          </div>
          <span className="w-10" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-3">{children}</div>
      </div>
    </div>
  );
}

export function Phone({ children, glow = '#ff5b1f' }) {
  return (
    <div className="relative mx-auto w-[min(300px,70%)]">
      <div
        className="pointer-events-none absolute -inset-x-16 -inset-y-10 -z-10 opacity-60 blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${glow}55, transparent 70%)` }}
      />
      <div className="rounded-[2.6rem] border border-white/10 bg-[#0c0c0f] p-2.5 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-ink-3">
          <div className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}

export function Device({ type, url, glow, children }) {
  if (type === 'phone') return <Phone glow={glow}>{children}</Phone>;
  if (type === 'browser') return <BrowserWindow url={url} glow={glow}>{children}</BrowserWindow>;
  return <Laptop glow={glow}>{children}</Laptop>;
}
