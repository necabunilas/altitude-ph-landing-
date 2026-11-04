// The POS decides what guests can order: its public menu endpoint leaves out items
// marked unavailable or out of stock, and any category left empty.
const POS_URL = process.env.POS_URL ?? 'https://altitude-pos.vercel.app';
const ADD_ONS_CATEGORY = 'Add-ons';

export type MenuItem = { name: string; price: number; description: string };
export type MenuCategory = { label: string; items: MenuItem[] };
export type Menu = { categories: MenuCategory[]; addOns: MenuItem[] };

type PosCategory = {
  name: string;
  items: { name: string; description: string; priceCents: number }[];
};

// Throws when the POS can't be reached, so Next keeps serving the last good page.
export async function getMenu(): Promise<Menu> {
  const res = await fetch(`${POS_URL}/api/menu`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`POS menu request failed: ${res.status}`);
  const { menu }: { menu: PosCategory[] } = await res.json();

  const categories = menu.map(({ name, items }) => ({
    label: name,
    items: items.map((item) => ({
      name: item.name,
      price: item.priceCents / 100,
      description: item.description.replace(/\s*\p{Extended_Pictographic}/gu, '').trim(),
    })),
  }));

  return {
    categories: categories.filter((c) => c.label !== ADD_ONS_CATEGORY),
    addOns: categories.find((c) => c.label === ADD_ONS_CATEGORY)?.items ?? [],
  };
}
