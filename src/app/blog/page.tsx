import Link from "next/link";
import { getSortedBlogsData } from "@/lib/blog-engine";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nancy's Insights | Best Bridal Makeup Tips in Patna",
  description: "Exclusive makeup tips, bridal skincare guides, and wedding trend reports by Nancy Mehta, Professional Makeup Artist in Patna.",
};

export default async function BlogListPage() {
  const blogs = await getSortedBlogsData();

  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      {/* Editorial Header */}
      <section className="mb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8 py-16 border-b border-blush-200">
          <div className="max-w-2xl">
            <p className="font-body text-sm tracking-[0.25em] uppercase text-gold-600 mb-6">Nancy's Insights</p>
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-light text-plum leading-[0.9]">
              The <span className="italic text-blush-500 underline decoration-1 underline-offset-8">Glow</span> Report
            </h1>
          </div>
          <p className="font-body text-lg text-plum-soft max-w-sm italic opacity-75">
            Crafting timeless beauty, one insight at a time. Expert perspectives from Bihar's premier bridal studio.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {blogs.length === 0 ? (
            <div className="col-span-full py-20 text-center opacity-50 font-body italic text-xl">
              Curating the next chapter of beauty... Check back soon.
            </div>
          ) : (
            blogs.map((blog, i) => (
              <Link 
                key={blog.slug} 
                href={`/blog/${blog.slug}`}
                className="group flex flex-col"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-[40px] mb-8 border border-blush-100 shadow-xl group-hover:shadow-2xl transition-all duration-700">
                  <img 
                    src={blog.coverImage || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200"} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                  />
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold-600">{blog.author || "Nancy Mehta"}</span>
                    <span className="w-1 h-1 rounded-full bg-blush-300" />
                    <span className="font-body text-[10px] tracking-[0.2em] uppercase text-plum/40">{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="font-display text-3xl md:text-3xl font-light text-plum mb-4 leading-tight group-hover:text-blush-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="font-body text-sm text-plum-soft line-clamp-2 leading-relaxed opacity-70">
                    {blog.excerpt}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
