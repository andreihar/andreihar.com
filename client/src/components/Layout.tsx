export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <section className="max-w-[1100px] px-4 mx-auto my-16 transition-colors">
      {children}
    </section>
  );
}