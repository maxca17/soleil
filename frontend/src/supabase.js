
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hzeucjkylwzsnokemmqx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6ZXVjamt5bHd6c25va2VtbXF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzOTE2MTMsImV4cCI6MjAzNDk2NzYxM30.MHDarEbkRyR9L-di8WiVFdfWlat48_yZ0uD3hDcClVY';

export const supabase = createClient(supabaseUrl, supabaseKey);



//const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
//const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;