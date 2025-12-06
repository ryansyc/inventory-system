<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();

        return Inertia::render('Items/Index', [
            'items' => $items,
    ]);
}

    public function create()
    {
        return Inertia::render('Items/Form', [
            'item' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'unit' => ['required', 'max:255'],
            'stock' => ['required', 'numeric'],
        ]); 

        Item::create($validated);

        return redirect('/items');
    }

    public function edit(Item $item)
    {
        return Inertia::render('Items/Form', 
            [
                'item' => $item,
            ]);
    }

    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'code' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'unit' => ['required', 'max:255'],
            'stock' => ['required', 'numeric'],
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
