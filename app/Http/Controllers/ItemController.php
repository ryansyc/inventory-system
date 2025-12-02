<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Item;

class ItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Items/Index', []);
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
}
