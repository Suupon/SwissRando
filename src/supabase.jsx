import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://vxjlzviyogrkaktydxmi.supabase.co/';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4amx6dml5b2dya2FrdHlkeG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3MTM2NzksImV4cCI6MjAxOTI4OTY3OX0.X0MrLTpwPWtr3umqaZVwY0RBkUNzzm-5jkVRI7bcpyY'
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase }; 