<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Item;
use App\Models\Category;

class ItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Items/Index', [
            'items' => Item::with('category:id,name')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Items/Form', [
            'item' => null,
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'unit' => ['required', 'max:255'],
            'min_stock' => ['required', 'numeric'],
            'category_id' => ['required', 'exists:categories,id'],
        ]); 

        Item::create($validated);

        return redirect('/items');
    }

    public function edit(Item $item)
    {
        return Inertia::render('Items/Form', 
            [
                'item' => $item,
                'categories' => Category::select('id', 'name')->get()
            ]);
    }

    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'code' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'unit' => ['required', 'max:255'],
            'min_stock' => ['required', 'numeric'],
            'category_id' => ['required', 'exists:categories,id'],
        ]); 

        $item->update($validated);

        return redirect('/items');
    }

    public function destroy(Item $item)
    {
        $item->delete();
        return redirect('/items');
    }
}
