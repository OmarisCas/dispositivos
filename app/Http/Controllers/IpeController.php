<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Ipe as IpeResource;
use App\{Ipe};

class IpeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return IpeResource::collection(Ipe::all());
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
            'longitud' => 'required',
        ]);
        $ipe = new Ipe([
            'longitud' => $request->longitud,
        ]);
        $ipe->save();
        return response()->json([
            'data' => 'IP creada!'
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
        return new IpeResource(Ipe::findOrFail($id));
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
            'longitud' => 'required',
        ]);
        $ipe = Ipe::findOrFail($id);
        $ipe->longitud = $request->longitud;
        $ipe->save();

        return response()->json([
            'data' => 'IP actualizada!'
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
        $ipe = Ipe::findOrFail($id);
        $ipe->delete();

        return response()->json([
            'data' => 'IP eliminada!'
        ]);
    }
}
