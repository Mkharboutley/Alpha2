import React, { useState, useEffect } from 'react';
import { InvitationLanding } from './components/InvitationLanding';
import { ConfirmationPage } from './components/ConfirmationPage';
import { QRScanResult } from './components/QRScanResult';
import { useWeddingInvitation } from './hooks/useWeddingInvitation';
import type { WeddingInvitation } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'confirmation' | 'qr-result'>('landing');
  const [invitation, setInvitation] = useState<WeddingInvitation | null>(null);
  const { getInvitationById, trackQRScan } = useWeddingInvitation();

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const invitationId = urlParams.get('id');
    
    if (invitationId) {
      loadInvitation(invitationId);
    }
  }, []);

  const loadInvitation = async (id: string) => {
    const invitationData = await getInvitationById(id);
    if (invitationData) {
      setInvitation(invitationData);
      setCurrentPage('qr-result');
      // Track QR scan
      await trackQRScan(id);
    }
  };

  const handleInvitationCreated = (newInvitation: WeddingInvitation) => {
    setInvitation(newInvitation);
    setCurrentPage('confirmation');
  };

  const handleBack = () => {
    setCurrentPage('landing');
    setInvitation(null);
    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  return (
    <div className="app">
      {currentPage === 'landing' && (
        <InvitationLanding onInvitationCreated={handleInvitationCreated} />
      )}
      {currentPage === 'confirmation' && invitation && (
        <ConfirmationPage invitation={invitation} onBack={handleBack} />
      )}
      {currentPage === 'qr-result' && invitation && (
        <QRScanResult invitation={invitation} />
      )}
    </div>
  );
}

export default App;