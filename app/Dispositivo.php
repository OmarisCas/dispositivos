<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Persona;

class Dispositivo extends Model
{
    protected $fillable = [
        'mac', 'nombre', 'marca', 'modelo', 'persona_id'
    ];

    /**
     * Obtener la persona asociada al dispositivo.
     */
    public function persona() //persona->nombre
    {
        return $this->belongsTo('App\Persona');
    }
}
