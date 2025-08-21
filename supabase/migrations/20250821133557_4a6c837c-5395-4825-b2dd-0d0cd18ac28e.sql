-- Update admin user password hash for secret login
UPDATE public.admin_users 
SET password_hash = '$2b$10$RxK8J3Wh4zD.5vF0qYQZ5OUxmXu7EbT9GnL2sV8wK6iH1jP3cA0.Y'
WHERE username = 'ADM_RMRP';

-- Insert if not exists
INSERT INTO public.admin_users (username, password_hash, is_active) 
VALUES ('ADM_RMRP', '$2b$10$RxK8J3Wh4zD.5vF0qYQZ5OUxmXu7EbT9GnL2sV8wK6iH1jP3cA0.Y', true)
ON CONFLICT (username) DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  is_active = EXCLUDED.is_active;