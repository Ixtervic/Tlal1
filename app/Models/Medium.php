<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Medium extends Model
{
    /** @use HasFactory<\Database\Factories\MediumFactory> */
    use HasFactory, HasRoles;
}
