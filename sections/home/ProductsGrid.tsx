import { ArrowRight } from "lucide-react";
import {
  ProductIcon,
  type ProductIconName,
} from "@/components/illustrations/ProductIcons";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PRODUCTS } from "@/lib/data";
import { ROUTES } from "@/lib/site";

export function ProductsGrid() {
  return (
    <Section id="products">
      <div className="container-x">
        <SectionHeading
          eyebrow={PRODUCTS.eyebrow}
          title={PRODUCTS.title}
          lede={PRODUCTS.lede}
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.items.map((item, i) => (
            <RevealItem key={item.title}>
              <article className="panel panel-hover group relative h-full overflow-hidden p-7">
                <span
                  className="data absolute right-6 top-6 text-xs text-line-2 transition-colors duration-500 group-hover:text-red"
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>

                <ProductIcon
                  name={item.icon as ProductIconName}
                  className="h-10 w-10 text-red transition-transform duration-500 group-hover:-translate-y-1"
                />

                <h3 className="mt-6 font-display text-xl font-semibold text-heading">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.15} className="mt-10">
          <ButtonLink href={`${ROUTES.contact}#enquiry`}>
            Request a Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
