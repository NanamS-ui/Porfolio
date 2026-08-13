/*
  # Require captcha-verified submissions for contact messages

  ## Why
  Previously, the anon key could insert directly into `contact_messages` with
  no verification at all, which is how the table would end up spammed. The
  frontend now submits through the `submit-contact` Edge Function, which
  verifies an hCaptcha token server-side before inserting (using the service
  role key, which bypasses RLS entirely).

  ## Change
  Drops the old policy that let the anon/authenticated roles insert directly.
  Direct inserts via the public API are no longer possible - only the Edge
  Function (running with the service role) can write to this table now.
*/

DROP POLICY IF EXISTS "Anyone can send contact messages" ON contact_messages;
