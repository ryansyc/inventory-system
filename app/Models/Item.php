<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\TransactionItem;

class Item extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'code',
        'name',
        'unit',
        'price',
    ];

    public function transactionItems()
    {
        return $this->hasMany(TransactionItem::class);
    }
}
