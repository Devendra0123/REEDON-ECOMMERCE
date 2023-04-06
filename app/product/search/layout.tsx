import Category from "@/components/Category";

export default function SearchLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Category /> 
        {children}
      </section>
    );
  }