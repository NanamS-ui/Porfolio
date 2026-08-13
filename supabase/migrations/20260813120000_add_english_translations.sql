/*
  # Add English translations for portfolio content

  ## Overview
  Adds optional `_en` columns next to the existing (French) text columns on
  `projects`, `skills`, `experience` and `formations`. This lets the site show
  English content when the visitor switches language, while requiring no
  changes to existing rows.

  ## Behavior
  - All new columns are nullable and default to NULL.
  - Rows with no `_en` value keep displaying the French text (the frontend
    falls back to the French column whenever the English one is empty), so
    you can translate content progressively, row by row, without breaking
    the English view in the meantime.
  - Proper nouns that don't need translation (company names, institutions,
    technology names, locations, image URLs, dates) are intentionally left
    without an `_en` counterpart.

  ## How to fill in translations
  Open the Supabase Studio Table Editor for each table and type the English
  text directly into the new `_en` columns, or run UPDATE statements, e.g.:

    UPDATE projects SET title_en = 'My Project', short_description_en = '...'
    WHERE id = '...';
*/

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS title_en text,
  ADD COLUMN IF NOT EXISTS short_description_en text,
  ADD COLUMN IF NOT EXISTS description_en text;

ALTER TABLE skills
  ADD COLUMN IF NOT EXISTS name_en text;

ALTER TABLE experience
  ADD COLUMN IF NOT EXISTS position_en text,
  ADD COLUMN IF NOT EXISTS description_en text;

ALTER TABLE formations
  ADD COLUMN IF NOT EXISTS diploma_en text,
  ADD COLUMN IF NOT EXISTS description_en text,
  ADD COLUMN IF NOT EXISTS debouches_en text[] DEFAULT '{}';
