<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dispositivo extends Model
{
    protected $fillable = [
        'mac', 'nombre', 'marca', 'modelo', 'persona_id'
    ];
}
