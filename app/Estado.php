<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Conexione, Ipe};

class Estado extends Model
{
    /**
     * Campos a actualizar.
     */
    protected $fillable = [
        'codigo',
        'nombre'
    ];

    /**
     * Obtener la(s) conexiones(s) asociada en ese estado.
     */
    public function conexiones()
    {
        return $this->hasMany('App\Conexione', 'conexiones');
    }

    /**
     * Obtener la(s) ipe(s) asociada en ese estado.
     */
    public function ipes()
    {
        return $this->hasMany('App\Ipe', 'ipes');
    }

}
