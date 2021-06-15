<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Monitoreo extends JsonResource
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
            'fecha' => $this->fecha,
            'descripcion' => $this->descripcion,
            'conexione_id' => $this->conexione_id,
            'estado_id' => $this->estado_id,
        ];
    }
}
