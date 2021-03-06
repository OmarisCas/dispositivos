<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Persona extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'apellido' => $this->apellido,
            'cargo_id' => $this->cargo_id,
        ];
    }
}
