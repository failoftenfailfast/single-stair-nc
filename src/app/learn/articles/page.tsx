'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { client } from '../../../lib/sanity';

interface SubstackPost {
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

export default function ArticlesPage() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<SubstackPost | null>(null);
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
        
        // Find featured post
        const featured = allPosts.find((post: SubstackPost) => post.featured);
        const regularPosts = allPosts.filter((post: SubstackPost) => !post.featured);
        
        setFeaturedPost(featured || allPosts[0]);
        setPosts(regularPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-2xl font-black">LOADING ARTICLES...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link
              href="/learn"
              className="inline-flex items-center space-x-2 text-sm font-bold hover:underline mb-8"
            >
              <span>←</span>
              <span>BACK TO LEARN</span>
            </Link>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black mb-8 leading-none">
              ARTICLES
            </h1>
            <div className="w-32 h-1 bg-black mb-8"></div>
            <p className="text-xl md:text-2xl text-black font-medium leading-relaxed mb-12">
              LATEST INSIGHTS FROM CITYBUILDER NC ON HOUSING, URBAN PLANNING,
              AND POLICY DEVELOPMENTS ACROSS THE TRIANGLE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="section-padding bg-black text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm font-bold tracking-wider text-gray-300 mb-4 block">
                FEATURED ARTICLE
              </span>
              <div className="max-w-4xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                  {featuredPost.title}
                </h2>
                {featuredPost.description && (
                  <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                    {featuredPost.description}
                  </p>
                )}
                <div className="flex items-center space-x-6 mb-8 text-sm">
                  <span className="font-bold">{featuredPost.author}</span>
                  <span className="text-gray-400">
                    {formatDate(featuredPost.publishedAt)}
                  </span>
                  {featuredPost.tags && featuredPost.tags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      {featuredPost.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-white text-black px-2 py-1 text-xs font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Link
                  href={featuredPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 font-bold hover:underline text-lg"
                >
                  <span>READ ON SUBSTACK</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <h2 className="text-3xl font-black mb-4">NO ARTICLES YET</h2>
              <p className="text-lg text-gray-600 mb-8">
                Articles from CITYBUILDER will appear here once the RSS feed is populated.
              </p>
              <Link
                href="https://citybuildernc.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors"
              >
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
                  className="bg-white border-2 border-black shadow-brutal hover:shadow-brutal-hover transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-gray-500 tracking-wider">
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="text-xs font-bold bg-gray-100 px-2 py-1">
                        {post.author}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-black mb-4 leading-tight line-clamp-3">
                      {post.title}
                    </h3>
                    
                    {post.description && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-4">
                        {post.description}
                      </p>
                    )}
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs font-bold bg-gray-100 px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-sm font-bold hover:underline"
                    >
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

      {/* Newsletter CTA */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
              STAY INFORMED
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Subscribe to CITYBUILDER for regular updates on housing policy,
              urban planning, and advocacy opportunities across North Carolina.
            </p>
            <Link
              href="https://citybuildernc.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 font-bold hover:bg-gray-800 transition-colors shadow-brutal"
            >
              <span>SUBSCRIBE TO CITYBUILDER</span>
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
