-- Allow users to update their own products ONLY if the status is 'draft'
CREATE POLICY "Users can update their own draft products" 
ON products 
FOR UPDATE 
TO authenticated 
USING ( (select auth.uid()) = user_id AND status = 'draft' )
WITH CHECK ( (select auth.uid()) = user_id AND status = 'draft' );
