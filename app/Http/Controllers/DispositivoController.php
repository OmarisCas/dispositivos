<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Dispositivo as DispositivoResource;
use App\Dispositivo;

class DispositivoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DispositivoResource::collection(Dispositivo::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'mac' => 'required',
            'nombre' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
            'persona_id' => 'required',
        ]);
        $dispositivo = new Dispositivo([
            'mac' => $request->mac,
            'nombre' => $request->nombre,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'persona_id' => $request->persona_id,
        ]);
        $dispositivo->save();
        return response()->json([
            'data' => 'Dispositivo creado!'
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     * 
     * @param  int  $id
     * @param  \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return new DispositivoResource(Dispositivo::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'mac' => 'required',
            'nombre' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
            'persona_id' => 'required',
        ]);
        $dispositivo = Dispositivo::findOrFail($id);
        $dispositivo->mac = $request->mac;
        $dispositivo->nombre = $request->nombre;
        $dispositivo->marca = $request->marca;
        $dispositivo->modelo = $request->modelo;
        $dispositivo->persona_id = $request->persona_id;
        $dispositivo->save();

        return response()->json([
            'data' => 'Dispositivo actualizado!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dispositivo = Dispositivo::findOrFail($id);
        $dispositivo->delete();

        return response()->json([
            'data' => 'Dispositivo eliminado!'
        ]);
    }
}
