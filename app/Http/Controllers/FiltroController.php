<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Filtro as FiltroResource;
use App\{Filtro, Dispositivo};

class FiltroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FiltroResource::collection(Filtro::all());
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
            'codigo' => 'required',
            'nombre' => 'required',
        ]);
        $filtro = new Filtro([
            'codigo' => $request->codigo,
            'nombre' => $request->nombre,
        ]);
        $filtro->save();
        return response()->json([
            'data' => 'Filtro creado!'
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
        return new FiltroResource(Filtro::findOrFail($id));
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
            'codigo' => 'required',
            'nombre' => 'required',
        ]);
        $filtro = Filtro::findOrFail($id);
        $filtro->codigo = $request->codigo;
        $filtro->nombre = $request->nombre;
        $filtro->save();

        return response()->json([
            'data' => 'Filtro actualizado!'
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
        $filtro = Filtro::findOrFail($id);
        $filtro->delete();

        return response()->json([
            'data' => 'Filtro eliminado!'
        ]);
    }
}
