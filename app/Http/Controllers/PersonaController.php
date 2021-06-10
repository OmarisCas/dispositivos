<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Persona as PersonaResource;
use App\{Persona, Cargo, Dispositivo};

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PersonaResource::collection(Persona::all());
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
            'apellido' => 'required',
            'cargo_id' => 'required',
        ]);
        $persona = new Persona([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'cargo_id' => $request->cargo_id,
        ]);
        $persona->save();
        return response()->json([
            'data' => 'Persona creada!'
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
        return new PersonaResource(Persona::findOrFail($id));
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
            'apellido' => 'required',
            'cargo_id' => 'required',
        ]);
        $persona = Persona::findOrFail($id);
        $persona->nombre = $request->nombre;
        $persona->apellido = $request->apellido;
        $persona->cargo_id = $request->cargo_id;
        $persona->save();

        return response()->json([
            'data' => 'Persona actualizada!'
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
        $persona = Persona::findOrFail($id);
        $persona->delete();

        return response()->json([
            'data' => 'Persona eliminada!'
        ]);
    }

}
