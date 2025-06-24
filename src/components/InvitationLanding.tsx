import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { useWeddingInvitation } from '../hooks/useWeddingInvitation';
import type { WeddingInvitation } from '../lib/supabase';

interface InvitationLandingProps {
  onInvitationCreated: (invitation: WeddingInvitation) => void;
}

export const InvitationLanding: React.FC<InvitationLandingProps> = ({ onInvitationCreated }) => {
  const [attendeeName, setAttendeeName] = useState('');
  const { createInvitation, loading, error } = useWeddingInvitation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (attendeeName.trim()) {
      const invitation = await createInvitation(attendeeName.trim());
      
      if (invitation) {
        onInvitationCreated(invitation);
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir="rtl">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/back.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main glassmorphism invitation card */}
          <div className="glass-card p-8 text-center transform hover:scale-105 transition-all duration-500">
            {/* Header image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/Untitled.png" 
                  alt="Wedding Invitation Header" 
                  className="w-full max-w-xs h-auto rounded-xl shadow-lg drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
              </div>
            </div>

            {/* Wedding details */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-center text-amber-100 glass-detail-card p-3 rounded-xl">
                <span className="text-sm font-medium opacity-50">٤ يوليو ٢٠٢٥</span>
              </div>
              <div className="flex items-center justify-center text-amber-100 glass-detail-card p-3 rounded-xl">
                <span className="text-sm ml-3 font-medium opacity-50">فندق نادي الضباط، قاعة إرث</span>
                <MapPin className="w-5 h-5 text-yellow-400 drop-shadow-md opacity-50" />
              </div>
            </div>

            {/* RSVP form with glassmorphism */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  id="attendeeName"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  placeholder="الرجاء إدخال الإسم الكامل"
                  className="glass-input w-full px-4 py-4 rounded-xl text-center font-medium"
                  required
                  dir="rtl"
                />
              </div>

              {error && (
                <div className="glass-detail-card p-3 rounded-xl">
                  <p className="text-red-300 text-sm opacity-50">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!attendeeName.trim() || loading}
                className="elegant-button w-full py-4 px-6 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white ml-3 opacity-50"></div>
                    <span className="opacity-50">جاري المعالجة...</span>
                  </div>
                ) : (
                  <span>تأكيد الحضور</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};