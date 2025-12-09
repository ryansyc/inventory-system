<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\TransactionItem;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Item extends Model
{
    use HasFactory;
    
    protected const THRESHOLD = 10;
    protected $fillable = [
        'code',
        'name',
        'unit',
        'quantity',
    ];

    public function transactionItems()
    {
        return $this->hasMany(TransactionItem::class);
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes): string {
                $quantity = $attributes['quantity'];

                if ($quantity <= 0) {
                    return 'Empty';
                }
                
                if ($quantity <= self::THRESHOLD) {
                    return 'Low';
                }

                return 'Available';
            },
        );
    }
}
