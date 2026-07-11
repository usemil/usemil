export interface Tool {
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: any; 
  available: boolean;
  // --- New SEO Fields ---
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}