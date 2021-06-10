<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Cargo, Dispositivo};

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

    /**
     * Obtener lo(s) dispositivo(s) asociado a la persona.
     */
    public function dispositivos()
    {
        return $this->hasMany('App\Dispositivo');
    }
}
