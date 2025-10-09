'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { client } from '../../../lib/sanity';

interface NewsPost {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  url: string;
  publishedAt: string;
  author: string;
  featured: boolean;
  tags?: string[];
}

export default function NewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const query = `
          *[_type == "substackPost"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            description,
            url,
            publishedAt,
            author,
            featured,
            tags
          }
        `;
        const allPosts = await client.fetch(query);
        const featured = allPosts.find((post: NewsPost) => post.featured);
        const regularPosts = allPosts.filter((post: NewsPost) => !post.featured);
        setFeaturedPost(featured || allPosts[0] || null);
        setPosts(regularPosts);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen surface-primary flex items-center justify-center">
        <div className="text-display-sm loading">LOADING NEWS...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen surface-primary">
      <section className="section-padding surface-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link href="/learn" className="link-brutal inline-flex items-center space-x-tight mb-section">
              <span>←</span>
              <span>BACK TO LEARN</span>
            </Link>
            <h1 className="text-display-xl mb-section">NEWS</h1>
            <div className="w-32 h-1 bg-border-primary mb-section"></div>
            <p className="text-body-lg text-content-secondary mb-section-lg text-balance">
              Latest updates and analysis from CITYBUILDER on housing and urban policy.
            </p>
          </motion.div>
        </div>
      </section>

      {featuredPost && (
        <section className="section-padding surface-inverse">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="text-caption text-content-tertiary mb-element block">FEATURED</span>
              <div className="max-w-4xl">
                <h2 className="text-display-md text-content-inverse mb-content">{featuredPost.title}</h2>
                {featuredPost.description && (
                  <p className="text-body-lg text-content-tertiary mb-section">{featuredPost.description}</p>
                )}
                <div className="flex items-center space-x-content mb-section text-body-sm">
                  <span className="font-bold text-content-inverse">{featuredPost.author}</span>
                  <span className="text-content-tertiary">{formatDate(featuredPost.publishedAt)}</span>
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex items-center space-x-tight">
                      {featuredPost.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-surface-primary text-content-primary px-tight py-1 text-caption">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Link href={featuredPost.url} target="_blank" rel="noopener noreferrer" className="link-inverse inline-flex items-center space-x-tight text-body-lg">
                  <span>READ ON CITYBUILDER</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="section-padding surface-secondary">
        <div className="container-custom">
          {posts.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <h2 className="text-3xl font-black mb-4">NO NEWS YET</h2>
              <p className="text-lg text-content-secondary mb-8">Once imported, recent posts will appear here.</p>
              <Link href="https://citybuildernc.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-brand-500 text-white px-6 py-3 font-semibold hover:bg-brand-600 transition-colors">
                <span>VISIT CITYBUILDER</span>
                <span>→</span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="surface-primary border border-border-primary shadow-soft hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-content-tertiary tracking-wider">{formatDate(post.publishedAt)}</span>
                      <span className="text-xs font-semibold bg-surface-secondary px-2 py-1">{post.author}</span>
                    </div>
                    <h3 className="text-xl font-black mb-4 leading-tight line-clamp-3">{post.title}</h3>
                    {post.description && (
                      <p className="text-sm text-content-secondary leading-relaxed mb-6 line-clamp-4">{post.description}</p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs font-medium bg-surface-secondary px-2 py-1">{tag}</span>
                        ))}
                      </div>
                    )}
                    <Link href={post.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-sm font-semibold hover:underline text-brand-700 hover:text-brand-800">
                      <span>READ MORE</span>
                      <span>→</span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


