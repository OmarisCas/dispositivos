<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Dispositivo extends JsonResource
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
            'mac' => $this->mac,
            'nombre' => $this->nombre,
            'marca' => $this->marca,
            'modelo' => $this->modelo,
            'persona_id' => $this->persona_id,
        ];
    }
}
