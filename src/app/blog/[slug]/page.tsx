import { getBlogData, getSortedBlogsData } from "@/lib/blog-engine";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getSortedBlogsData();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogData(slug);
  if (!blog) return {};

  return {
    title: `${blog.title} | Nancy's Insights`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage || ""],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog) notFound();

  return (
    <article className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center p-6 sm:p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src={blog.coverImage || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000"} 
            alt={blog.title} 
            className="w-full h-full object-cover object-top brightness-50"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl text-center text-white">
          <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold-400 mb-8 opacity-80">{new Date(blog.date).toLocaleDateString()}</p>
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-light mb-10 leading-[0.9] drop-shadow-2xl">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <span className="w-10 h-px bg-white/30" />
            <span className="font-body text-[10px] tracking-widest uppercase text-white/60">By {blog.author || "Nancy Mehta"}</span>
            <span className="w-10 h-px bg-white/30" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-[700px] mx-auto px-6 py-24 sm:py-32">
        <div 
          className="font-body text-lg md:text-xl text-plum-soft leading-relaxed prose prose-plum prose-lg prose-headings:font-display prose-headings:font-light prose-headings:text-plum prose-headings:tracking-tight prose-a:text-blush-600 prose-blockquote:font-display prose-blockquote:text-2xl prose-blockquote:italic prose-blockquote:text-plum/40 prose-blockquote:border-l-gold-500 prose-img:rounded-[40px] prose-img:shadow-2xl"
          dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
        />
        
        {/* Author Bio Footer */}
        <div className="mt-32 pt-16 border-t border-blush-100 flex items-center gap-8">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blush-200">
            <img src="/nancy-mehta-hero-bridal.jpg" alt="Nancy Mehta Professional Makeup Artist in Patna" className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-display text-lg text-plum mb-1">Nancy Mehta</h4>
            <p className="font-body text-xs text-plum/50 tracking-wide">
              Lakme Academy Certified Professional Makeup Artist based in Patna. 
              Transforming voices of beauty into masterpieces of confidence.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
