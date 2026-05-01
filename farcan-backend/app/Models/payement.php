<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class payement extends Model
{
    //
    protected $fillable = [
        'course_id',
        'amount',
        'transaction_id',
        'payment_method',
        'status',
    ];
}
