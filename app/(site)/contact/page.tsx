import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/sections/contact/ContactForm";
import { CTABand } from "@/sections/shared/CTABand";
import { CONTACT_PAGE } from "@/lib/data";
import { CONTACT, SITE, mailLink, telLink, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Let's spec your connection",
  description:
    "Send your bar grade, diameter range and quantity. AGBA's technical team responds with sizing, test certificates and a quote, usually within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={CONTACT_PAGE.eyebrow}
        title={CONTACT_PAGE.title}
        lede={CONTACT_PAGE.lede}
      />

      <Section id="enquiry" bordered={false}>
        <div className="container-x grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* ---- every detail here is a live link ---- */}
          <Reveal delay={0.12} direction="left" className="space-y-4">
            {/* phones */}
            <div className="panel p-6">
              <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
                Call us
              </p>
              <ul className="mt-4 space-y-3">
                {CONTACT.phones.map((p) => (
                  <li key={p.tel}>
                    <a
                      href={telLink(p.tel)}
                      className="group flex items-center gap-3 text-sm text-heading transition-colors hover:text-red"
                    >
                      <Phone
                        className="h-4 w-4 shrink-0 text-red transition-transform duration-300 group-hover:-rotate-12"
                        strokeWidth={1.75}
                      />
                      <span className="data">{p.display}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* email */}
            <a
              href={mailLink("Enquiry from agbacorp.com")}
              className="panel panel-hover group block p-6"
            >
              <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
                Email us
              </p>
              <span className="mt-4 flex items-center gap-3 text-sm text-heading transition-colors group-hover:text-red">
                <Mail
                  className="h-4 w-4 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
                <span className="break-all">{CONTACT.email}</span>
              </span>
            </a>

            {/* whatsapp */}
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="panel panel-hover group block p-6"
            >
              <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
                WhatsApp
              </p>
              <span className="mt-4 flex items-center gap-3 text-sm text-heading transition-colors group-hover:text-[#25D366]">
                <MessageCircle
                  className="h-4 w-4 shrink-0 text-[#25D366] transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.75}
                />
                <span>Chat with our technical team</span>
              </span>
            </a>

            {/* addresses → Google Maps */}
            {CONTACT.offices.map((o) => (
              <a
                key={o.kind}
                href={o.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="panel panel-hover group block p-6"
              >
                <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
                  {o.kind}
                </p>
                <span className="mt-4 flex items-start gap-3 text-sm text-heading">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                  <span>
                    {o.lines.map((l) => (
                      <span key={l} className="block leading-relaxed">
                        {l}
                      </span>
                    ))}
                    <span className="mt-2 block text-xs text-muted-2 underline-offset-4 group-hover:underline">
                      Open in Google Maps
                    </span>
                  </span>
                </span>
              </a>
            ))}

            {/* hours + GSTIN */}
            <div className="panel p-6">
              <p className="flex items-center gap-3 text-sm text-muted">
                <Clock className="h-4 w-4 shrink-0 text-red" strokeWidth={1.75} />
                {CONTACT.hours}
              </p>
              <p className="data mt-4 border-t border-line pt-4 text-xs tracking-wider text-muted-2">
                GSTIN: {SITE.gstin}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- map ---- */}
      <Section id="map" tight>
        <div className="container-x">
          <Reveal>
            <div className="panel overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
                <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
                  Manufacturing Works · MIDC Butibori
                </p>
                <a
                  href={CONTACT.offices[1].maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted underline-offset-4 transition-colors hover:text-red hover:underline"
                >
                  Get directions
                </a>
              </div>
              {/* Loaded with referrerPolicy no-referrer so the embed can't see
                  which page the visitor came from. */}
              <iframe
                title="AGBA Corporation manufacturing works, MIDC Butibori, Nagpur"
                src="https://www.google.com/maps?q=MIDC%20Butibori%2C%20Nagpur%20441122&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full grayscale-[0.4] contrast-[1.1]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
