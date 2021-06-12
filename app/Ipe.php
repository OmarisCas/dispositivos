<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\{Dispositivo};

class Ipe extends Model
{
    /**
     * Campos a actualizar.
     */
    protected $fillable = [
        'longitud'
    ];

    public function dispostiivos(){
        return $this->belongsToMany('App\Dispositivo', 'conexiones')->withTimesTamps();
        //return $this->belongsToMany('App\Carne', 'registros')->withPivot('empleado_id');
    }

}
