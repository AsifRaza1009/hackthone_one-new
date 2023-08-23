CREATE TABLE IF NOT EXISTS "hackathon_one_new" (
	"cart_id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"product_name" varchar(256) NOT NULL,
	"product_slug" varchar(256) NOT NULL,
	"product_type" varchar(100) NOT NULL,
	"product_image_url" text NOT NULL,
	"product_size" varchar(10) NOT NULL,
	"product_quantity" integer NOT NULL,
	"product_price" integer NOT NULL,
	"create_time" timestamp DEFAULT now(),
	CONSTRAINT "dmunique" UNIQUE("user_id","product_name","product_size","product_price")
);
