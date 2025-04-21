// filepath: c:\Users\Fab\Desktop\Solo_last\arise-ascension-web\src\integrations\supabase\client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Récupérer les variables d'environnement
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Log temporaire pour vérifier les valeurs
console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_PUBLISHABLE_KEY:', SUPABASE_PUBLISHABLE_KEY);

// Vérification des variables
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Les variables SUPABASE_URL ou SUPABASE_PUBLISHABLE_KEY ne sont pas définies.');
}

// Créer le client Supabase
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);