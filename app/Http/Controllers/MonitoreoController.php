<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Monitoreo as MonitoreoResource;
use App\{Monitoreo, Conexione, Dispositivo, Ipe, Estado};

class MonitoreoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MonitoreoResource::collection(Monitoreo::all());
        //return MonitoreoResource::collection(Conexione::orderBy('ipe_id', 'asc')->get());
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
            'fecha' => 'required',
            'conexione_id' => 'required',
            'estado_id' => 'required',
        ]);
        $monitoreo = new Monitoreo([
            'fecha' => $request->fecha,
            'descripcion' => $request->descripcion,
            'conexione_id' => $request->conexione_id,
            'estado_id' => $request->estado_id,
        ]);
        $monitoreo->save();
        return response()->json([
            'data' => 'Monitoreo creado!'
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
        return new MonitoreoResource(Monitoreo::findOrFail($id));
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
            'fecha' => 'required',
            'conexione_id' => 'required',
            'estado_id' => 'required',
        ]);
        $monitoreo = Monitoreo::findOrFail($id);
        $monitoreo->fecha = $request->fecha;
        $monitoreo->descripcion = $request->descripcion;
        $monitoreo->conexione_id = $request->conexione_id;
        $monitoreo->estado_id = $request->estado_id;
        $monitoreo->save();
        return response()->json([
            'data' => 'Monitoreo actualizado!'
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
        $monitoreo = Monitoreo::findOrFail($id);
        $monitoreo->delete();
        return response()->json([
            'data' => 'Monitoreo eliminado!'
        ]);
    }
}
