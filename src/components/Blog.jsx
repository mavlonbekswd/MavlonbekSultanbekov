import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import { Dialog } from '@headlessui/react';
import { PortableText } from '@portabletext/react';
import { FaEye, FaHeart, FaCalendarAlt } from 'react-icons/fa';
import sanityClient from '../sanity';
import LikeExplosion from '../context/LikeExplosion';

const Blog = () => {
  const { isDark } = useTheme();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [explodingPostId, setExplodingPostId] = useState(null);
const [explosionType, setExplosionType] = useState('like'); // like yoki dislike uchun
const [visibleCount, setVisibleCount] = useState(6); // Boshlanish uchun 6 ta post ko'rsatamiz
  

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "post"]{
        _id,
        uzTitle,
        uzExcerpt,
        slug,
        mainImage{
          asset->{url}
        },
        uzContent,
        publishedAt,
        categories,
        views,
        likes
      }`)
      .then(data => setPosts(data))
      .catch(console.error);
  }, []);

      // 🔥 MODAL OCHILGANDA BODY SCROLL QOTADI
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedPost]);
 

  // 1. addView funksiyasi:
        const addView = async (postId, currentViews) => {
          try {
            await sanityClient
              .patch(postId)
              .set({ views: (currentViews ?? 0) + 1 })
              .commit();
            console.log('View count updated!');
          } catch (error) {
            console.error('Failed to update view count:', error);
          }
        };

        // 2. Postni ochganda (modal ochilganda) tekshirish:
        const handlePostClick = (post) => {
          const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts')) || [];

          if (!viewedPosts.includes(post._id)) {
            addView(post._id, post.views);
            viewedPosts.push(post._id);
            localStorage.setItem('viewedPosts', JSON.stringify(viewedPosts));
          }

          setSelectedPost(post);
        };

        const [likedPosts, setLikedPosts] = useState(() => {
          if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('likedPosts')) || [];
          }
          return [];
        });

      // Like tugmasini bosilganda
      const handleLikeToggle = (post) => {
        const hasLiked = likedPosts.includes(post._id);

        // 1. Frontendni darrov optimistik yangilash
        const updatedPosts = posts.map(p =>
          p._id === post._id
            ? { ...p, likes: (p.likes ?? 0) + (hasLiked ? -1 : 1) }
            : p
        );
        setPosts(updatedPosts);

        if (selectedPost && selectedPost._id === post._id) {
          setSelectedPost({
            ...selectedPost,
            likes: (selectedPost.likes ?? 0) + (hasLiked ? -1 : 1)
          });
        }

        // 2. likedPosts ni yangilash
        const newLikedPosts = hasLiked
          ? likedPosts.filter(id => id !== post._id)
          : [...likedPosts, post._id];
        setLikedPosts(newLikedPosts);
        localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));

        // 3. serverga so'rov yuborish
        sanityClient
          .patch(post._id)
          .set({ likes: (post.likes ?? 0) + (hasLiked ? -1 : 1) })
          .commit()
          .then(() => console.log('Like updated!'))
          .catch((err) => console.error('Failed to update like:', err));

          // Exploding boshlash
  setExplosionType(hasLiked ? 'dislike' : 'like');  // 💔 yoki ❤️
  setExplodingPostId(post._id);
  setTimeout(() => {
    setExplodingPostId(null);
  }, 800);
      };

  return (
    <>
      <Helmet>
        <title>Blog | Mavlonbek Sultanbekov</title>
        <meta name="description" content="Mavlonbek Sultanbekov blog maqolalari." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`min-h-screen ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px]`}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Blog</h1>

          {/* Blog List */}
          {/* Blog List */}
{posts.slice(0, visibleCount).map(post => (
  <motion.div
  key={post._id}
  onClick={() => handlePostClick(post)}
  whileHover={{ y: -2 }}  // faqat y-animatsiya
  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 mb-2
    ${isDark 
      ? 'border border-white/20 hover:border-white/30 hover:bg-[#23272e]' 
      : 'border border-black/20 hover:border-black/30 hover:bg-[#f3f4f6]'
    }`
  }
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {post.uzTitle}
        </h2>

        {post.uzExcerpt && (
  <p className={`mt-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
    {post.uzExcerpt}
  </p>
)}
        <div className={`flex items-center gap-3 mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
          {post.publishedAt && (
            <>
              <FaCalendarAlt /> {format(new Date(post.publishedAt), 'dd MMMM yyyy')}
            </>
          )}
        </div>
      </div>

      {/* Like va View */}
      <div className={`flex gap-5 mt-4 md:mt-0 text-sm ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
        <div className="flex items-center gap-1">
          <FaEye /> {post.views ?? 0}
        </div>

        {/* Like */}
        <div 
  onClick={(e) => {
    e.stopPropagation();
    handleLikeToggle(post); 
  }} 
  className="relative flex items-center gap-1 cursor-pointer"
>
  <div className="relative">
    <FaHeart className={`text-xs ${likedPosts.includes(post._id) ? 'text-red-500' : ''}`} />

    {/* Faqat shu post uchun explosion */}
    {explodingPostId === post._id && (
      <LikeExplosion type={explosionType} />
    )}
  </div>
  <span>{post.likes ?? 0}</span>
</div>
      </div>
    </div>
  </motion.div>
))}

          {/* Load More Button */}  
          {visibleCount < posts.length && (
  <div className="flex justify-center mt-8">
    <button
      onClick={() => setVisibleCount(prev => prev + 6)}
      className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-sm sm:text-base"
    >
      Load More
    </button>
  </div>
)}
        </div>

        {/* Modal */}
        <Dialog open={!!selectedPost} onClose={() => setSelectedPost(null)} className="relative z-50">
  <div className="fixed  inset-0   backdrop-blur-md  transition-all duration-300
            hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-black/40" aria-hidden="true" />

  <div className="fixed inset-0  flex items-center justify-center p-4">
  <Dialog.Panel className={`relative  rounded-2xl shadow-xl w-full md:mt-[5%] md:max-w-3xl mx-auto p-6 md:ml-[34%]  max-h-[80vh] overflow-y-auto  backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
            hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] ${isDark ? 'bg-[#232323] text-white' : 'bg-white text-gray-900'} `} >
      
      {/* Close Button */}
      <button
        onClick={() => setSelectedPost(null)}
        className="fixed  top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl"
      >
        &times;
      </button>

      {/* Main Image */}
      {selectedPost?.mainImage?.asset?.url && (
        <img
          src={selectedPost.mainImage.asset.url}
          alt={selectedPost.uzTitle}
          className="w-full h-60 object-cover rounded-xl mb-4"
        />
      )}

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        {selectedPost?.uzTitle || "No Title"}
      </h2>

      {/* Metadata */}
      <div className="flex flex-wrap gap-4 mb-4 text-gray-500 dark:text-gray-300 text-sm">
        {selectedPost?.publishedAt && (
          <div className="flex items-center gap-1">
            <FaCalendarAlt /> {format(new Date(selectedPost.publishedAt), 'dd MMMM yyyy')}
          </div>
        )}
        <div className="flex items-center gap-1">
          <FaEye /> {selectedPost?.views ?? 0}
        </div>


         {/* Like modal ichida */}
                {selectedPost && (
          <div 
            onClick={(e) => {
              e.stopPropagation();
              handleLikeToggle(selectedPost);
            }} 
            className="relative flex items-center gap-1 cursor-pointer transition-transform duration-300 active:scale-125"
          >
            <div className="relative">
              <FaHeart
                className={`text-xs transition-colors duration-300 ${
                  likedPosts.includes(selectedPost?._id) ? 'text-red-500' : ''
                }`}
              />
              {explodingPostId === selectedPost._id && (
                <LikeExplosion type={explosionType} />
              )}
            </div>
            <span>{selectedPost.likes ?? 0}</span>
          </div>
        )}


      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.isArray(selectedPost?.categories) && selectedPost.categories.map((cat, i) => (
          <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 dark:text-white text-gray-800">
            {typeof cat === 'string' ? cat : cat.title || 'Category'}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="prose dark:prose-invert max-w-none">
        {Array.isArray(selectedPost?.uzContent) && selectedPost.uzContent.length > 0 ? (
          <PortableText value={selectedPost.uzContent} />
        ) : (
          <p>{selectedPost?.uzContent || "No content available."}</p>
        )}
      </div>

    </Dialog.Panel>
  </div>
</Dialog>


      </motion.div>
    </>
  );
};

export default Blog;
