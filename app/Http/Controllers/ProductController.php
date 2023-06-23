<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->get();
        $categories = Category::all();
        $view = "products";
        return Inertia::render('ManageProducts', compact( 'products', 'categories', 'view' ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // TODO: Refactor category name and change by category id in frontend
        $validatedProduct = $request->validate([
            'name' => ['required', 'max:255'],
            'category' => ['required', 'exists:categories,name'],
            'price' => ['required', 'numeric', 'min:0' ],
        ]);

        $name = $validatedProduct['name'];
        $price = $validatedProduct['price'];
        $categoryId = Category::where('name', $validatedProduct['category'])->firstOrFail();

        $newProduct = new Product;
        $newProduct->name = $name;
        $newProduct->price = $price;
        $newProduct->category_id = $categoryId;
        $newProduct->save();

        return to_route("/products");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
