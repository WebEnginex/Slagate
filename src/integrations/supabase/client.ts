
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Use the direct values instead of environment variables
const SUPABASE_URL = 'https://todwuewxymmybbunbclz.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvZHd1ZXd4eW1teWJidW5iY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2NzkzMzIsImV4cCI6MjA1OTI1NTMzMn0.oAZ2YtjJ9OsHnj7efpNCPXh5nEP7Y07I29a0g2uXOo4';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
