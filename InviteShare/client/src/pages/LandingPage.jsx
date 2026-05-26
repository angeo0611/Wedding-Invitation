import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Calendar, MapPin, Music, CheckCircle } from 'lucide-react';

const LandingPage = ({ user, logout }) => {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass-morphism py-4 px-8 flex justify-between items-center">
        <h1 className="font-serif text-2xl tracking-tighter text-luxury-dark">ETERNALTIE</h1>
        <div className="space-x-8 text-sm uppercase tracking-widest hidden md:flex">
          <a href="#features" className="hover:text-sage transition-colors">Features</a>
          <a href="#templates" className="hover:text-sage transition-colors">Templates</a>
          <a href="#pricing" className="hover:text-sage transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-xs uppercase tracking-widest font-semibold">Dashboard</Link>
              <button onClick={logout} className="text-xs uppercase tracking-widest text-red-500">Logout</button>
            </>
          ) : (
            <Link to="/login" className="luxury-button !px-6 !py-2">Sign In</Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-champagne/20 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          <span className="text-sage uppercase tracking-[0.4em] text-sm mb-4 block">Elegant Digital Invitations</span>
          <h2 className="text-6xl md:text-8xl font-serif mb-8 text-luxury-dark">Celebrate Your Love <br />Story Digitally.</h2>
          <p className="max-w-xl mx-auto text-luxury-dark/70 mb-10 font-light leading-relaxed">
            Create a premium, mobile-responsive wedding invitation in minutes. 
            Music, RSVP, Gallery, and beautiful animations included.
          </p>
          <Link to="/register" className="luxury-button">Start Creating For Free</Link>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-sage/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rosegold/10 rounded-full blur-3xl" />
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 px-8 max-w-7xl mx-auto">
        <h3 className="text-center font-serif text-4xl mb-20 italic">Designed with Love</h3>
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { icon: <Music />, title: "Atmospheric Music", desc: "Background music that sets the mood as soon as they open." },
            { icon: <CheckCircle />, title: "Smart RSVP", desc: "Collect responses and dietary requirements instantly." },
            { icon: <Calendar />, title: "Live Countdown", desc: "Build excitement with a beautiful countdown to your day." },
          ].map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="text-center p-8 border border-champagne/50 rounded-2xl hover:shadow-xl transition-all"
            >
              <div className="inline-block p-4 bg-sage/10 text-sage rounded-full mb-6">
                {f.icon}
              </div>
              <h4 className="font-serif text-xl mb-4">{f.title}</h4>
              <p className="text-luxury-dark/60 font-light">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Template Showcase */}
      <section id="templates" className="bg-luxury-dark py-24 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-sage uppercase tracking-widest text-xs">Exquisite Designs</span>
              <h3 className="font-serif text-5xl mt-4">Luxury Templates</h3>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="group overflow-hidden rounded-3xl relative h-[500px]">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="luxury-button !bg-white !text-black">View Demo</span>
              </div>
            </div>
            <div className="group overflow-hidden rounded-3xl relative h-[500px]">
              <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="luxury-button !bg-white !text-black">View Demo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-champagne/20 px-8 text-center">
        <h1 className="font-serif text-3xl mb-8">ETERNALTIE</h1>
        <p className="text-luxury-dark/40 text-sm mb-12 uppercase tracking-widest">Digital Elegance for Modern Couples</p>
        <div className="flex justify-center gap-8 mb-12">
          <a href="#" className="hover:text-sage">Instagram</a>
          <a href="#" className="hover:text-sage">Pinterest</a>
          <a href="#" className="hover:text-sage">Facebook</a>
        </div>
        <p className="text-xs text-luxury-dark/30">&copy; 2024 EternalTie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
