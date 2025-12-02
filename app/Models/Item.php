<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = [
        'barcode',
        'name',
        'unit_measurement',
        'status'
    ];
}
