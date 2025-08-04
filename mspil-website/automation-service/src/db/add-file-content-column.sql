-- Add file_content column to store base64 encoded files
ALTER TABLE media_files 
ADD COLUMN IF NOT EXISTS file_content TEXT;

-- Update existing rows to have empty content (they'll need to be re-uploaded)
UPDATE media_files 
SET file_content = '' 
WHERE file_content IS NULL;