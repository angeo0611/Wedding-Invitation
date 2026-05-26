import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Image, Music, MapPin, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const Editor = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    slug: '',
    couple: { bride: { name: '' }, groom: { name: '' } },
    event: { date: '', time: '', venueName: '', address: '', mapUrl: '' },
    sections: { story: { content: '' }, musicUrl: '' }
  });

  useEffect(() => {
    if (id) {
      const fetchInvite = async () => {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/invitations/my`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const current = res.data.find(i => i._id === id);
        if (current) setFormData(current);
      };
      fetchInvite();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (id) {
        await axios.patch(`http://localhost:5000/api/invitations/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`http://localhost:5000/api/invitations`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/dashboard');
    } catch (err) {
      alert("Error saving invitation");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white border-b p-4 flex justify-between items-center px-8">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm text-luxury-dark/60">
          <ArrowLeft size={16} /> Dashboard
        </button>
        <button onClick={handleSubmit} className="luxury-button flex items-center gap-2 !px-6 !py-2">
          <Save size={16} /> Save Changes
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor sidebar */}
        <div className="w-1/2 overflow-y-auto p-12 bg-white border-r">
          <h2 className="font-serif text-3xl mb-8">Invitation Builder</h2>
          
          <form className="space-y-10">
             <section className="space-y-4">
               <h3 className="font-semibold text-xs uppercase tracking-widest text-sage">Basic Info</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[10px] uppercase tracking-widest mb-1 block">Slug (URL)</label>
                   <input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full border p-3 rounded-xl focus:ring-1 ring-sage outline-none" placeholder="e.g. john-and-mary" />
                 </div>
               </div>
             </section>

             <section className="space-y-4">
               <h3 className="font-semibold text-xs uppercase tracking-widest text-sage">The Couple</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[10px] uppercase tracking-widest mb-1 block">Groom Name</label>
                   <input value={formData.couple.groom.name} onChange={e => setFormData({...formData, couple: {...formData.couple, groom: {name: e.target.value}}})} className="w-full border p-3 rounded-xl focus:ring-1 ring-sage outline-none" />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase tracking-widest mb-1 block">Bride Name</label>
                   <input value={formData.couple.bride.name} onChange={e => setFormData({...formData, couple: {...formData.couple, bride: {name: e.target.value}}})} className="w-full border p-3 rounded-xl focus:ring-1 ring-sage outline-none" />
                 </div>
               </div>
             </section>

             <section className="space-y-4">
               <h3 className="font-semibold text-xs uppercase tracking-widest text-sage">Ceremony Details</h3>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="text-[10px] uppercase tracking-widest mb-1 block">Date</label>
                   <input type="date" value={formData.event.date ? formData.event.date.split('T')[0] : ''} onChange={e => setFormData({...formData, event: {...formData.event, date: e.target.value}})} className="w-full border p-3 rounded-xl outline-none" />
                 </div>
                 <div>
                   <label className="text-[10px] uppercase tracking-widest mb-1 block">Time</label>
                   <input type="text" value={formData.event.time} onChange={e => setFormData({...formData, event: {...formData.event, time: e.target.value}})} placeholder="e.g. 4:00 PM" className="w-full border p-3 rounded-xl outline-none" />
                 </div>
                 <div className="col-span-2">
                   <label className="text-[10px] uppercase tracking-widest mb-1 block">Venue Name</label>
                   <input value={formData.event.venueName} onChange={e => setFormData({...formData, event: {...formData.event, venueName: e.target.value}})} className="w-full border p-3 rounded-xl outline-none" />
                 </div>
               </div>
             </section>

             <section className="space-y-4">
               <h3 className="font-semibold text-xs uppercase tracking-widest text-sage">Music</h3>
               <input value={formData.sections.musicUrl} onChange={e => setFormData({...formData, sections: {...formData.sections, musicUrl: e.target.value}})} placeholder="MP3 URL" className="w-full border p-3 rounded-xl outline-none" />
             </section>
          </form>
        </div>

        {/* Live Preview (Simple representation) */}
        <div className="w-1/2 bg-gray-200 flex items-center justify-center p-12">
          <div className="w-full max-w-sm h-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-[12px] border-luxury-dark">
             <div className="p-8 text-center mt-20">
                <span className="text-[8px] uppercase tracking-[0.4em] text-sage">Preview</span>
                <h2 className="font-serif text-3xl mt-4">
                  {formData.couple.groom.name || 'Groom'} & {formData.couple.bride.name || 'Bride'}
                </h2>
                <div className="mt-8 border-y py-4 border-champagne">
                  <p className="font-serif italic">{formData.event.date || 'The Date'}</p>
                </div>
                <p className="mt-12 text-xs opacity-50 uppercase tracking-widest">Scroll to preview content</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
