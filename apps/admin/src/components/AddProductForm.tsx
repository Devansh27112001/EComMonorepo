"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

// DUMMY DATA
const categories = [
  "T-Shirts",
  "Shoes",
  "Accessories",
  "Bags",
  "Dresses",
  "Jackets",
  "Gloves",
] as const;

const sizes = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

const colors = [
  "Red",
  "Blue",
  "Green",
  "Black",
  "White",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
  "Brown",
  "Gray",
] as const;

const formSchema = z.object({
  name: z.string().min(1, { message: "Product name is required!" }),
  shortDescription: z
    .string()
    .min(1, { message: "Short description is required!" })
    .max(60),

  description: z.string().min(1, { message: "Short description is required!" }),
  price: z
    .number()
    .min(1, { message: "Price is required!" })
    .gte(10, { message: "Price must be greater than or equal to $10" }),
  category: z.enum(categories, {
    required_error: "Category is required!",
  }),
  colors: z.array(z.enum(colors)),
  sizes: z.array(z.enum(sizes)),
  images: z.record(z.enum(colors), z.string()),
});

const AddProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return (
    <SheetContent className="overflow-y-scroll">
      <SheetHeader>
        <SheetTitle className="mb-8">Add Product</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the name of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="shortDescription"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the short description of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the description of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the price of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SELECT ELEMENT - for category */}
              <FormField
                name="category"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem value={category} key={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Enter the category of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CHECKBOX - sizes and colors */}
              <FormField
                name="sizes"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-2 my-2">
                        {sizes.map((size) => (
                          <div className="flex gap-2 items-center" key={size}>
                            <Checkbox
                              id="size"
                              checked={field.value?.includes(size)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                if (checked) {
                                  field.onChange([...currentValues, size]);
                                } else {
                                  field.onChange(
                                    currentValues.filter(
                                      (value) => value !== size
                                    )
                                  );
                                }
                              }}
                            />
                            <label htmlFor="size" className="text-xs">
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Select the available size(s) of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="colors"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Colors</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 my-2">
                          {colors.map((color) => (
                            <div
                              className="flex gap-2 items-center"
                              key={color}
                            >
                              <Checkbox
                                id="color"
                                checked={field.value?.includes(color)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    field.onChange([...currentValues, color]);
                                  } else {
                                    field.onChange(
                                      currentValues.filter(
                                        (value) => value !== color
                                      )
                                    );
                                  }
                                }}
                              />
                              <label
                                htmlFor="color"
                                className="text-xs flex items-center gap-2"
                              >
                                <div
                                  className="size-3 rounded-full"
                                  style={{
                                    backgroundColor: color,
                                  }}
                                />
                                {color}
                              </label>
                            </div>
                          ))}
                        </div>
                        {field.value && field.value.length > 0 && (
                          <div className="space-y-2 mt-4">
                            <p className="textsm font-medium">
                              Upload images for selected colors
                            </p>
                            {field.value.map((color) => (
                              <div
                                className="flex items-center gap-2 text-xs"
                                key={color}
                              >
                                <div
                                  className="size-3 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                                <span className="min-w-[60px]">{color}</span>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  className="cursor-pointer"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      Select the available color(s) of the product.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddProductForm;
