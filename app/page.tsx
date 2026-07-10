
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
      {/* Hero Section */}
      <div className="px-6 py-20 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
          Convert & Process <span className="text-blue-400">Instantly</span>
        </h1>

        <p className="mx-auto max-w-2xl text-base font-medium text-slate-300 md:text-xl">
          Secure, lightning-fast client utilities directly in your browser. No
          accounts, no clutter, completely free.
        </p>

        <div className="mx-auto mt-8 flex max-w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 shadow-sm backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Your data is safe: processing runs 100% locally on your device.
        </div>
      </div>

      {/* Tools */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 pb-24 sm:px-6">
        {Object.entries(categorizedTools).map(
          ([categoryName, categoryTools]) => (
            <section
  key={categoryName}
  id={categoryName
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")}
>
              <div className="mb-8 flex items-center gap-4">
                <h2 className="text-xl font-bold text-slate-200 sm:text-2xl">
                  {categoryName}
                </h2>
                <div className="h-px flex-grow bg-slate-700"></div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {categoryTools.map((tool) => (
                  <div
                    key={tool.slug}
                    className="flex h-full flex-col justify-between rounded-2xl border border-slate-700 bg-[#95BDD7] p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-2xl sm:p-5 lg:rounded-3xl lg:p-6"
                  >
                    <div>
                      <div className="mb-3 inline-flex rounded-xl bg-blue-100 p-2.5 text-[#064ACB] sm:mb-4 sm:rounded-2xl sm:p-3">
                        <tool.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>

                      <h3 className="text-base font-bold leading-tight text-gray-900 sm:text-lg lg:text-xl">
                        {tool.name}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-gray-700 sm:text-sm sm:leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-5 sm:mt-6 lg:mt-8">
                      {tool.available ? (
                        <Link
                          href={tool.slug}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#064ACB] py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#366ED8] active:scale-95 sm:py-3.5"
                        >
                          Open Tool
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D51C39] bg-[#FF6060] py-2.5 text-xs font-medium text-[#FEEC41] sm:py-3.5 sm:text-sm">
                          <Clock3 className="h-4 w-4" />
                          Coming Soon
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        )}
      </div>
    </div>
  );
}

