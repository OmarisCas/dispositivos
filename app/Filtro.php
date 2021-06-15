<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Dispositivo};

class Filtro extends Model
{
    /**
     * Campos a actualizar.
     */
    protected $fillable = [
        'codigo',
        'nombre'
    ];

    /**
     * Obtener lo(s) dispositivo(s) asociado en este filtro.
     */
    public function dispositivos()
    {
        return $this->hasMany('App\Dispositivo', 'dispositivos');
    }

}
