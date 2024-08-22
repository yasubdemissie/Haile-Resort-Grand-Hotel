import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ucudndobpeseexpnblkn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdWRuZG9icGVzZWV4cG5ibGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3OTg0MzMsImV4cCI6MjAzOTM3NDQzM30.7pm79PssKPCgVDoIIzRR3P5L8ONYiytjYXT0tBOl7sU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
