import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Layout, Eye, Edit3, Trash2 } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ user, logout }) => {
  const [invitations, setInvitations] = useState([]);

  useEffect(() => {
    const fetchInvites = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/invitations/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInvitations(res.data);
    };
    fetchInvites();
  }, []);

  return (
    <div className="min-h-screen bg-champagne/10">
      <nav className="glass-morphism p-6 flex justify-between items-center">
        <h1 className="font-serif text-xl">My Dashboard</h1>
        <button onClick={logout} className="text-xs uppercase tracking-widest text-red-500">Sign Out</button>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-serif">Welcome, {user.name}</h2>
            <p className="text-luxury-dark/60">Manage your wedding invitations here.</p>
          </div>
          <Link to="/editor" className="luxury-button flex items-center gap-2">
            <Plus size={16} /> New Invitation
          </Link>
        </div>

        {invitations.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-luxury-dark/10">
            <p className="text-luxury-dark/40 italic">You haven't created any invitations yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {invitations.map((invite) => (
              <div key={invite._id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-champagne/30">
                <div className="h-48 bg-sage/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <Layout size={64} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white">
                    <span className="bg-luxury-dark/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
                       {invite.slug}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2">{invite.couple.groom.name} & {invite.couple.bride.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-luxury-dark/40 mb-6">
                    <span className="flex items-center gap-1"><Eye size={12} /> {invite.stats.views} Views</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/editor/${invite._id}`} className="flex-1 py-3 text-center border border-luxury-dark/10 rounded-xl hover:bg-sage hover:text-white transition-colors">
                      <Edit3 size={16} className="mx-auto" />
                    </Link>
                    <Link to={`/invitation/${invite.slug}`} target="_blank" className="flex-1 py-3 text-center border border-luxury-dark/10 rounded-xl hover:bg-luxury-dark hover:text-white transition-colors">
                      <Eye size={16} className="mx-auto" />
                    </Link>
                    <button className="flex-1 py-3 text-center border border-luxury-dark/10 rounded-xl hover:bg-red-500 hover:text-white transition-colors">
                      <Trash2 size={16} className="mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
