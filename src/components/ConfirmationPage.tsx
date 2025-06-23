import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Share, ArrowLeft, Sparkles } from 'lucide-react';
import type { WeddingInvitation } from '../lib/supabase';

interface ConfirmationPageProps {
  invitation: WeddingInvitation;
  onBack: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ invitation, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);

  const weddingInfo = {
    attendee: invitation.attendee_name,
    event: "حفل زفاف",
    date: "٤ يوليو ٢٠٢٥",
    time: "٦:٠٠ مساءً",
    venue: "فندق نادي الضباط، قاعة إرث",
    googleMapsLink: "https://maps.app.goo.gl/LVX5KXwih3UPN1rHA"
  };

  // Create QR code that links to the invitation by ID
  const qrCodeData = `${window.location.origin}?id=${invitation.id}`;

  useEffect(() => {
    const generateQRCode = async () => {
      if (canvasRef.current) {
        try {
          await QRCode.toCanvas(canvasRef.current, qrCodeData, {
            width: 140,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          setQrCodeGenerated(true);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      }
    };

    generateQRCode();
  }, [qrCodeData]);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `wedding-invitation-${invitation.attendee_name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  const shareQRCode = async () => {
    if (navigator.share && canvasRef.current) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], `wedding-invitation-${invitation.attendee_name}.png`, { type: 'image/png' });
            await navigator.share({
              title: 'دعوة زفاف',
              text: `${invitation.attendee_name} - دعوة زفاف`,
              files: [file]
            });
          }
        });
      } catch (error) {
        console.error('Error sharing:', error);
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
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Back button with glassmorphism */}
          <button
            onClick={onBack}
            className="mb-6 flex items-center text-amber-100 hover:text-white transition-colors duration-200 glass-back-button p-3 rounded-xl"
          >
            <span className="ml-2 text-sm font-medium">العودة إلى الدعوة</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>

          {/* Confirmation card with glassmorphism */}
          <div className="glass-card p-8 text-center transform animate-fadeIn">
            {/* QR Code at the top */}
            <div className="flex justify-center mb-6">
              <div className="glass-qr-container p-4 rounded-2xl">
                <canvas
                  ref={canvasRef}
                  className={`transition-opacity duration-500 rounded-xl ${qrCodeGenerated ? 'opacity-100' : 'opacity-0'}`}
                />
                {!qrCodeGenerated && (
                  <div className="w-35 h-35 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Confirmation message */}
            <div className="mb-6">
              <h1 className="text-3xl font-serif text-white mb-2 drop-shadow-lg">
                تم تأكيد الحضور
              </h1>
              <p className="text-base text-emerald-100 font-light drop-shadow-md">
                أهلاً وسهلاً <span className="font-medium text-yellow-300">{invitation.attendee_name}</span>
              </p>
              <p className="text-xs text-emerald-300 mt-2 drop-shadow-md">
                بحضوركم تكتمل سعادتنا
              </p>
            </div>

            {/* Wedding details with glassmorphism */}
            <div className="mb-6 glass-detail-section p-5 rounded-2xl">
              <h3 className="text-base font-medium text-white mb-3 flex items-center justify-center">
                <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
                تفاصيل المناسبة
              </h3>
              <div className="space-y-2 text-emerald-100">
                <p className="flex justify-between items-center text-sm">
                  <span className="font-medium text-yellow-300">التاريخ:</span> 
                  <span>{weddingInfo.date}</span>
                </p>
                <p className="flex justify-between items-center text-sm">
                  <span className="font-medium text-yellow-300">الوقت:</span> 
                  <span>{weddingInfo.time}</span>
                </p>
                <p className="flex justify-between items-center text-sm">
                  <span className="font-medium text-yellow-300">المكان:</span> 
                  <span>{weddingInfo.venue}</span>
                </p>
              </div>
            </div>

            {/* QR Code description and actions */}
            <div className="mb-6">
              <h3 className="text-base font-medium text-white mb-3 flex items-center justify-center">
                <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
                دعوتك الرقمية
              </h3>
              <p className="text-xs text-emerald-200 mb-4 drop-shadow-md">
                امسح هذا الرمز للوصول إلى تفاصيل دعوتك وموقع المناسبة
              </p>

              {/* Action buttons with gold styling */}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={downloadQRCode}
                  className="gold-button flex items-center px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  <span className="ml-2 font-medium">تحميل</span>
                  <Download className="w-3 h-3" />
                </button>
                {navigator.share && (
                  <button
                    onClick={shareQRCode}
                    className="emerald-button flex items-center px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm"
                  >
                    <span className="ml-2 font-medium">مشاركة</span>
                    <Share className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Footer message */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-xs text-emerald-200 drop-shadow-md">
                يرجى حفظ هذا الرمز وإحضاره معك إلى المناسبة
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};