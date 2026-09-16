import React from "react";
import { FlaskConical } from "lucide-react";

// Same freely-licensed stock photo (Pexels License — free for any use, no
// attribution required) used by the reference design this is matched to.
const BACKDROP_URL =
  "https://images.pexels.com/photos/8442096/pexels-photo-8442096.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1100&w=1600";

const ACTIVITY_BARS = [25, 53, 84, 25, 53, 84, 25, 53, 84, 25, 53, 84];

/** Small logo lockup — shown standalone on mobile where the brand panel is hidden. */
export function AuthMobileBrand() {
  return (
    <div className="lg:hidden flex items-center gap-2.5 mb-11 text-white font-[family-name:var(--font-grotesk)] font-semibold text-sm tracking-[0.13em]">
      <div className="h-8 w-8 rounded-[10px] bg-[#00f0ff] grid place-items-center shadow-[0_0_18px_rgba(0,240,255,0.35)] shrink-0">
        <FlaskConical size={16} className="text-[#060911]" />
      </div>
      REVOLGA BIOGENICS
    </div>
  );
}

/**
 * The dark decorative left panel shared by every auth screen (login, signup,
 * forgot password, ...). Fully static — no props — so it stays visually
 * identical across the flow. Colors/typography match the approved reference
 * design pixel-for-pixel; copy is adapted to Revolga Biogenics.
 */
export function AuthBrandPanel() {
  return (
    <div
      className="hidden lg:flex relative overflow-hidden border-r border-[rgba(0,240,255,0.15)] min-h-screen flex-col"
      style={{
        background: `linear-gradient(135deg, rgba(4,16,27,0.2), rgba(4,16,27,0.95)), url('${BACKDROP_URL}') center/cover`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(0,240,255,0.09), transparent 35%, rgba(6,9,17,0.85))" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.33]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.07) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage: "linear-gradient(180deg, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(180deg, black, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[1] flex-1 flex flex-col p-11 xl:p-[54px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-[10px] bg-[#00f0ff] grid place-items-center shadow-[0_0_18px_rgba(0,240,255,0.35)] shrink-0">
            <FlaskConical size={18} className="text-[#060911]" />
          </div>
          <div>
            <p className="text-[#f8fafc] font-[family-name:var(--font-grotesk)] font-bold text-[15px] leading-none tracking-[0.18em]">
              REVOLGA BIOGENICS
            </p>
            <p className="mt-1 text-[#6e839a] text-[8px] tracking-[0.16em]">MEDICAL &amp; HEALTHCARE</p>
          </div>
        </div>

        {/* Headline */}
        <div className="mt-auto mb-[60px] max-w-[500px]">
          <div className="flex items-center gap-2.5 text-[#00f0ff] text-[9px] tracking-[0.16em] font-[family-name:var(--font-mono-display)]">
            <span className="w-[19px] h-px bg-[#00f0ff] shadow-[0_0_7px_#00f0ff]" />
            SECURE PLATFORM ACCESS
          </div>
          <h1 className="my-[22px] font-[family-name:var(--font-grotesk)] font-semibold text-[clamp(43px,5vw,74px)] leading-[0.98] tracking-[-0.07em] text-[#f8fafc]">
            Precision in
            <br />
            <span className="text-[#00f0ff] [text-shadow:0_0_24px_rgba(0,240,255,0.36)]">every prescription.</span>
          </h1>
          <p className="max-w-[360px] text-[#b4c4d0] text-[13px] leading-[1.7]">
            Advancing healthcare through quality medical solutions — one secure workspace for the people, stock and
            proof moving medicine forward.
          </p>
        </div>

        {/* Activity widget */}
        <div className="max-w-[380px] border-t border-[rgba(0,240,255,0.28)] pt-[13px]">
          <p className="text-[#00f0ff] text-[9px] tracking-[0.12em] font-[family-name:var(--font-mono-display)]">
            TODAY&apos;S ACTIVITY &middot; DEMO DATA
          </p>
          <div className="h-7 flex items-end gap-[5px] my-3">
            {ACTIVITY_BARS.map((h, i) => (
              <i
                key={i}
                className="block flex-1 not-italic animate-[pulsebar_2.2s_ease-in-out_infinite_alternate]"
                style={{
                  height: `${h}%`,
                  background: i % 2 === 1 ? "#00ffaa" : "#00f0ff",
                  boxShadow: "0 0 9px rgba(0,240,255,0.55)",
                  animationDelay: i % 4 === 3 ? "-0.7s" : undefined,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[8px] font-[family-name:var(--font-mono-display)] text-[#758a9e]">
            <span className="flex items-center gap-1.5 text-[#00ffaa]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ffaa] shadow-[0_0_0_4px_rgba(0,255,170,0.1),0_0_10px_#00ffaa]" />
              SYSTEM STATUS: OPERATIONAL
            </span>
            <span>DEMO ENVIRONMENT</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-[1] h-[84px] flex items-center gap-[13px] px-11 xl:px-[54px] text-[#60758b] text-[8px] tracking-[0.1em] font-[family-name:var(--font-mono-display)]">
        <span>MEDICAL &amp; HEALTHCARE PLATFORM</span>
        <span className="flex-1 h-px bg-[rgba(0,240,255,0.2)]" />
        <span>KOCHI, KERALA</span>
      </div>
    </div>
  );
}
