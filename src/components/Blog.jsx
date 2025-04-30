import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { format } from 'date-fns';
import { Helmet } from 'react-helmet';
import { Dialog } from '@headlessui/react';
import { PortableText } from '@portabletext/react';
import { FaEye, FaHeart, FaCalendarAlt } from 'react-icons/fa';
import sanityClient from '../sanity';
import LikeExplosion from '../context/LikeExplosion';
import { GiBookCover } from "react-icons/gi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { useLanguage } from '../context/LanguageContext'; // manzilingni to'g'ri qo'y
import { useNavigate, useParams } from 'react-router-dom'; 
import {  fadeInUp,  } from '../utils/animations';
import { useMemo } from 'react';
import { BsPinAngleFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';


// contextdan language olamiz

const Blog = () => {
  const { isDark } = useTheme();
   const { t  } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [explodingPostId, setExplodingPostId] = useState(null);
const [explosionType, setExplosionType] = useState('like'); // like yoki dislike uchun
const [visibleCount, setVisibleCount] = useState(4); // Boshlanish uchun 6 ta post ko'rsatamiz
const [isModalLoading, setIsModalLoading] = useState(false);
const modalContentRef = useRef(null);
const [modalScroll, setModalScroll] = useState(0);
const { language } = useLanguage();
const navigate = useNavigate(); // URL o'zgartirish uchun
const { slug } = useParams(); // URL ichidan `slug`ni olish uchun
const [explosionVisible, setExplosionVisible] = useState(false);
const pinnedPost = useMemo(() => posts.find(post => post.isPinned), [posts]);
const otherPosts = useMemo(() => 
  posts
    .filter(post => !post.isPinned)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)), 
[posts]);



  
useEffect(() => {
  sanityClient
    .fetch(`*[_type == "post"]  {
      _id,
      uzTitle,
      ruTitle,
      enTitle,
      uzExcerpt,
      ruExcerpt,
      enExcerpt,
  
      uzSlug,
      ruSlug,
      enSlug,
      mainImage{ asset->{url} },
      uzContent,
      ruContent,
      enContent,
      publishedAt,
      categories,
      views,
      likes,
      isPinned
    }`)
    .then(data => setPosts(data))
    .catch(console.error);
}, []);

 
useEffect(() => {
  if (!slug || posts.length === 0) return;

  const matchedPost = posts.find(post => {
    if (language === 'uz') return post.uzSlug?.current === slug;
    if (language === 'ru') return post.ruSlug?.current === slug;
    if (language === 'en') return post.enSlug?.current === slug;
    return false;
  });

  if (matchedPost) {
    // loading effekti orqali ochamiz
    setIsModalLoading(true);
    setTimeout(() => {
      setSelectedPost(matchedPost); // 🔥 Faqat matched bo‘lsa modal ochiladi
      setIsModalLoading(false);
    }, 1000);
  }
}, [slug, posts, language]);





 
  // 📌 Browserda localStorage dan 'bookmarkedPosts' ni olib, boshlang'ich state yaratamiz
const [bookmarkedPosts, setBookmarkedPosts] = useState(() => {
  if (typeof window !== 'undefined') {
    // Agar localStorage'da saqlangan postlar bo'lsa, ularni olib kelamiz
    return JSON.parse(localStorage.getItem('bookmarkedPosts')) || [];
  }
  // Agar yo'q bo'lsa, bo'sh array beramiz
  return [];
});

