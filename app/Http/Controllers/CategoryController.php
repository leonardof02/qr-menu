<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // Listing the Categories Page
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('ManageCategories', ['categories' => $categories, 'view' => 'categories']);
    }

    // Create a category 
    public function store(Request $request)
    {
        $validatedProduct = $request->validate([
            'name' => ['required', 'max:255', 'alpha_num']
        ]);
        Category::create($validatedProduct);
        return redirect("/categories");
    }

    // Update a category
    public function update(Request $request, string $id)
    {
        $validatedProduct = $request->validate([
            'name' => ['required', 'max:255', 'alpha_num'],
        ]);
        Category::query()->find($id)->update($validatedProduct);
        return redirect("/products");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Category::findOrFail($id);
        $product->delete();
        return redirect()->back()->with('success', 'Los recursos se han eliminado correctamente.');
    }

    public function bulkDestroy(Request $request) {
        $request->validate(["ids" => ["required", "array", "min:1"]]);
        $ids = $request->input('ids');
        Category::destroy($ids);
        return redirect()->back()->with('success', 'Los recursos se han eliminado correctamente.');
    }
}
