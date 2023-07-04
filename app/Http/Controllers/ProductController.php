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
        return redirect()->back();
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
        return redirect()->back();
    }

    // Remove a product
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return redirect()->back();
    }

    // Remove some products in a row
    public function bulkDestroy(Request $request)
    {
        $request->validate(["ids" => ["required", "array", "min:1"]]);
        $ids = $request->input('ids');
        Product::destroy($ids);
        return redirect()->back()->with('success', 'Los recursos se han eliminado correctamente.');
    }
}
