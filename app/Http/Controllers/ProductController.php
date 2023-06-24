<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Get a product
    public function index()
    {
        $products = Product::with('category')->get();
        $categories = Category::all();
        $view = "products";
        return Inertia::render('ManageProducts', compact( 'products', 'categories', 'view' ));
    }

    // Store a new product
    public function store(Request $request)
    {
        $validatedProduct = $request->validate([
            'name' => ['required', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'price' => ['required', 'numeric', 'min:0' ],
        ]);
        Product::create($validatedProduct);
        return redirect("/products");
    }

    // Update a product
    public function update(Request $request, string $id)
    {
        $validatedProduct = $request->validate([
            'name' => ['required', 'max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'price' => ['required', 'numeric', 'min:0' ],
        ]);
        Product::query()->find($id)->update($validatedProduct);
        return redirect("/products");
    }

    // Remove a product
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect("/products");
    }
}
