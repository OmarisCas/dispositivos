<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Dispositivo, Estado};

class Ipe extends Model
{
    /**
     * Campos a actualizar.
     */
    protected $fillable = [
        'longitud', 'estado_id'
    ];

    /**
     * Obtener la(s) conexione(s) asociado a ese dispositivo.
     */
    public function dispositivos(){
        return $this->belongsToMany('App\Dispositivo', 'conexiones')->withTimesTamps();
        //return $this->belongsToMany('App\Carne', 'registros')->withPivot('empleado_id');
    }

    /**
     * Obtener el estado asociado a esta IP.
     */
    public function estado()
    {
        return $this->belongsTo('App\Estado');
    }

}
