export default function Layout({ children, className }: { children: React.ReactNode; className?: string; }) {
  return (
    <section className={`max-w-[1100px] px-4 mx-auto my-16 transition-colors ${className || ''}`}>
      {children}
    </section>
  );
}