<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Category;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

// Admin Dashboard routes
Route::prefix('admin')->middleware(['auth'])->group( function() {

    Route::prefix('products')-> group( function() {

        // Products router
        Route::get('/', [ProductController::class, 'index']);
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);
        Route::post('/delete', [ProductController::class, 'bulkDestroy']);
        
    });
    
    Route::prefix('categories')-> group( function() {
        
        //  Router
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
        Route::post('/delete', [CategoryController::class, 'bulkDestroy']);
        
    });
    
    Route::get('/preview', function () {
        $categories = Category::query()->with('products')->get();
        return Inertia::render('MenuPreview', ['categories' => $categories, 'view' => 'preview']);
    });
});    

// Menu
Route::get('/menu', function() {
    $categories = Category::with('products')->get();
    return Inertia::render('MenuView', ['categories' => $categories]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';