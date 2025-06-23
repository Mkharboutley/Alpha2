import { useState, useEffect } from 'react';
import { supabase, type WeddingInvitation } from '../lib/supabase';

export const useWeddingInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvitation = async (attendeeName: string): Promise<WeddingInvitation | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('wedding_invitations')
        .insert([
          {
            attendee_name: attendeeName,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getInvitationById = async (id: string): Promise<WeddingInvitation | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('wedding_invitations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invitation not found');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const trackQRScan = async (id: string): Promise<void> => {
    try {
      // First get current scan count
      const { data: current } = await supabase
        .from('wedding_invitations')
        .select('scan_count, qr_scanned_at')
        .eq('id', id)
        .single();

      if (current) {
        const updates: any = {
          scan_count: (current.scan_count || 0) + 1,
        };

        // Set qr_scanned_at only on first scan
        if (!current.qr_scanned_at) {
          updates.qr_scanned_at = new Date().toISOString();
        }

        await supabase
          .from('wedding_invitations')
          .update(updates)
          .eq('id', id);
      }
    } catch (err) {
      console.error('Error tracking QR scan:', err);
    }
  };

  const getAllInvitations = async (): Promise<WeddingInvitation[]> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('wedding_invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data || [];
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createInvitation,
    getInvitationById,
    trackQRScan,
    getAllInvitations,
  };
};