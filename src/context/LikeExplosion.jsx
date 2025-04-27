import { motion } from 'framer-motion';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';// 💔 uchun FaRegHeartBroken
import { useEffect, useState } from 'react';

const LikeExplosion = ({ type = 'like' }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 6 }).map(() => ({
      id: Math.random(),
      x: (Math.random() - 0.5) * 150, // -75 to +75
      y: (Math.random() - 0.5) * 150,
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 1, x: 0, y: 0 }}
          animate={{ opacity: 0, x: particle.x, y: particle.y }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute text-red-500"
        >
          {type === 'like' ? (
            <FaHeart size={20} />
          ) : (
            <FaHeartBroken size={20} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default LikeExplosion;