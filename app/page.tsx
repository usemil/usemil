import Link from "next/link";
import { tools } from "@/data/tools";
import { ArrowRight, Clock3, ShieldCheck } from "lucide-react";

export default function Home() {
  const categorizedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = [];
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof tools>);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Deep Blue with Pure White Heading */}
      <div className="px-6 py-20 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Convert & Process <span className="text-blue-400">Instantly</span>
        </h1>
        <p className="mx-auto max-w-2xl font-medium text-slate-300 md:text-xl">
          Secure, lightning-fast client utilities directly in your browser. No accounts, no clutter, completely free.
        </p>
        <div className="mx-auto mt-8 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 shadow-sm backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Your data is safe: processing runs 100% locally on your device.
        </div>
      </div>

      {/* Tools Catalog - Soft Cream-White Cards */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 space-y-16">
        {Object.entries(categorizedTools).map(([categoryName, categoryTools]) => (
          <section key={categoryName}>
            <div className="mb-8 flex items-center gap-4">
              <h2 className="text-2xl font-bold text-slate-200">{categoryName}</h2>
              <div className="h-px flex-grow bg-slate-700"></div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryTools.map((tool) => (
                <div
                  key={tool.slug}
                  className="flex flex-col justify-between rounded-3xl border border-slate-700 bg-[#95BDD7] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-2xl"
                >
                  <div>
                    <div className="mb-5 inline-flex rounded-2xl bg-blue-100 p-3.5 text-[#064ACB]">
                      <tool.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900">{tool.name}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-gray-600">{tool.description}</p>
                  </div>

                  <div className="mt-8">
                    {tool.available ? (
                      <Link
                        href={tool.slug}
                        className="flex w-full transform items-center justify-center gap-2 rounded-xl bg-[#064ACB] py-3.5 font-semibold text-white shadow-md transition-all active:scale-95 hover:bg-[#366ED8]"
                      >
                        Open Tool <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D51C39] bg-[#FF6060] py-3.5 text-sm font-medium text-[#FEEC41]">
                        <Clock3 className="h-4 w-4" />
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}