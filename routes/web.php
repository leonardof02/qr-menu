<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Products router
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);
Route::post('/products/delete', [ProductController::class, 'bulkDestroy']);

// Categories Router
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [ProductController::class, 'store']);
Route::put('/categories/{id}', [ProductController::class, 'update']);
Route::delete('/categories/{id}', [ProductController::class, 'destroy']);
Route::post('/categories/delete', [ProductController::class, 'bulkDestroy']);


Route::get('/preview', function () {
    $categories = Category::query()->with('products')->get();
    return Inertia::render('MenuPreview', ['categories' => $categories, 'view' => 'preview']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';