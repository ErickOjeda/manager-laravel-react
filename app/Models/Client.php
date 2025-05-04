<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'name',
        'cpf',
        'genre',
        'birth',
        'city_id'
    ];

    protected $casts = [
        'birth' => 'date',
        'city_id' => 'integer'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function getResponsible()
    {
        return $this->city ? $this->city->responsible : null;
    }

    public function getGenreAttribute($value)
    {
        return $value === 'M' ? 'Masculino' : 'Feminino';
    }

    public function setGenreAttribute($value)
    {
        $this->attributes['genre'] = $value === 'Masculino' ? 'M' : 'F';
    }

    public function getBirthAttribute($value)
    {
        return $value ? \Carbon\Carbon::parse($value)->format('d/m/Y') : null;
    }
}
