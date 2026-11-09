import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, Search, Feather } from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';

export const BlogPage: React.FC = () => {
  const { articles } = useErp();
  const { navigateTo } = useNavigation();
  const { tr } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  // Only show published articles on the public website
  const publishedArticles = articles.filter((a) => a.status === 'publie');

  const categories = ['Tous', ...Array.from(new Set(publishedArticles.map((a) => a.category)))];

  const filteredArticles = publishedArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'Tous' || art.category === selectedCategory;
    const matchesQuery =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featuredArticle = publishedArticles.find((a) => a.featured) || publishedArticles[0];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO HEADER */}
      <section className="relative overflow-hidden pt-12 pb-14 border-b border-[#E8DFD1]/60 dark:border-[#2A2622]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full border border-[#E68314]/30 bg-[#FFF7EE] dark:bg-[#1E1914] text-xs text-[#B86209] dark:text-[#E68314] font-['Cinzel'] tracking-wider font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-[#E68314]" />
            <span>{tr('Chroniques & Rituels • Atelier Dakar', 'Chronicles & Rituals • Dakar Workshop')}</span>
          </div>

          <h1 className="font-['Cormorant_Garamond'] text-4xl sm:text-6xl font-light text-[#181716] dark:text-[#FAF8F5]">
            {tr('Le Journal d’Atelier', 'The Workshop Journal')}
          </h1>

          <p className="text-sm sm:text-base text-[#685F56] dark:text-[#A8A096] max-w-xl mx-auto font-light leading-relaxed">
            {tr(
              'Histoires de couples, art de l’acrostiche, conseils pour nourrir votre amour au quotidien et secrets de dorure artisanale.',
              'Couple stories, the art of acrostics, guidance to nurture love daily, and artisanal gilding secrets.'
            )}
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8C8074]" />
            <input
              type="text"
              placeholder={tr('Rechercher un article, un rituel, un conseil...', 'Search an article, ritual, or tip...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] text-xs focus:outline-none focus:border-[#E68314] shadow-sm text-[#181716] dark:text-white"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-['Cinzel'] tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] font-bold shadow'
                  : 'bg-white dark:bg-[#1A1816] text-[#6B6156] dark:text-[#B5ABA0] border border-[#E8DFD1] dark:border-[#2E2A26] hover:border-[#E68314]'
              }`}
            >
              {cat === 'Tous' ? tr('Tous', 'All') : cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED ARTICLE (If 'Tous' & no search) */}
      {selectedCategory === 'Tous' && !searchQuery && featuredArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            onClick={() => navigateTo('article', featuredArticle.id)}
            className="group cursor-pointer rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] bg-white dark:bg-[#181716] shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 h-72 lg:h-[420px] overflow-hidden bg-[#231B26]">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-[#FFF7EE] dark:bg-[#201B15] text-[#B86209] dark:text-[#E68314] font-['Cinzel'] font-bold uppercase tracking-wider text-[10px]">
                    ★ {tr('À la Une', 'Featured')} • {featuredArticle.category}
                  </span>
                  <span className="text-[#8C8074] flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                </div>

                <h2 className="font-['Cormorant_Garamond'] text-3xl sm:text-4xl font-light text-[#181716] dark:text-[#FAF8F5] leading-snug group-hover:text-[#E68314] transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#6B6156] dark:text-[#A8A096] leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#F2ECE1] dark:border-[#26221E] flex items-center justify-between">
                <div className="text-[11px] text-[#8C8074]">
                  <span className="block font-medium text-[#181716] dark:text-white">{featuredArticle.author}</span>
                  <span>{featuredArticle.date}</span>
                </div>

                <span className="inline-flex items-center space-x-1.5 text-xs font-['Cinzel'] font-bold text-[#E68314] group-hover:translate-x-1 transition-transform">
                  <span>{tr('Lire l’article', 'Read article')}</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD1] dark:border-[#2E2A26] mb-8">
          <h3 className="font-['Cinzel'] text-xs font-bold uppercase tracking-widest text-[#8C8074]">
            {tr(`Tous les Articles (${filteredArticles.length})`, `All Articles (${filteredArticles.length})`)}
          </h3>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#181716] rounded-3xl border border-[#E8DFD1] dark:border-[#2E2A26] space-y-3">
            <Feather className="w-8 h-8 text-[#E68314] mx-auto opacity-50" />
            <p className="font-['Cormorant_Garamond'] text-2xl font-light text-[#181716] dark:text-white">
              {tr('Aucun article ne correspond à votre recherche', 'No articles match your search')}
            </p>
            <p className="text-xs text-[#8C8074]">
              {tr(
                'Essayez avec un autre mot-clé ou réinitialisez la catégorie.',
                'Try another keyword or reset the category filter.'
              )}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => navigateTo('article', art.id)}
                className="group cursor-pointer bg-white dark:bg-[#181716] rounded-3xl overflow-hidden border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#231B26]">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#231B26]/90 backdrop-blur text-white text-[10px] font-['Cinzel'] font-bold uppercase tracking-wider">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-3 text-[11px] text-[#8C8074]">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{art.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{art.readTime}</span>
                      </span>
                    </div>

                    <h4 className="font-['Cormorant_Garamond'] text-2xl font-light leading-snug group-hover:text-[#E68314] transition-colors text-[#181716] dark:text-[#FAF8F5]">
                      {art.title}
                    </h4>

                    <p className="text-xs text-[#6B6156] dark:text-[#A8A096] leading-relaxed line-clamp-3 font-light">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#F2ECE1] dark:border-[#26221E] mt-4 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#8C8074] italic">
                    {tr(`Par ${art.author}`, `By ${art.author}`)}
                  </span>

                  <span className="font-['Cinzel'] font-bold text-[#E68314] flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>{tr('Lire', 'Read')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
