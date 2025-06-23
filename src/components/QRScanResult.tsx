import React, { useEffect } from 'react';
import { MapPin, Calendar, Clock, User, Crown, Sparkles, Eye } from 'lucide-react';
import type { WeddingInvitation } from '../lib/supabase';

interface QRScanResultProps {
  invitation: WeddingInvitation;
}

export const QRScanResult: React.FC<QRScanResultProps> = ({ invitation }) => {
  const weddingInfo = {
    attendee: invitation.attendee_name,
    event: "حفل زفاف",
    date: "٤ يوليو ٢٠٢٥",
    time: "٦:٠٠ مساءً",
    venue: "فندق نادي الضباط، قاعة إرث",
    address: "فندق نادي الضباط"
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Main glassmorphism card */}
          <div className="glass-card p-8 transform animate-fadeIn">
            {/* Header with crown */}
            <div className="flex justify-center mb-6 relative">
              <div className="relative">
                <Crown className="w-16 h-16 text-yellow-400 animate-pulse drop-shadow-lg" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-bounce shadow-lg shadow-amber-400/50"></div>
              </div>
            </div>

            {/* Welcome message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif text-white mb-3 drop-shadow-lg">
                مرحباً بك
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 mx-auto mb-4 rounded-full shadow-lg shadow-amber-400/50"></div>
              <p className="text-xl text-amber-100 font-medium drop-shadow-md">
                <span className="text-yellow-300">{weddingInfo.attendee}</span>
              </p>
              <p className="text-xs text-amber-300 mt-2 drop-shadow-md">
                رقم الدعوة: {invitation.id.slice(0, 8)}
              </p>
            </div>

            {/* Wedding details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Attendee info */}
              <div className="glass-detail-section p-6 rounded-2xl">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <User className="w-5 h-5 ml-2 text-yellow-400" />
                  معلومات المدعو
                </h3>
                <div className="space-y-3 text-amber-100">
                  <p className="flex justify-between items-center">
                    <span className="font-medium text-yellow-300">الاسم:</span> 
                    <span>{invitation.attendee_name}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium text-yellow-300">تأكيد الحضور:</span> 
                    <span className="text-sm">{formatDate(invitation.confirmed_at)}</span>
                  </p>
                </div>
              </div>

              {/* Event details */}
              <div className="glass-detail-section p-6 rounded-2xl">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 ml-2 text-yellow-400" />
                  تفاصيل المناسبة
                </h3>
                <div className="space-y-3 text-amber-100">
                  <p className="flex justify-between items-center">
                    <span className="font-medium text-yellow-300">التاريخ:</span> 
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 ml-1 text-yellow-400" />
                      {weddingInfo.date}
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium text-yellow-300">الوقت:</span> 
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 ml-1 text-yellow-400" />
                      {weddingInfo.time}
                    </span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span className="font-medium text-yellow-300">مرات المسح:</span> 
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 ml-1 text-yellow-400" />
                      {invitation.scan_count}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Location section */}
            <div className="glass-detail-section p-6 rounded-2xl mb-8">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <MapPin className="w-5 h-5 ml-2 text-yellow-400" />
                موقع المناسبة
              </h3>
              <div className="space-y-4">
                <div className="text-amber-100">
                  <p className="font-medium text-yellow-300 mb-2">{weddingInfo.venue}</p>
                  <p className="text-sm text-amber-200">{weddingInfo.address}</p>
                </div>
                
                {/* Embedded Google Map */}
                <div className="glass-qr-container p-4 rounded-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.4!2d46.6753!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sفندق+نادي+الضباط!5e0!3m2!1sen!2ssa!4v1635000000000!5m2!1sen!2ssa"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                  ></iframe>
                </div>

                {/* Map action button */}
                <div className="flex justify-center">
                  <a
                    href="https://maps.app.goo.gl/LVX5KXwih3UPN1rHA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-button flex items-center px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="ml-2 font-medium">فتح في خرائط جوجل</span>
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Scan tracking info */}
            {invitation.qr_scanned_at && (
              <div className="glass-detail-section p-4 rounded-2xl mb-6">
                <p className="text-center text-sm text-amber-200">
                  أول مسح للرمز: {formatDate(invitation.qr_scanned_at)}
                </p>
              </div>
            )}

            {/* Footer message */}
            <div className="text-center pt-6 border-t border-white/20">
              <p className="text-sm text-amber-200 drop-shadow-md">
                بحضوركم تكتمل سعادتنا
              </p>
              <div className="mt-4 flex justify-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full animate-bounce shadow-lg shadow-amber-400/50"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-bounce shadow-lg shadow-yellow-400/50" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full animate-bounce shadow-lg shadow-amber-500/50" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};