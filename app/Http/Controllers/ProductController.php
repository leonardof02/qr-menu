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
        return Inertia::render('ManageProducts', compact( 'products', 'categories' ));
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

        ddd($validatedProduct);

        $name = $validatedProduct['name'];
        $price = $validatedProduct['price'];
        $categoryId = Category::where('name', $validatedProduct['category'])->firstOrFail();
        Product::create([
            'name' => $name,
            'price' => $price,
            'category_id' => $categoryId,
        ]);

        return redirect()->route("products.get");
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
