
-- Add conversation_id to group messages
ALTER TABLE chat_history ADD COLUMN IF NOT EXISTS conversation_id uuid DEFAULT gen_random_uuid();
ALTER TABLE chat_history ADD COLUMN IF NOT EXISTS conversation_title text;

-- Create indexes for faster conversation queries
CREATE INDEX IF NOT EXISTS idx_chat_history_conversation_id ON chat_history(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_user_conversation ON chat_history(user_id, conversation_id, created_at);

-- Function to get conversation summaries
CREATE OR REPLACE FUNCTION get_conversation_summaries(p_user_id uuid)
RETURNS TABLE (
  conversation_id uuid,
  title text,
  created_at timestamptz,
  updated_at timestamptz,
  message_count bigint,
  first_message text
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ch.conversation_id,
    COALESCE(
      MAX(ch.conversation_title),
      SUBSTRING(MIN(CASE WHEN ch.role = 'user' THEN ch.message END) FROM 1 FOR 50)
    ) as title,
    MIN(ch.created_at) as created_at,
    MAX(ch.created_at) as updated_at,
    COUNT(*)::bigint as message_count,
    MIN(CASE WHEN ch.role = 'user' THEN ch.message END) as first_message
  FROM chat_history ch
  WHERE ch.user_id = p_user_id
  GROUP BY ch.conversation_id
  ORDER BY MAX(ch.created_at) DESC;
END;
$$;

-- Function to update conversation title
CREATE OR REPLACE FUNCTION update_conversation_title(
  p_conversation_id uuid,
  p_user_id uuid,
  p_title text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Verify user owns this conversation
  IF NOT EXISTS (
    SELECT 1 FROM chat_history 
    WHERE conversation_id = p_conversation_id 
    AND user_id = p_user_id
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  -- Update all messages in this conversation
  UPDATE chat_history
  SET conversation_title = p_title
  WHERE conversation_id = p_conversation_id
  AND user_id = p_user_id;
END;
$$;

-- Function to delete conversation
CREATE OR REPLACE FUNCTION delete_conversation(
  p_conversation_id uuid,
  p_user_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM chat_history
  WHERE conversation_id = p_conversation_id
  AND user_id = p_user_id;
END;
$$;
