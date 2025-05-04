<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Responsible extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'city_id'
    ];

    protected $casts = [
        'city_id' => 'integer'
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function getClients()
    {
        return $this->hasMany(Client::class, 'city_id', 'city_id');
    }
}
