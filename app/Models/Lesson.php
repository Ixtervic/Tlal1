<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Spatie\Permission\Traits\HasRoles;



class Lesson extends Model
{
    use HasFactory, HasRoles;

    protected $fillable = [
        'module_id',
        'title',
        'slug',
        'content_text',
        'duration_seconds',
        'position',
        'is_required',
    ];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    public function quizze(): HasOne
    {
        return $this->hasOne(Quizze::class);
    }

    public function progressItems(): HasMany
    {
        return $this->hasMany(ProgressItem::class);
    }

    public function medium(): MorphMany
    {
        return $this->morphMany(Medium::class, 'mediaable');
    }

}
