export const product = {
    name: "product",
    type: "document",
    title: "Product",
    fields: [
      {
        name: "name",
        title: "Product Name",
        type: "string",
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        },
      },
      {
        name: "type",
        title: "Product Type",
        type: "string",
      },
      {
          name: "price",
          title: "Product Price",
          type: "number",
        },
  
        {
          name: 'image',
          title: 'Product Image',
          type: 'array',
          of: [{ type: 'image' }],
        },
        {
          name: "category",
          title: "Product Category",
          type: "reference",
          to:[
            {
              type:"category"
            }
          ],
        },
        {
          name: 'details',
          title: 'Product Details',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'care',
          title: 'Product Care',
          type: 'array',
          of: [{ type: 'block' }],
        },
    ],
  };  

