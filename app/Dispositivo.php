<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Persona;

class Dispositivo extends Model
{
    /**
     * Campos a actualizar.
     */
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

    public function ipes(){
        return $this->belongsToMany('App\Ipe', 'conexiones')->withTimesTamps();
        //return $this->belongsToMany('App\Empleado', 'registros')->withPivot('carne_id');
    }
}
