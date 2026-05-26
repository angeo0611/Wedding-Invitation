import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Music, MapPin, Calendar, Heart } from 'lucide-react';
import axios from 'axios';
import confetti from 'canvas-confetti';

const PublicInvitation = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState('none'); // none, success
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invitations/slug/${slug}`);
        setData(res.data);
      } catch (err) {
        console.error("Invite not found");
      }
    };
    fetchData();
  }, [slug]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) audioRef.current.play();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#87A96B', '#F7E7CE', '#B76E79']
    });
  };

  const toggleMusic = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleRSVP = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await axios.post('http://localhost:5000/api/rsvp', {
        invitationId: data._id,
        guestName: formData.get('guestName'),
        attendance: formData.get('attendance'),
        message: formData.get('message'),
        plusOne: parseInt(formData.get('plusOne') || 0)
      });
      setRsvpStatus('success');
    } catch (err) {
      alert("Failed to submit RSVP");
    }
  };

  if (!data) return <div className="h-screen flex items-center justify-center font-serif">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <audio ref={audioRef} src={data.sections.musicUrl} loop />

      {/* Opening Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 1, ease: "circInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-luxury-dark text-white p-6"
          >
            <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-serif italic text-2xl mb-8">
              The Wedding of
            </motion.h4>
            <motion.h1 initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-5xl md:text-7xl font-serif mb-12 text-center text-champagne">
              {data.couple.groom.name} & {data.couple.bride.name}
            </h1>
            <button onClick={handleOpen} className="group flex flex-col items-center gap-4">
              <div className="p-6 rounded-full border border-white/20 group-hover:bg-white/10 transition-colors animate-bounce">
                <MailOpen size={32} className="text-champagne" />
              </div>
              <span className="uppercase tracking-[0.4em] text-[10px]">Open Invitation</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-xl mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
        {/* Floating Music Button */}
        {isOpen && (
          <button 
            onClick={toggleMusic}
            className="fixed bottom-8 right-8 z-[90] p-4 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-champagne"
          >
            <Music className={isPlaying ? "animate-spin" : ""} size={20} />
          </button>
        )}

        {/* Hero */}
        <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="text-sage uppercase tracking-[0.3em] text-[10px] mb-4 block">Save The Date</span>
            <h2 className="text-5xl font-serif text-luxury-dark mb-6 leading-tight">
              {data.couple.groom.name} <br />&<br /> {data.couple.bride.name}
            </h2>
            <div className="w-12 h-[1px] bg-sage mx-auto mb-6"></div>
            <p className="font-serif italic text-xl">
              {new Date(data.event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <div className="w-[1px] h-12 bg-luxury-dark/20"></div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-8 text-center bg-sage/5">
          <Heart className="mx-auto text-sage mb-6" fill="currentColor" size={24} />
          <h3 className="font-serif text-3xl mb-8 italic">Our Story</h3>
          <p className="text-luxury-dark/70 font-light leading-relaxed mb-12">
            {data.sections.story.content || "Join us as we celebrate the beginning of our journey together as husband and wife."}
          </p>
          <div className="grid grid-cols-2 gap-4">
             {data.sections.gallery.slice(0, 4).map((url, i) => (
               <img key={i} src={url || "https://picsum.photos/400/600"} className="rounded-lg shadow-md aspect-[3/4] object-cover" />
             ))}
          </div>
        </section>

        {/* Event Details */}
        <section className="py-20 px-8 text-center">
          <Calendar className="mx-auto text-sage mb-6" size={24} />
          <h3 className="font-serif text-3xl mb-8 italic">The Ceremony</h3>
          <div className="space-y-4 mb-10">
            <p className="font-semibold uppercase tracking-widest text-xs">When</p>
            <p className="font-serif italic text-xl">{data.event.time}</p>
          </div>
          <div className="space-y-4 mb-12">
            <p className="font-semibold uppercase tracking-widest text-xs">Where</p>
            <p className="font-serif italic text-xl">{data.event.venueName}</p>
            <p className="text-sm text-luxury-dark/60">{data.event.address}</p>
          </div>
          <a href={data.event.mapUrl} target="_blank" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-sage pb-1 text-sage">
            <MapPin size={14} /> Open Maps
          </a>
        </section>

        {/* RSVP Form */}
        <section className="py-20 px-8 bg-luxury-dark text-white text-center">
          <h3 className="font-serif text-3xl mb-12 italic text-champagne">RSVP</h3>
          {rsvpStatus === 'success' ? (
            <div className="py-10">
              <h4 className="text-xl font-serif mb-4">Thank you!</h4>
              <p className="text-white/60">Your response has been received.</p>
            </div>
          ) : (
            <form onSubmit={handleRSVP} className="space-y-6 max-w-sm mx-auto text-left">
              <div>
                <label className="text-[10px] uppercase tracking-widest block mb-2 opacity-60">Full Name</label>
                <input required name="guestName" type="text" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-champagne transition-colors" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest block mb-2 opacity-60">Will you attend?</label>
                <select name="attendance" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-champagne appearance-none">
                  <option className="bg-luxury-dark" value="attending">Yes, I'll be there</option>
                  <option className="bg-luxury-dark" value="declined">Regretfully decline</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest block mb-2 opacity-60">Plus One</label>
                <input name="plusOne" type="number" defaultValue={0} className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-champagne" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest block mb-2 opacity-60">Message</label>
                <textarea name="message" rows="3" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-champagne"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-champagne text-luxury-dark font-semibold uppercase tracking-widest text-[10px] rounded-sm hover:bg-white transition-colors">
                Send RSVP
              </button>
            </form>
          )}
        </section>

        {/* Footer */}
        <footer className="py-20 px-8 text-center text-[10px] uppercase tracking-[0.5em] text-luxury-dark/40">
          Created with EternalTie
        </footer>
      </div>
    </div>
  );
};

export default PublicInvitation;
