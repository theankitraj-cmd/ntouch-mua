import { groq } from "../lib/groq";
import fs from "fs";
import path from "path";
import slugify from "slugify";

const TOPICS = [
  "Bridal Makeup Trends in Patna 2025",
  "How to Prep Your Skin for a Winter Bihar Wedding",
  "The Magic of Airbrush vs HD Makeup for Indian Brides",
  "Traditional Bihari Bridal Looks: A Modern Twist",
  "Why Every Patna Bride Needs a Professional Trial",
  "The Perfect Saree Draping: Secrets for Your Big Day",
  "Monsoon Wedding Makeup Tips for Bihar Humidity",
  "Nikah Glam: Elegance and Tradition by Nancy Mehta",
  "Engagement Glow: Look Your Best on the First Celebration",
  "Haldi and Mehendi Makeup: Natural yet Vibrant"
];

const SYSTEM_PROMPT = `You are Nancy Mehta, a luxury professional makeup artist based in Patna, Bihar. 
You are Lakme Academy certified and worked at Miss Universe 2025. 
Your tone is elegant, professional, authoritative, but warm and locally relatable (Patna/Bihar context). 
You use terms like "Glow", "Transformation", "Elegance", "Professionalism".

Output ONLY a valid Markdown blog post with frontmatter.
FRONTMATTER:
---
title: "[Creative Catchy Title]"
date: "[ISO Date]"
excerpt: "[Short summary to hook readers, 150 chars]"
coverImage: "[Select a high-quality Unsplash URL related to the topic]"
author: "Nancy Mehta"
---

CONTENT:
Use H2, H3 headers. Include personal anecdotes about weddings in Patna (Boring Road, Kankarbagh). 
Mention the importance of high-end brands (MAC, Lakme, Huda Beauty). 
End with a call to action to "Book Your Look" at N.Touch.`;

export async function generateNewBlog() {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  
  console.log(`Generating blog on topic: ${topic}`);

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Write a 600-word blog post about: ${topic}. Mention your experience in Patna and why local expertise matters.` }
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
  });

  const content = completion.choices[0]?.message?.content || "";
  
  // Extract title for slug
  const titleMatch = content.match(/title: "(.*)"/);
  const title = titleMatch ? titleMatch[1] : topic;
  const slug = slugify(title, { lower: true, strict: true });
  
  const filePath = path.join(process.cwd(), "src/content/blogs", `${slug}.md`);
  
  // Ensure directory exists
  if (!fs.existsSync(path.join(process.cwd(), "src/content/blogs"))) {
    fs.mkdirSync(path.join(process.cwd(), "src/content/blogs"), { recursive: true });
  }

  fs.writeFileSync(filePath, content);
  console.log(`Successfully generated blog: ${filePath}`);
}

// If run directly
if (require.main === module) {
  generateNewBlog().catch(console.error);
}
