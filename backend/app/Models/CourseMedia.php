<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseMedia extends Model
{
    use HasFactory;

    protected $primaryKey = "cm_id";

    protected $fillable = [
        'course_id',
        'title',
        'duration',
        'filename',
        'description',
        'full_path',
    ];
}
