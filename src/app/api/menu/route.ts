import { NextResponse } from "next/server";
import { fallbackMenu } from "@/lib/constants";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type MenuCategoryRef = { slug: string } | { slug: string }[] | null;

type MenuItemRow = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  is_available: boolean;
  menu_categories: MenuCategoryRef;
};

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.from("menu_items").select("id,name,description,price,is_available,menu_categories(slug)").eq("is_available", true).order("name");
    if (error) throw error;
    const rows = (data || []) as unknown as MenuItemRow[];
    const items = rows.map((item) => {
      const category = Array.isArray(item.menu_categories) ? item.menu_categories[0]?.slug : item.menu_categories?.slug;
      return { ...item, category: category || "coffee" };
    });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: fallbackMenu });
  }
}
