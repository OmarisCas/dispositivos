<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Conexione as ConexioneResource;
use App\{Conexione, Dispositivo, Ipe, Estado};

class ConexioneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ConexioneResource::collection(Conexione::all());
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
            'dispositivo_id' => 'required',
            'ipe_id' => 'required',
            'estado_id' => 'required',
        ]);
        $IP = $request->ipe_id;
        $conexione = new Conexione([
            'dispositivo_id' => $request->dispositivo_id,
            'ipe_id' => $request->ipe_id,
            'estado_id' => $request->estado_id,
            'descripcion' => $request->descripcion,
        ]);
        $conexione->save();
        $stateIP = Ipe::find($IP);
        $stateIP->estado_id = 2;
        $stateIP->save();
        return response()->json([
            'data' => 'Conexión creada!'
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
        return new ConexioneResource(Conexione::findOrFail($id));
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
            'dispositivo_id' => 'required',
            'ipe_id' => 'required',
            'estado_id' => 'required',
        ]);
        $conexione = Conexione::findOrFail($id);
        $conexione->dispositivo_id = $request->dispositivo_id;
        $conexione->ipe_id = $request->ipe_id;
        $conexione->estado_id = $request->estado_id;
        $conexione->descripcion = $request->descripcion;
        $conexione->save();

        return response()->json([
            'data' => 'Conexion actualizada!'
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
        $conexione = Conexione::findOrFail($id);
        $conexione->delete();

        return response()->json([
            'data' => 'Conexion eliminada!'
        ]);
    }
}
