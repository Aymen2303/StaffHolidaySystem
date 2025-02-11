import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://vdgtyrvundqordopnwlc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkZ3R5cnZ1bmRxb3Jkb3Bud2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzNDUzNTgsImV4cCI6MjA1MzkyMTM1OH0.OuxKKqJVdYQBGMdfoD1Jo2bVYUO9WF0PI95Lc4zGaWU';
export const supabase = createClient(supabaseUrl, supabaseKey);