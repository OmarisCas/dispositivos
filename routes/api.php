<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/
Route::resource('cargos', 'CargoController');
Route::resource('dispositivos', 'DispositivoController');
Route::resource('estados', 'EstadoController');
Route::resource('ipes', 'IpeController');
Route::get('ipesoff', 'IpeController@ipesoff');
Route::resource('personas', 'PersonaController');
Route::resource('conexiones', 'ConexioneController');
Route::resource('monitoreos', 'MonitoreoController');
Route::resource('filtros', 'FiltroController');