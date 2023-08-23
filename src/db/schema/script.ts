import { InferModel } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  boolean,
  integer,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const hackathon_one_new = pgTable(
  "hackathon_one_new",
  {
    cart_id: serial("cart_id").primaryKey(),
    user_id: varchar("user_id", { length: 100 }).notNull(),
    product_name: varchar("product_name", { length: 256 }).notNull(),
    product_slug: varchar("product_slug", { length: 256 }).notNull(),
    product_type: varchar("product_type", { length: 100 }).notNull(),
    product_image_url: text("product_image_url").notNull(),
    product_size: varchar("product_size", { length: 10 }).notNull(),
    product_quantity: integer("product_quantity").notNull(),
    product_price: integer("product_price").notNull(),
    create_time: timestamp("create_time").defaultNow(),
  },
  (t) => ({
    unq: unique("dmunique").on(
      t.user_id,
      t.product_name,
      t.product_size,
      t.product_price
    ),
  })
);

export type CartItem = InferModel<typeof hackathon_one_new>; // return type when queried
export type NewCartItem = InferModel<typeof hackathon_one_new, "insert">; // insert type
