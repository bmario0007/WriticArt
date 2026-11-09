import React from 'react';
import { ArrowLeft, Calendar, Clock, Share2, PhoneCall, Heart, ArrowRight } from 'lucide-react';
import { useErp } from '../context/ErpContext';
import { useNavigation } from '../context/NavigationContext';
import { useLanguage } from '../context/LanguageContext';

interface ArticleDetailPageProps {
  articleId: string | null;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleId }) => {
  const { articles } = useErp();
  const { navigateTo } = useNavigation();
  const { tr } = useLanguage();

  // Find article
  const article = articles.find((a) => a.id === articleId) || articles[0];

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-['Cormorant_Garamond']">{tr('Article introuvable', 'Article not found')}</h2>
        <button
          onClick={() => navigateTo('journal')}
          className="px-6 py-2 rounded-full bg-[#231B26] text-white text-xs font-['Cinzel']"
        >
          {tr('Retour au Journal', 'Back to Journal')}
        </button>
      </div>
    );
  }

  // Related articles in same category or other published
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.status === 'publie')
    .slice(0, 2);

  // Render text with headings & paragraphs
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n\n');
    return lines.map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={index}
            className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-medium text-[#181716] dark:text-[#FAF8F5] pt-6 pb-2"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }
      return (
        <p
          key={index}
          className="text-base sm:text-lg text-[#4A453F] dark:text-[#C5BCB0] leading-relaxed font-light"
        >
          {trimmed}
        </p>
      );
    });
  };

  return (
    <article className="pb-24 pt-8">
      {/* 1. TOP NAV / BACK BUTTON */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 flex items-center justify-between">
        <button
          onClick={() => navigateTo('journal')}
          className="inline-flex items-center space-x-2 text-xs font-['Cinzel'] uppercase font-bold text-[#8C8074] hover:text-[#E68314] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{tr('Retour au Journal d’Atelier', 'Back to Workshop Journal')}</span>
        </button>

        <span className="text-[11px] uppercase tracking-wider font-['Cinzel'] text-[#E68314] font-semibold">
          {article.category}
        </span>
      </div>

      {/* 2. ARTICLE HEADER */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6 mb-12">
        <div className="flex items-center justify-center space-x-3 text-xs text-[#8C8074]">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.date}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{tr(`${article.readTime} de lecture`, `${article.readTime} read`)}</span>
          </span>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-3xl sm:text-5xl lg:text-6xl font-light text-[#181716] dark:text-[#FAF8F5] leading-[1.12]">
          {article.title}
        </h1>

        <p className="text-base sm:text-xl text-[#6B6156] dark:text-[#B5ABA0] max-w-2xl mx-auto font-light leading-relaxed italic">
          « {article.excerpt} »
        </p>

        <div className="pt-2 flex items-center justify-center space-x-3 text-xs">
          <div className="w-8 h-8 rounded-full bg-[#E68314] text-white flex items-center justify-center font-['Cinzel'] font-bold text-xs">
            W
          </div>
          <span className="font-medium text-[#181716] dark:text-white font-['Cinzel']">
            {article.author}
          </span>
        </div>
      </header>

      {/* 3. COVER IMAGE */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-14">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD1] dark:border-[#2E2A26] bg-[#231B26]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 4. MAIN CONTENT BODY */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        {renderFormattedContent(article.content)}

        {/* Call-to-action Box inside article */}
        <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-[#FFF7EE] to-[#FAF8F5] dark:from-[#1C1814] dark:to-[#141210] border border-[#E68314]/30 space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#E68314] text-white flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-6 h-6" />
          </div>
          <h4 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl font-light text-[#181716] dark:text-[#FAF8F5]">
            {tr(
              'Envie de donner forme à ces mots pour qu’ils restent ?',
              'Ready to give shape to words so they stay forever?'
            )}
          </h4>
          <p className="text-xs sm:text-sm text-[#685F56] dark:text-[#A8A096] max-w-md mx-auto leading-relaxed">
            {tr(
              'Découvrez nos tableaux personnalisés en acrostiche ou précommandez votre coffret WriticLove (365 + 1 cartes).',
              'Explore our bespoke acrostic paintings or preorder your WriticLove box (365 + 1 cards).'
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('writiclove')}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#231B26] dark:bg-[#FAF8F5] text-white dark:text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-[#E68314] transition-all"
            >
              {tr('Découvrir WriticLove', 'Discover WriticLove')}
            </button>
            <a
              href="https://wa.me/221772348521?text=Bonjour%20WriticArt,%20j'ai%20lu%20votre%20article%20et%20je%20souhaite%20un%20conseil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white text-xs font-['Cinzel'] font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow hover:bg-[#20ba59] transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{tr('Échanger sur WhatsApp', 'Chat on WhatsApp')}</span>
            </a>
          </div>
        </div>

        {/* Share & return bar */}
        <div className="pt-8 border-t border-[#E8DFD1] dark:border-[#2E2A26] flex items-center justify-between">
          <button
            onClick={() => navigateTo('journal')}
            className="inline-flex items-center space-x-2 text-xs font-['Cinzel'] uppercase font-bold text-[#8C8074] hover:text-[#E68314] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{tr('Tous les articles', 'All articles')}</span>
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - WriticArt: https://bmario0007.github.io/WriticArt/#/article/${article.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 text-xs text-[#25D366] font-['Cinzel'] font-bold hover:underline"
          >
            <Share2 className="w-4 h-4" />
            <span>{tr('Partager cet article', 'Share article')}</span>
          </a>
        </div>
      </div>

      {/* 5. RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <aside className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 mt-16 border-t border-[#E8DFD1] dark:border-[#2E2A26]">
          <h3 className="font-['Cinzel'] text-xs uppercase tracking-widest text-[#8C8074] font-bold text-center mb-8">
            {tr('À Découvrir Également', 'Also Discover')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigateTo('article', rel.id)}
                className="group cursor-pointer rounded-2xl p-6 bg-white dark:bg-[#181716] border border-[#E8DFD1] dark:border-[#2E2A26] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-['Cinzel'] uppercase text-[#E68314] font-bold tracking-wider">
                    {rel.category}
                  </span>
                  <h4 className="font-['Cormorant_Garamond'] text-2xl font-light group-hover:text-[#E68314] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#6B6156] dark:text-[#A8A096] line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2ECE1] dark:border-[#26221E] mt-4 flex items-center justify-between text-xs font-['Cinzel'] font-bold text-[#E68314]">
                  <span>{tr('Lire l’article', 'Read article')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </article>
  );
};
