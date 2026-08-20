import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, NAV, ROUTES, SITE, mailLink, telLink } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="on-dark border-t border-line bg-deep">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_1fr_1fr]">
          {/* brand */}
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              IS 16172:2023 certified parallel-thread rebar couplers — forged
              before threaded, 100% gauge-checked, NABL tested.{" "}
              <span className="text-heading">Build with trust. Build with AGBA.</span>
            </p>
            <p className="data mt-6 text-xs tracking-wider text-muted-2">
              GSTIN: {SITE.gstin}
            </p>
          </div>

          {/* explore */}
          <div>
            <h3 className="data text-xs font-medium uppercase tracking-[0.18em] text-heading">
              Explore
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 py-1.5 text-sm text-muted transition-colors hover:text-red"
                  >
                    <span className="h-px w-0 bg-red transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`${ROUTES.trace}#downloads`}
                  className="group inline-flex items-center gap-2 py-1.5 text-sm text-muted transition-colors hover:text-red"
                >
                  <span className="h-px w-0 bg-red transition-all duration-300 group-hover:w-3" />
                  Downloads
                </Link>
              </li>
              <li>
                <Link
                  href={`${ROUTES.about}#knowledge-center`}
                  className="group inline-flex items-center gap-2 py-1.5 text-sm text-muted transition-colors hover:text-red"
                >
                  <span className="h-px w-0 bg-red transition-all duration-300 group-hover:w-3" />
                  Knowledge Center
                </Link>
              </li>
              <li>
                <Link
                  href={`${ROUTES.about}#news`}
                  className="group inline-flex items-center gap-2 py-1.5 text-sm text-muted transition-colors hover:text-red"
                >
                  <span className="h-px w-0 bg-red transition-all duration-300 group-hover:w-3" />
                  News &amp; Events
                </Link>
              </li>
            </ul>
          </div>

          {/* addresses — both link out to Google Maps */}
          <div className="space-y-8">
            {CONTACT.offices.map((o) => (
              <div key={o.kind}>
                <h3 className="data text-xs font-medium uppercase tracking-[0.18em] text-heading">
                  {o.kind}
                </h3>
                <a
                  href={o.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex gap-3 py-1 text-sm text-muted transition-colors hover:text-red"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.75} />
                  <span>
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </a>
              </div>
            ))}
          </div>

          {/* contact */}
          <div>
            <h3 className="data text-xs font-medium uppercase tracking-[0.18em] text-heading">
              Get In Touch
            </h3>
            <ul className="mt-5 space-y-3">
              {CONTACT.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={telLink(p.tel)}
                    className="flex items-center gap-3 py-1.5 text-sm text-muted transition-colors hover:text-red"
                  >
                    <Phone className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                    <span className="data">{p.display}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={mailLink("Enquiry from agbacorp.com")}
                  className="flex items-center gap-3 py-1.5 text-sm text-muted transition-colors hover:text-red"
                >
                  <Mail className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                  <span className="break-all">{CONTACT.email}</span>
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-2">{CONTACT.hours}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p className="data tracking-wider">
            IS 16172:2023 · ISO 9001:2015 · ISO 45001:2018 · NABL TESTED
          </p>
        </div>
      </div>
    </footer>
  );
}
