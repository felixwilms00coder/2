import type { MetadataRoute } from "next";
import { categories } from "@/lib/content/categories";
import { articles } from "@/lib/content/articles";
import { tools } from "@/lib/content/tools";
import { quizzes } from "@/lib/content/quizzes";
import { games } from "@/lib/content/game";
import { blogPosts } from "@/lib/content/blog";
import { gidsen } from "@/lib/content/gidsen";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/leerstof",
    "/tools",
    "/quiz",
    "/spel",
    "/wetgeving",
    "/lexicon",
    "/blog",
    "/gids",
    "/over",
    "/disclaimer",
    "/privacybeleid",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${SITE_URL}/leerstof/${cat.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/leerstof/${article.categorySlug}/${article.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
    ...(article.dateModified
      ? { lastModified: article.dateModified }
      : {}),
  }));

  const toolRoutes = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  const quizRoutes = quizzes.map((quiz) => ({
    url: `${SITE_URL}/quiz/${quiz.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const gameRoutes = games.map((game) => ({
    url: `${SITE_URL}/spel/${game.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
    lastModified: post.publishedAt,
  }));

  const gidsRoutes = gidsen.map((gids) => ({
    url: `${SITE_URL}/gids/${gids.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...articleRoutes,
    ...toolRoutes,
    ...quizRoutes,
    ...gameRoutes,
    ...blogRoutes,
    ...gidsRoutes,
  ];
}
