<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Cargo as CargoResource;
use App\Cargo;

class CargoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CargoResource::collection(Cargo::all());
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
            'descripcion' => 'required',
        ]);
        $cargo = new Dispositivo([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
        ]);
        $cargo->save();
        return response()->json([
            'data' => 'Cargo creado!'
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
        return new CargoResource(Cargo::findOrFail($id));
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
            'descripcion' => 'required',
        ]);
        $cargo = Cargo::findOrFail($id);
        $cargo->nombre = $request->nombre;
        $cargo->descripcion = $request->descripcion;
        $cargo->save();

        return response()->json([
            'data' => 'Cargo actualizado!'
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
        $cargo = Cargo::findOrFail($id);
        $cargo->delete();

        return response()->json([
            'data' => 'Cargo eliminado!'
        ]);
    }
}
