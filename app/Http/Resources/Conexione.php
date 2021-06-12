<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Conexione extends JsonResource
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
            'dispositivo_id' => $this->dispositivo_id,
            'ipe_id' => $this->ipe_id,
            'estado_id' => $this->estado_id,
        ];
    }
}
