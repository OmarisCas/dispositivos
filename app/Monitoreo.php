<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Conexione, Dispositivo, Ipe, Estado};

class Monitoreo extends Model
{
    protected $fillable = [
        'fecha', 'descripcion', 'conexione_id' ,'estado_id'
    ];

    /**
     * Obtener el estado asociado a esta conexion.
     */
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }
}
