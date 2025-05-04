<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    
    protected $fillable = [
        'name',
        'state'
    ];

    public function clients()
    {
        return $this->hasMany(Client::class);
    }

    public function responsible()
    {
        return $this->hasMany(Responsible::class);
    }
  
}
