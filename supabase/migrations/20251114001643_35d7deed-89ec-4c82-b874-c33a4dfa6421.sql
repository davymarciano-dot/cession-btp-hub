-- Enable realtime for messages table
ALTER TABLE public.messages REPLICA IDENTITY FULL;

-- The messages table is now ready for realtime subscriptions