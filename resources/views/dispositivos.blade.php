<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Dispositivos</title>

        <link href="{{ asset('css/app.css') }}" rel="stylesheet" />
        <link rel="icon" href="img/favicon3.png" type="image/png" />
    </head>
    <body>
        <div id="example2"></div>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>
