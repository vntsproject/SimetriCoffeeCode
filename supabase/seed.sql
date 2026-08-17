insert into public.cafe_tables (table_number, capacity, is_active) values
(1,2,true),(2,2,true),(3,2,true),(4,2,true),
(5,4,true),(6,4,true),(7,4,true),(8,4,true),
(9,6,true),(10,6,true),(11,8,true),(12,8,true)
on conflict (table_number) do update set capacity = excluded.capacity, is_active = excluded.is_active;

insert into public.menu_categories (name, slug, sort_order) values
('Coffee','coffee',1),('Non Coffee','non-coffee',2),('Food','food',3),('Snack','snack',4),('Dessert','dessert',5)
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;

insert into public.menu_items (category_id, name, description, price, is_available)
select c.id, x.name, x.description, x.price, true
from (values
('coffee','Ice Creamy Latte','Espresso lembut, susu dingin, dan tekstur creamy.',38000),
('coffee','Cappuccino','Espresso klasik dengan foam yang rapi.',35000),
('coffee','Cafe Latte','Kopi susu hangat dengan rasa seimbang.',36000),
('coffee','Americano','Espresso dan air, clean dan panjang.',30000),
('coffee','Manual Brew','Seduhan manual dengan beans pilihan.',45000),
('non-coffee','Red Velvet Latte','Manis lembut dengan finish creamy.',40000),
('non-coffee','Chocolate','Cokelat nyaman untuk menemani waktu santai.',37000),
('non-coffee','Matcha Latte','Matcha earthy dengan susu yang halus.',42000),
('food','Spaghetti','Pasta hangat untuk makan siang atau malam.',65000),
('food','Chicken Bites','Potongan ayam renyah, ringan untuk berbagi.',52000),
('food','Curry Rice','Nasi kari hangat dengan rasa comforting.',68000),
('food','Platter','Pilihan sharing untuk meja ramai.',75000),
('snack','Tater Tots','Kentang mungil renyah untuk teman kopi.',32000),
('snack','French Fries','Kentang goreng klasik, gurih dan ringan.',30000),
('snack','Waffle','Waffle hangat dengan topping sederhana.',45000),
('dessert','Ice Cream','Dessert dingin yang clean dan ringan.',28000)
) as x(slug, name, description, price)
join public.menu_categories c on c.slug = x.slug
where not exists (select 1 from public.menu_items m where lower(m.name) = lower(x.name));
