-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 
-- Products Policies
--

-- Users can read their own products
CREATE POLICY "Users can view their own products" 
ON products 
FOR SELECT 
TO authenticated 
USING ( (select auth.uid()) = user_id );

-- Users can insert their own products
CREATE POLICY "Users can insert their own products" 
ON products 
FOR INSERT 
TO authenticated 
WITH CHECK ( (select auth.uid()) = user_id );

-- Note: UPDATE and DELETE are intentionally omitted for authenticated users.
-- This enforces the "Immutable Product" rule. Only the service_role (which bypasses RLS)
-- can update the product to append AI generated content.

--
-- Workflows Policies
--

-- Users can view workflows for their own products
CREATE POLICY "Users can view workflows of their products" 
ON workflows 
FOR SELECT 
TO authenticated 
USING ( 
  product_id IN (
    SELECT id FROM products WHERE user_id = (select auth.uid())
  ) 
);

-- Note: INSERT/UPDATE/DELETE omitted. Handled by backend service_role.

--
-- Jobs Policies
--

-- Users can view jobs for their own workflows/products
CREATE POLICY "Users can view jobs of their workflows" 
ON jobs 
FOR SELECT 
TO authenticated 
USING ( 
  workflow_id IN (
    SELECT id FROM workflows WHERE product_id IN (
      SELECT id FROM products WHERE user_id = (select auth.uid())
    )
  ) 
);

-- Note: INSERT/UPDATE/DELETE omitted. Handled by backend service_role.
