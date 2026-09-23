export { Accordion as FaqList } from "./Accordion";
export type { AccordionItem as FaqItem } from "./Accordion";

export function StatsRow({ stats }: { stats: { value: string; caption: string }[] }) {
  return (
    <div className="stats page-stats">
      {stats.map((stat) => (
        <div className="stat" key={stat.caption}>
          <div className="n">{stat.value}</div>
          <div className="c">{stat.caption}</div>
        </div>
      ))}
    </div>
  );
}

export function QuoteGrid({
  quotes,
}: {
  quotes: { quote: string; name: string; store: string }[];
}) {
  return (
    <div className="quote-grid">
      {quotes.map((item) => (
        <blockquote className="quote-card" key={item.name}>
          <p>“{item.quote}”</p>
          <footer>
            <b>{item.name}</b>
            <span>{item.store}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