// 📌 Bookmark tugmasi bosilganda post ID sini qo'shish yoki o'chirish
const handleBookmarkToggle = (postId) => {
  let updatedBookmarks;

  // Agar bu post avval bookmark qilingan bo'lsa, o'chirib tashlaymiz
  if (bookmarkedPosts.includes(postId)) {
    updatedBookmarks = bookmarkedPosts.filter(id => id !== postId);
  } else {
    // Aks holda, bookmark listiga qo'shamiz
    updatedBookmarks = [...bookmarkedPosts, postId];
  }

  // 📌 Frontend state'ni yangilaymiz
  setBookmarkedPosts(updatedBookmarks);

  // 📌 LocalStorage'ni yangilab saqlab qo'yamiz
  localStorage.setItem('bookmarkedPosts', JSON.stringify(updatedBookmarks));
};

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

        const handlePostClick = (post) => {
          const postSlug = 
            language === 'uz' ? post.uzSlug?.current :
            language === 'ru' ? post.ruSlug?.current :
            post.enSlug?.current;
        
          if (!postSlug) return;
        
          const targetPath = `/blog/${postSlug}`;
          const currentPath = window.location.pathname;
        
          setSelectedPost(null); // Modalni tozalaymiz
          setIsModalLoading(true); // Loader yoqamiz
        
          if (currentPath === targetPath) {
            // Agar shu post ochiq bo‘lsa, avval boshqa sahifaga navigate qilamiz, keyin qaytamiz
            navigate('/', { replace: true }); 
            setTimeout(() => navigate(targetPath), 20); // 20ms keyin qayta navigate
          } else {
            navigate(targetPath);
          }
        };
        
        
        

       

        const [likedPosts, setLikedPosts] = useState(() => {
          if (typeof window !== 'undefined') {
            return JSON.parse(localStorage.getItem('likedPosts')) || [];
          }
          return [];
        });
        const closeModal = () => {
          setSelectedPost(null);
          navigate('/blog');
        };
        // 🔥 Faqat bitta selectedPost state ochamiz (localStorage bilan)
        const [selectedPost, setSelectedPost] = useState(() => {
          if (typeof window !== 'undefined') {
            const savedPost = localStorage.getItem('selectedPost');
            return savedPost ? JSON.parse(savedPost) : null;
          }
          return null;
        });

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
}, [selectedPost]); // ✅ faqat bitta [selectedPost] arrayda  

      // Like tugmasini bosilganda
      const handleLikeToggle = (post) => {
        const hasLiked = likedPosts.includes(post._id);
      
        const updatedPosts = posts.map(p =>
          p._id === post._id
            ? { ...p, likes: (p.likes ?? 0) + (hasLiked ? -1 : 1) }
            : p
        );
        setPosts(updatedPosts);
      
        // ✅ Agar selectedPost ochilgan bo'lsa, uni ham frontendda yangilaymiz
        if (selectedPost && selectedPost._id === post._id) {
          setSelectedPost(prev => ({
            ...prev,
            likes: (prev.likes ?? 0) + (hasLiked ? -1 : 1)
          }));
        }
      
        // ✅ Like qilingan postlar ro‘yxatini yangilash
        const newLikedPosts = hasLiked
          ? likedPosts.filter(id => id !== post._id)
          : [...likedPosts, post._id];
        setLikedPosts(newLikedPosts);
        localStorage.setItem('likedPosts', JSON.stringify(newLikedPosts));
      
        // ✅ Sanity backendni ham yangilash
        sanityClient
          .patch(post._id)
          .set({ likes: (post.likes ?? 0) + (hasLiked ? -1 : 1) })
          .commit()
          .then(() => console.log('Like updated!'))
          .catch(err => console.error('Failed to update like:', err));
      
        // ✅ Explosion animatsiya
        setExplosionType(hasLiked ? 'dislike' : 'like');
        setExplodingPostId(post._id);
        setTimeout(() => {
          setExplodingPostId(null);
        }, 800);
      };

      const handleModalLikeToggle = () => {
        if (!selectedPost) return;
      
        const hasLiked = likedPosts.includes(selectedPost._id);
      
        // Frontend optimistik yangilash
        const updatedLikes = (selectedPost.likes ?? 0) + (hasLiked ? -1 : 1);
        setSelectedPost({
          ...selectedPost,
          likes: updatedLikes,
        });
      
        // likedPosts localStorage ni yangilash
        const updatedLikedPosts = hasLiked
          ? likedPosts.filter(id => id !== selectedPost._id)
          : [...likedPosts, selectedPost._id];
        setLikedPosts(updatedLikedPosts);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
      
        // Serverga Like yuborish
        sanityClient
          .patch(selectedPost._id)
          .set({ likes: updatedLikes })
          .commit()
          .then(() => console.log('Like updated!'))
          .catch((err) => console.error('Failed to update like:', err));
      
        // Explosion efekt boshlash
        setExplosionType(hasLiked ? 'dislike' : 'like');
        setExplodingPostId(selectedPost._id);
        setTimeout(() => {
          setExplodingPostId(null);
        }, 800);
      };

  // Modal scroll progress handler
  useEffect(() => {
    if (!selectedPost) return;
    const handleScroll = () => {
      const el = modalContentRef.current;
      if (!el) return;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setModalScroll(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    const el = modalContentRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [selectedPost]);

  

  const getTitle = (post) => {
    if (!post) return '';
  
    if (language === 'uz' && post.uzTitle) return post.uzTitle;
    if (language === 'ru' && post.ruTitle) return post.ruTitle;
    if (language === 'en' && post.enTitle) return post.enTitle;
  
    return post.enTitle || post.uzTitle || post.ruTitle || '';
  };
  
  const getExcerpt = (post) => {
    if (!post) return '';
  
    if (language === 'uz' && post.uzExcerpt) return post.uzExcerpt;
    if (language === 'ru' && post.ruExcerpt) return post.ruExcerpt;
    if (language === 'en' && post.enExcerpt) return post.enExcerpt;
  
    return post.enExcerpt || post.uzExcerpt || post.ruExcerpt || '';
  };
  
  const getContent = (post) => {
    if (!post) return [];
  
    if (language === 'uz' && post.uzContent) return post.uzContent;
    if (language === 'ru' && post.ruContent) return post.ruContent;
    if (language === 'en' && post.enContent) return post.enContent;
  
    return post.enContent || post.uzContent || post.ruContent || [];
  };
  
  useEffect(() => {
    if (selectedPost && !isModalLoading) {
      const viewedPosts = JSON.parse(localStorage.getItem('viewedPosts')) || [];
  
      if (!viewedPosts.includes(selectedPost._id)) {
        // Frontendni darrov yangilash (view +1)
        setSelectedPost(prev => ({
          ...prev,
          views: (prev.views ?? 0) + 1
        }));
  
        // Serverga ham view qo'shamiz
        addView(selectedPost._id, selectedPost.views);
  
        // LocalStorage'ga bu postni ko'rilganlar ro'yxatiga qo'shamiz
        const updatedViewedPosts = [...viewedPosts, selectedPost._id];
        localStorage.setItem('viewedPosts', JSON.stringify(updatedViewedPosts));
      }
    }
  }, [selectedPost, isModalLoading]);

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
        className={`min-h-screen relative  p-6  rounded-[32px] scrollbar-thin scrollbar-thumb-gradient scrollbar-track-gray-100 ${isDark ? 'bg-[#1f1f1f]' : 'bg-white'} p-6 lg:p-8 rounded-[32px] shadow-[0_4px_30px_rgba(255,255,255,0.3)]`}
        style={{
          scrollbarColor: isDark ? '#60a5fa #232323' : '#6366f1 #f3f4f6',
          scrollbarWidth: 'thin',
        }}
      >
        
        <div className="max-w-3xl mx-auto  space-y-6">
          <motion.h2 variants={fadeInUp} className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-4 flex items-center`}> 
                    {language === 'uz' ? 'Blog' : language === 'ru' ? 'Блог' : 'Blog'}
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "2rem" }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className={`block mt-1.5 h-1 ${isDark ? 'bg-[#e2e2e2]' : 'bg-gray-800'} ml-4`}
                    ></motion.span>
                  </motion.h2>

          {/* Blog List */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  }}
>

{pinnedPost && (
  <motion.div
    key={pinnedPost._id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`p-4 rounded-xl gap-3 cursor-pointer transition-all duration-300 mb-6 relative
      ${isDark
        ? 'bg-[#232323] border border-white/10 hover:border-white/20 hover:shadow-[0_4px_24px_rgba(255,255,255,0.1)]'
        : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
      }`}
      onClick={() => {
        const slug = 
          language === 'uz' ? pinnedPost?.uzSlug?.current :
          language === 'ru' ? pinnedPost?.ruSlug?.current :
          pinnedPost?.enSlug?.current;
      
        if (slug) {
          setSelectedPost(null);
          setIsModalLoading(true);
          navigate(`/blog/${slug}`);
        }
      }}
  >
    {/* 📌 Pin Icon */}
    <div className="absolute top-3 right-3 z-10">
      <BsPinAngleFill className="text-sm text-blue-400" />
    </div>

    {/* Content */}
    <div className="flex items-center justify-between gap-3">
      
      {/* Text part */}
      <div className="flex-1">
        {/* Title */}
        <h2 className={`text-md lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {getTitle(pinnedPost)}
        </h2>

        {/* Excerpt */}
        {getExcerpt(pinnedPost) && (
          <p className={`mt-1 text-[13px] lg:text-[16px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {String(getExcerpt(pinnedPost)).slice(0, 150)}...
          </p>
        )}

        {/* Views, Likes, Date */}
        <div className="flex gap-2 mt-2 mb-0 text-sm">
          {/* Published Date */}
          {pinnedPost.publishedAt && (
            <div className={`flex items-center gap-1 text-xs lg:text-sm ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
              <FaCalendarAlt /> {format(new Date(pinnedPost.publishedAt), 'dd/MM/yy')}
            </div>
          )}

          {/* Views */}
          <div className={`flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
            <FaEye /> {pinnedPost.views ?? 0}
          </div>

          {/* Like & Explosion */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleLikeToggle(pinnedPost); // Like toggle
            }}
            className={`relative flex items-center gap-0 ${isDark ? 'text-gray-300' : 'text-gray-400'} cursor-pointer`}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <FaHeart
                className={`text-xs transition-colors duration-300 ${
                  likedPosts.includes(pinnedPost._id) ? 'text-red-500' : ''
                }`}
              />
              {/* 💥 Explosion animation */}
              {explodingPostId === pinnedPost._id && (
                <LikeExplosion type={explosionType} />
              )}
            </div>

            <span>{pinnedPost.likes ?? 0}</span>
          </div>

        </div>
      </div>

      {/* Image part */}
      {pinnedPost.mainImage?.asset?.url && (
        <div className="flex-shrink-0 mr-3">
          <img
            src={pinnedPost.mainImage.asset.url}
            alt={pinnedPost.uzTitle}
            className="w-24 h-24 object-cover rounded-xl"
          />
        </div>
      )}
    </div>
  </motion.div>
)}






  {otherPosts.slice(0, visibleCount).map(post => (
    <motion.div
    key={post._id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`p-4 rounded-xl gap-3 cursor-pointer transition-all duration-300 mb-6
      ${isDark
        ? 'bg-[#232323] border border-white/10 hover:border-white/20 hover:shadow-[0_4px_24px_rgba(255,255,255,0.1)]'
        : 'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
      }`}
    onClick={() => handlePostClick(post)}
    >
      <div className="flex items-center justify-between gap-3">
  {/* Text part */}
  <div className="flex-1">
    <h2 className={` text-md lg:text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
    {getTitle(post)}
    </h2>

    {getExcerpt(post) ? (
  <p className={`mt-1 text-[13px] lg:text-[16px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
    {String(getExcerpt(post)).slice(0, 150)}...
  </p>
) : null}



    {/* Views and Likes */}
    <div className="flex gap-2 mt-2 mb-0 text-sm">

    <div className={`flex items-center gap-1 text-xs lg:text-sm ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
      {post.publishedAt && (
        <>
          <FaCalendarAlt /> {format(new Date(post.publishedAt), 'dd/MM/yy')}
        </>
      )}
    </div>
      <div className={`flex items-center gap-1 text-xs lg:text-sm ${isDark ? 'text-gray-300' : 'text-gray-400'} cursor-pointer`}>
        <FaEye /> {post.views ?? 0}
      </div>
      <div 
  onClick={(e) => {
    e.stopPropagation();
    handleLikeToggle(post); // 🔥 like bosilganda
  }}
  className={`relative flex items-center gap-0 ${isDark ? 'text-gray-300' : 'text-gray-400'} cursor-pointer`}
>
  <div className="relative  w-6 h-6 flex items-center justify-center">
    <FaHeart
      className={`text-xs lg:text-sm transition-colors duration-300 ${
        likedPosts.includes(post._id) ? 'text-red-500' : ''
      }`}
    />
    {/* 🚀 Explosion listda ham ishlasin */}
    {explodingPostId === post._id && (
      <LikeExplosion type={explosionType} />
    )}
  </div>

  <span>{post.likes ?? 0}</span>
</div>
    </div>
  </div>

  {/* Image part */}
  {post.mainImage?.asset?.url && (
    <div className="flex-shrink-0">
      <img
        src={post.mainImage.asset.url}
        alt={post.uzTitle}
        className="w-24 h-24 object-cover rounded-xl"
      />
    </div>
  )}
</div>

    
    </motion.div>
  ))}
</motion.div>

          {/* Load More Button */}  
          {visibleCount >= 4 && visibleCount < posts.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md shadow
                  text-xs font-medium
                  ${isDark ? 'bg-[#232323] text-gray-200 border border-white/20 hover:border-white/30' : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'}
                  transition-all duration-200
                  sm:px-4 sm:py-2 sm:text-sm sm:rounded-lg`}
              >
                {t('loadMore')}
              </button>
            </div>
          )}
        </div>
       
        {/* Modal */}
        <Dialog
  open={!!slug && (isModalLoading || selectedPost  !== null)}
  onClose={closeModal}
  className="relative z-50"
>
          <div className="fixed  inset-0   backdrop-blur-md  transition-all duration-300
            hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-black/40" aria-hidden="true" />
       
          {isModalLoading ? (
            <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <GiBookCover className={`mb-2 h-12 w-12 ${isDark ? 'text-white' : 'text-white'} animate-bounce`} />
                <span className={`text-white  ${isDark ? 'text-white' : 'text-blue'}`}>{t("loading")}</span>
              </div>
            </div>
          ) : (
            <div className="fixed inset-0  flex items-center justify-center p-4">
              {/* Modal scroll progress bar */}
              <div className="fixed left-0 top-0 w-full z-[9999]">
            <div className="h-1 bg-gradient-to-r from-blue-300 via-blue-500 to-blue-900 dark:from-gray-700 dark:via-gray-400 dark:to-white transition-all duration-200" style={{ width: `${modalScroll}%` , opacity: 0.95}} />
              </div>
              <Dialog.Panel ref={modalContentRef} className={`relative  rounded-2xl shadow-xl w-full md:mt-[-1%] md:max-w-3xl mx-auto p-1 px-5 py-6 lg:p-1 lg:px-8 lg:py-9 md:ml-[34%]  max-h-[80vh] overflow-y-auto  backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300
                hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] ${isDark ? 'bg-[#232323] text-white' : 'bg-white text-gray-900'} `} >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="fixed top-2 right-2  z-999 z-50 w-8 h-8 text-2xl flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white text-3xl transition-all duration-300 hover:scale-125 "
                >
                  &times;
                </button>
                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                >
                  {/* Main Image */}
                  {selectedPost?.mainImage?.asset?.url && (
                    <div className="w-full relative pt-[75%] (4:3) mb-4 rounded-xl overflow-hidden"> 
                    <motion.img
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      src={selectedPost.mainImage.asset.url}
                      alt={selectedPost.uzTitle}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  )}

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22, duration: 0.3 }}
                    className="text-2xl font-bold mb-4 dark:text-white"
                  >
                   {getTitle(selectedPost) || "No Title"}
                  </motion.h2>

                  {/* Metadata */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.3 }}
                    className="flex flex-wrap gap-4 mb-4 text-gray-500 dark:text-gray-300 text-sm"
                  >
                    {selectedPost?.publishedAt && (
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt /> {format(new Date(selectedPost.publishedAt), 'dd/MM/yy')}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <FaEye /> {selectedPost?.views ?? 0}
                    </div>
                   
                  </motion.div>
                  
                  {/* Categories */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.3 }}
                    className="flex flex-wrap gap-2 mb-4"
                  >
                    {Array.isArray(selectedPost?.categories) && selectedPost.categories.map((cat, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-white/10 dark:text-white text-gray-800">
                        {typeof cat === 'string' ? cat : cat.title || 'Category'}
                      </span>
                    ))}
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="prose dark:prose-invert max-w-none"
                  >
                  {Array.isArray(getContent(selectedPost)) && getContent(selectedPost).length > 0 ? (
                      <PortableText value={getContent(selectedPost)} />
                    ) : (
                      <p>No content available.</p>
                    )}
                  </motion.div>

                  {/* Minimalist ajratuvchi chiziq */}
                  <div className="w-full flex justify-center">
                    <div className="w-full max-w-md h-px bg-gray-500 dark:bg-gray-300 my-2 mt-6 rounded-full"></div>
                  </div>
                 
                   {/* Navigation, Like, Save va Share pastda bir qatorda, markazda prev/next */}
                   <div className="flex items-center justify-between gap-2 mt-0 flex-wrap w-full max-w-md mx-auto px-1 lg:px-5">
                     {/* Chap: Like va Save */}
                     <div className="flex items-center gap-2 md:ml-[-144px] ml-[-8px]">
                       {/* Like Button */}
                       {selectedPost && (
  <div
    onClick={(e) => {
      e.stopPropagation();
      handleModalLikeToggle(); // Modal uchun alohida Like toggle chaqir
    }}
    className="relative flex items-center gap-1 cursor-pointer transition-transform duration-300 active:scale-125"
  >
    <div className="relative">
      <FaHeart
        className={`text-md lg:text-[20px] transition-colors text-gray-400 duration-300 ${
          likedPosts.includes(selectedPost._id) ? 'text-red-500' : ''
        }`}
      />
      {/* Explosion faqat clicked paytida chiqadi */}
      {explodingPostId === selectedPost._id && (
        <div className="absolute inset-0">
          <LikeExplosion type={explosionType} />
        </div>
      )}
    </div>
    <span>{selectedPost.likes ?? 0}</span>
  </div>
)}
                       {/* Save (Bookmark) Button */}
                       <button
                         onClick={() => handleBookmarkToggle(selectedPost?._id)}
                         className="flex items-center justify-center p-0.5 text-md lg:text-lg  text-gray-400 dark:text-gray-300 hover:text-white-400 transition-all duration-150 focus:outline-none"
                       >
                         {selectedPost && bookmarkedPosts.includes(selectedPost._id)
                           ? <BsBookmarkFill className="text-lg md:text-xl" />
                           : <BsBookmark className="text-lg md:text-xl" />}
                       </button>
                     </div>
                     {/* O'rta: Previous va Next (square, gap-5, minimalist) */}
                     <div className="flex items-center gap-5 lg:gap-12 flex-1 mb-4 mr-4 justify-center min-w-[20px]">
                       {/* Previous Button */}
                       <button
                         onClick={() => {
                           const currentIndex = posts.findIndex(p => p._id === selectedPost?._id);
                           if (currentIndex > 0) {
                             handlePostClick(posts[currentIndex - 1]);
                           }
                         }}
                         disabled={!selectedPost || posts.findIndex(p => p._id === selectedPost?._id) === 0}
                         className={`mt-6 text-md   p-1.5  lg:p-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2
                           ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5 border-white/20' : 'bg-gradient-to-r from-gray-100 to-white border-gray-300'}
                           backdrop-blur-sm border hover:border-gray-400 dark:hover:border-white/30 transition-all duration-300
                           hover:shadow-[0_0_15px_rgba(0,0,0,0.08)]`}
                       > <FiChevronLeft className={`text-base md:text-lg ${isDark ? 'text-gray-200' : 'text-gray-500'} group-hover:text-black dark:group-hover:text-white transition`} /> prev
                         
                       </button>
                       {/* Next Button */}
                       <button
                         onClick={() => {
                           const currentIndex = posts.findIndex(p => p._id === selectedPost?._id);
                           if (currentIndex < posts.length - 1) {
                             handlePostClick(posts[currentIndex + 1]);
                           }
                         }}
                         disabled={!selectedPost || posts.findIndex(p => p._id === selectedPost?._id) === posts.length - 1}
                         className={`mt-6 p-1.5 sm:p-1 lg:p-2.5 rounded-lg shadow-lg flex items-center justify-center gap-2
                           ${isDark ? 'bg-gradient-to-r from-white/10 to-white/5 border-white/20' : 'bg-gradient-to-r from-gray-100 to-white border-gray-300'}
                           backdrop-blur-sm border hover:border-gray-400 dark:hover:border-white/30 transition-all duration-300
                           hover:shadow-[0_0_15px_rgba(0,0,0,0.08)]`}
                       > next
                         <FiChevronRight className={`text-base md:text-lg  ${isDark ? 'text-gray-200' : 'text-gray-500'} group-hover:text-black dark:group-hover:text-white transition`} /> 
                       </button>
                     </div>
                     {/* O'ng: Telegram */}
                     <div className="flex items-center  gap-2 md:mr-[-144px] mr-[-8px] relative group">
                       {/* Telegram Button */}
                       <a
                         href="https://t.me/mavlonoodev" // o'zingizning telegram kanal/linkingizni qo'ying
                         target="_blank"
                         rel="noopener noreferrer"
                         className="flex items-center justify-center p-0.5 text-gray-400 dark:text-gray-300 hover:text-blue-500 transition-all duration-150 focus:outline-none"
                       >
                         <FaTelegramPlane className="text-lg md:text-2xl sm:text-xs" />
                       </a>
                       {/* Tooltip */}
                       <span className="absolute -top-8 right-1 z-50 pointer-events-none select-none whitespace-nowrap
                         px-3 py-1.5 text-xs font-medium shadow-md rounded-lg
                         bg-white text-gray-700 border border-gray-200
                         dark:bg-[#232323] dark:text-gray-200 dark:border-gray-700
                         opacity-0 group-hover:opacity-100 transition-all duration-150 flex items-center gap-1">
                         Follow for more
                       </span>
                     </div>
                   </div>
                   {/* Eng pastda xira, kichik ism yozuvi */}
                   <div className="w-full flex justify-center ml-0 mt-5 mb-[-22px]">
                     <span className="text-xs text-gray-500 dark:text-gray-600 tracking-wide select-none">© 2025 mavlonbek.com</span>
                   </div>
                </motion.div>
              </Dialog.Panel>
            </div>
          )}
        </Dialog>


      </motion.div>
    </>
  );
};

export default Blog;
