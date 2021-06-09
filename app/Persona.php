<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Persona, Cargo};

class Persona extends Model
{
    /**
     * Campos a actualizar.
     */
    protected $fillable = [
        'nombre', 'apellido', 'cargo_id'
    ];
    
    /**
     * Obtener el cargo asociado a la persona.
     */
    public function cargo() //persona->nombre
    {
        return $this->belongsTo('App\Cargo');
    }
}
