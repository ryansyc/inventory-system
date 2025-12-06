<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::orderBy('transaction_date', 'desc')->get();

    
        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Transactions/Form', [
            'transaction' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', 'max:255'],
            'date' => ['required', 'max:255'],
            'total_amount' => ['required', 'numeric'],
            'notes' => ['required'],
        ]); 

        Transaction::create($validated);

        return redirect('/transactions');
    }

    public function edit(Transaction $transaction)
    {
        return Inertia::render('Transactions/Form', 
            [
                'transaction' => $transaction,
            ]);
    }

    public function update(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'type' => ['required', 'max:255'],
            'date' => ['required', 'max:255'],
            'total_amount' => ['required', 'numeric'],
            'notes' => ['required'],
        ]); 

        $transaction->update($validated);

        return redirect('/transactions');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return redirect('/transactions');
    }
}
