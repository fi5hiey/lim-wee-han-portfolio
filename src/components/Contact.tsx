import { site, socials } from '../data/projects';
import ProximityText from './ProximityText';
import DecodeText from './DecodeText';

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-paper/10 bg-coal py-32 lg:py-44">
      <div className="bg-sunrise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative">
        <DecodeText className="label mb-10" text="04 — Contact" />
        <ProximityText lines={["Let's build", 'something', 'worth exploring.']} className="display text-[clamp(3rem,9vw,9.5rem)]" accentLast />

        <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-serif text-2xl text-paper/80">Have a project in mind?</p>
          <a
            href={`mailto:${site.email}`}
            data-magnetic
            data-cursor="SAY HI"
            className="inline-flex items-center gap-4 self-start rounded-full bg-crimson px-8 py-5 text-sm font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-vermil sm:self-auto"
          >
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>

        <ul className="mt-20 border-t border-paper/10">
          {socials.map((s) => (
            <li key={s.label} className="border-b border-paper/10">
              <a
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                data-cursor="OPEN"
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8"
              >
                <span className="label transition-colors group-hover:text-vermil">{s.label}</span>
                <span className="flex items-center gap-4">
                  <span className="link-line break-all font-serif text-2xl transition-transform duration-500 ease-out group-hover:-translate-x-3 sm:text-4xl">{s.value}</span>
                  <span aria-hidden="true" className="text-vermil opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:-translate-x-4">
                    ↗
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
