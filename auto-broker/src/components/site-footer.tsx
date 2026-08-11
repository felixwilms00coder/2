import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Logo markClassName="h-8 w-8 text-primary" />
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Auto Broker is software, not a broker, adviser or portfolio
          manager. You write the rules, you connect your own broker account,
          you confirm every order. There is no server in the order path, and
          nothing here is a recommendation. See the project&apos;s README
          for the full reasoning behind that design.
        </p>
        <p className="mt-6 text-xs text-muted">
          © {new Date().getFullYear()} Auto Broker.
        </p>
      </div>
    </footer>
  );
}
