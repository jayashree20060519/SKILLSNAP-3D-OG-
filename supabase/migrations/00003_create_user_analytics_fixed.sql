
-- Create user_activity table for tracking feature usage
CREATE TABLE IF NOT EXISTS user_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  activity_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_type ON user_activity(activity_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity(created_at DESC);

-- Enable RLS
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Policies for user_activity
CREATE POLICY "Users can insert their own activity" ON user_activity
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own activity" ON user_activity
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all activity" ON user_activity
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- Create a function to get admin analytics (instead of view)
CREATE OR REPLACE FUNCTION get_admin_analytics()
RETURNS TABLE (
  total_users bigint,
  new_users_7d bigint,
  new_users_30d bigint,
  active_users_today bigint,
  active_users_7d bigint,
  active_users_30d bigint
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if user is admin
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied. Admin only.';
  END IF;

  RETURN QUERY
  SELECT 
    COUNT(DISTINCT p.id) as total_users,
    COUNT(DISTINCT CASE WHEN p.created_at >= NOW() - INTERVAL '7 days' THEN p.id END) as new_users_7d,
    COUNT(DISTINCT CASE WHEN p.created_at >= NOW() - INTERVAL '30 days' THEN p.id END) as new_users_30d,
    COUNT(DISTINCT CASE WHEN ua.created_at >= NOW() - INTERVAL '1 day' THEN ua.user_id END) as active_users_today,
    COUNT(DISTINCT CASE WHEN ua.created_at >= NOW() - INTERVAL '7 days' THEN ua.user_id END) as active_users_7d,
    COUNT(DISTINCT CASE WHEN ua.created_at >= NOW() - INTERVAL '30 days' THEN ua.user_id END) as active_users_30d
  FROM profiles p
  LEFT JOIN user_activity ua ON p.id = ua.user_id;
END;
$$;
