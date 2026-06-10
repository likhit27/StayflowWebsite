import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DEFAULT_CONTENT, type SiteContent } from '../lib/defaultContent';

export function useContent() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('section, data')
          .order('section');

        if (error || !data || data.length === 0) {
          // Supabase not configured yet — use defaults silently
          setContent(DEFAULT_CONTENT);
          return;
        }

        // Merge fetched sections over defaults
        const merged = { ...DEFAULT_CONTENT };
        for (const row of data) {
          const section = row.section as keyof SiteContent;
          if (section in merged) {
            (merged as Record<string, unknown>)[section] = {
              ...(merged[section] as Record<string, unknown>),
              ...(row.data as Record<string, unknown>),
            };
          }
        }
        setContent(merged);
      } catch {
        setContent(DEFAULT_CONTENT);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  return { content, loading };
}
