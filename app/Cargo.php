<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Cargo, Persona};

class Cargo extends Model
{
    /**
     * Campos a actualizar.
     */
    protected $fillable = [
        'nombre', 'descripcion'
    ];

    /**
     * Obtener la(s) persona(s) asociada al cargo.
     */
    public function personas()
    {
        return $this->hasMany('App\Persona');
    }
}
