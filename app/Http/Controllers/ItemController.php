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
        return Inertia::render('Items/Index', compact('items'));
    }

    public function create()
    {
        return Inertia::render('Items/Create', []);
    }

    public function store(Request $request)
    {
        $request->validate([
            'barcode' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'unit_measurement' => ['required', 'max:255'],
        ]); 

        Item::create($request->all());

        return redirect()->route('items.index');
    }

    public function edit(Item $item)
    {
        return Inertia::render('Items/Edit', 
            [
                'item' => $item
            ]);
    }

    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'barcode' => ['sometimes', 'required', 'max:255'],
            'name' => ['sometimes', 'required', 'max:255'],
            'unit_measurement' => ['sometimes', 'required', 'max:255'],
        ]);

        $item->update($validated);

        return redirect()->route('items.index');
    }


    public function destroy(Item $item)
    {
        $item->delete();
        return redirect()->route('items.index');
    }
}
