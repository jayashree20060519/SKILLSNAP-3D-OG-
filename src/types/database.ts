// Database RPC function types
export interface Database {
  public: {
    Functions: {
      get_conversation_summaries: {
        Args: { p_user_id: string };
        Returns: Array<{
          conversation_id: string;
          title: string;
          created_at: string;
          updated_at: string;
          message_count: number;
          first_message: string;
        }>;
      };
      delete_conversation: {
        Args: { p_conversation_id: string; p_user_id: string };
        Returns: void;
      };
      update_conversation_title: {
        Args: { p_conversation_id: string; p_user_id: string; p_title: string };
        Returns: void;
      };
      get_admin_analytics: {
        Args: Record<string, never>;
        Returns: Array<{
          total_users: number;
          new_users_7d: number;
          new_users_30d: number;
          active_users_today: number;
          active_users_7d: number;
          active_users_30d: number;
        }>;
      };
    };
  };
}
