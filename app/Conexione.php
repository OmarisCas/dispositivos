<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Dispositivo, Ipe, Estado};

class Conexione extends Model
{
    protected $fillable = [
        'dispositivo_id', 'ipe_id', 'estado_id', 'descripcion'
    ];

    /**
     * Obtener el estado asociado a esta conexion.
     */
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }
}
