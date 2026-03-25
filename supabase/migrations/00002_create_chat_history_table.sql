-- Create chat_history table for AI Mentor
CREATE TABLE IF NOT EXISTS public.chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  has_image boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own chat history" ON public.chat_history;
CREATE POLICY "Users can view their own chat history"
  ON public.chat_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own chat history" ON public.chat_history;
CREATE POLICY "Users can insert their own chat history"
  ON public.chat_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own chat history" ON public.chat_history;
CREATE POLICY "Users can delete their own chat history"
  ON public.chat_history
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON public.chat_history(user_id, created_at DESC);