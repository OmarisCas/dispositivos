<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Estado as EstadoResource;
use App\{Estado};

class EstadoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return EstadoResource::collection(Estado::all());
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
            'nombre' => 'required',
        ]);
        $estado = new Estado([
            'nombre' => $request->nombre,
        ]);
        $estado->save();
        return response()->json([
            'data' => 'Estado creado!'
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
        return new EstadoResource(Estado::findOrFail($id));
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
            'nombre' => 'required',
        ]);
        $estado = Estado::findOrFail($id);
        $estado->nombre = $request->nombre;
        $estado->save();

        return response()->json([
            'data' => 'Estado actualizado!'
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
        $estado = Estado::findOrFail($id);
        $estado->delete();

        return response()->json([
            'data' => 'Estado eliminado!'
        ]);
    }
}
