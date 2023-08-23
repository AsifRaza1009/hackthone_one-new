import { db } from "@/db/drizzle";
import { hackathon_one_new } from "@/db/schema/script";
import { sql, eq, asc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let body = await request.json();
  const userId = request.headers.get("authorization");
  if (body && userId) {
    const cartItem = {
      product_name: body.product_name,
      product_slug: body.product_slug,
      product_type: body.product_type,
      product_price: body.product_price,
      product_image_url: body.product_image_url,
      product_size: body.product_size,
      product_quantity: body.product_quantity,
      user_id: userId,
    };
    try {
      const response = await db
        .insert(hackathon_one_new)
        .values(cartItem)
        .onConflictDoUpdate({
          target: [
            hackathon_one_new.user_id,
            hackathon_one_new.product_name,
            hackathon_one_new.product_price,
            hackathon_one_new.product_size,
          ],
          set: {
            product_quantity: sql`${cartItem.product_quantity} + hackathon_one_new.product_quantity`,
          },
        })
        .returning();
      return NextResponse.json(response, {
        status: 201,
      });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      }
    );
  }
}

export async function GET(request: NextRequest) {
  const userId = request.headers.get("authorization");
  if (userId) {
    try {
      const response = await db
        .select()
        .from(hackathon_one_new)
        .where(eq(hackathon_one_new.user_id, userId)) // equal expression in words
        .orderBy(
          asc(hackathon_one_new.product_name),
          asc(hackathon_one_new.product_size)
        );
      return NextResponse.json(response, {
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      }
    );
  }
}

// delete api is always based on userId
export async function DELETE(request: NextRequest) {
  const userId = request.headers.get("authorization");
  if (userId) {
    try {
      const response = await db
        .delete(hackathon_one_new)
        .where(eq(hackathon_one_new.user_id, userId)) // equal expression in words
        .returning();
      return NextResponse.json(response, {
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
        },
        {
          status: 500,
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      }
    );
  }
}
