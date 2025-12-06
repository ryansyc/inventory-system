<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Categories/Form', [
            'category' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
        ]); 

        Category::create($validated);

        return redirect('/categories');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Categories/Form', 
            [
                'category' => $category,
            ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'max:255'],
        ]); 

        $category->update($validated);

        return redirect('/categories');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect('/categories');
    }


}
