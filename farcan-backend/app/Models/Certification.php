<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    //
    protected $fillable = [
        'user_id',
        'course_id',
        'file_path',
    ];
}
