<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class ChatBot extends Model
{
    /** @use HasFactory<\Database\Factories\ChatBotFactory> */
    use HasFactory, HasRoles;
}
