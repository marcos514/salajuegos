<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "./vendor/autoload.php";
require_once "./clases/Usuario.php";
require_once "./clases/Encuesta.php";
require_once "./clases/Factura.php";
require_once "./clases/LogEmpleado.php";
require_once "./clases/LogMesa.php";
require_once "./clases/Mesa.php";
require_once "./clases/Pedido.php";
require_once "./clases/PedidoProducto.php";
require_once "./clases/Producto.php";



use Firebase\JWT\JWT as JWT;


$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$config['determineRouteBeforeAppMiddleware'] = true;

$app = new Slim\App(["settings" => $config]);

$app->group('/usuario', function () {

    $this->post('/login', function ($request, $response,$arg) 
    {  
        $json = $request->getParsedBody();
        $nombre= $json["nombre"];
        $clave=$json["clave"];

        $usuario=new Usuario($nombre,$clave);
        $usuario = $usuario->TraerEste();
        if($usuario)
        {
            $log = new LogEmpleado("",$nombre);
            $log->Agregar();
            $array=array("nombre"=> $usuario[0]['nombre'],"tipo"=> $usuario[0]['tipo']);
            $token=JWT::encode($array,"clave");
            $ret = array('token' =>  $token);
            return $response->withJson($ret,200);
        }
        else
        {
            return $response->withJson("Error",404);
        }  
    });

    $this->post('/signup', function ($request, $response,$arg) 
    {   
        $decode = $request->getParsedBody();
        // $decode = json_decode($json['datos']);
        // var_dump($decode);
        // die();
        // return $response->withJson($decode,200);
        $clave=$decode["clave"];
        $nombre=$decode["nombre"];
        $tipo=$decode["tipo"];
        // var_dump($mail);
        // die();
        try
        {
            $usuario=new Usuario($nombre,$clave,$tipo);
            // return $response->withJson($usuario->Agregar(),200);
            if($usuario->Agregar())
            {
                return $response->withJson(true,200);   
            }
            return $response->withJson("Error",404);   
        }
        catch(Exception $e)
        {
            throw $e;

        }
    });
    
    
});



$app->group('/mesa', function () {

    $this->post('/alta', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $token=($request->getHeader("token"))[0];
        $id=$json["id"];
        $codigo='';
        $cliente=$json["cliente"];
        $estado='';
        
        try
        {
            $todo= JWT::decode($token,"clave",array('HS256'));
            $mozo=$todo->nombre;
            $mesa = new Mesa($id, $codigo, $cliente, $estado, $mozo);
            if($mesa->AltaMesa())
            {
                return $response->withJson(true,200);
            }
            return $response->withJson(false,500);   
        }
        catch(Exception $e)
        {
            throw $e;

        }
    
    return $response;
    })->add(\Usuario::class . ':verificarMozo');



    $this->post('/agregar', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $codigo=$json["codigo"];
        $mesa = new Mesa("",$codigo);
        if($mesa->Agregar()){
            return $response->withJson(true,200);
        }
        return $response->withJson(false,200);
    })->add(\Usuario::class . ':verificarSocio');
    


    $this->get('/libres', function ($request, $response) 
    {   
        try
        {
            $mesa = new Mesa($id, $codigo, $cliente, $estado, $mozo);
            return $response->withJson($mesa->TraerDisponibles(),200);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    
    return $response;
    })->add(\Usuario::class . ':verificarToken');


    $this->get('/todas', function ($request, $response) 
    {   
        try
        {
            $mesa = new Mesa($id, $codigo, $cliente, $estado, $mozo);
            return $response->withJson($mesa->TraerTodas(),200);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    
    return $response;
    });




    $this->post('/clave', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $id=$json['id'];
        $mesa = new Mesa($id);
        return $response->withJson($mesa->GetCodigo(),200);
    
    return $response;
    });


    $this->post('/cerrar', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $id=$json['id'];
        $mesa = new Mesa($id);
        return $response->withJson($mesa->CerrarMesa(),200);
    
    return $response;
    });


    $this->post('/esperarPedido', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $id=$json['id'];
        $mesa = new Mesa($id);
        return $response->withJson($mesa->EsperandoPedido(),200);
    
    return $response;
    })->add(\Usuario::class . ':verificarMozo');
    

    $this->post('/clienteComiendo', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $id=$json['id'];
        $mesa = new Mesa($id);
        return $response->withJson($mesa->ClientesComiendo(),200);
    
    return $response;
    })->add(\Usuario::class . ':verificarMozo');


    $this->post('/clientePagando', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $id=$json['id'];
        $mesa = new Mesa($id);
        return $response->withJson($mesa->MesaPagar(),200);
    
    return $response;
    })->add(\Usuario::class . ':verificarMozo');
    

     
});

$app->group('/productos', function () {

    $this->post('/alta', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        // $id="",$descripcion="", $sector="",$precio=""
        $id="";
        $descripcion=$json["descripcion"];
        $sector=$json["sector"];
        $precio=$json["precio"];
        
        $producto = new Producto($id, $descripcion, $sector, $precio);
        if($producto->Agregar()){
            return $response->withJson(true,200);
        }
        return $response->withJson(false,200);
    })->add(\Usuario::class . ':verificarSocio');



    $this->post('/baja', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        // $id="",$descripcion="", $sector="",$precio=""
        $id=$json["id"];
        $descripcion=$json["descripcion"];
        $sector=$json["sector"];
        $precio=$json["precio"];
        
        $producto = new Producto($id, $descripcion, $sector, $precio);
        return $response->withJson($producto->Borrar(),200);
    })->add(\Usuario::class . ':verificarSocio');


    $this->get('/traerTodos', function ($request, $response) 
    {   
        $producto = new Producto();
        return $response->withJson($producto->TraerTodos(),200);
    });


    $this->post('/traer/id', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        // $id="",$descripcion="", $sector="",$precio=""
        $id=$json["id"];
        $descripcion=$json["descripcion"];
        $sector=$json["sector"];
        $precio=$json["precio"];
        
        $producto = new Producto($id, $descripcion, $sector, $precio);
        return $response->withJson($producto->TraerPorId(),200);
    });


    $this->post('/traer/nombre', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $id=$json["id"];
        $descripcion=$json["descripcion"];
        $sector=$json["sector"];
        $precio=$json["precio"];
        
        $producto = new Producto($id, $descripcion, $sector, $precio);
        return $response->withJson($producto->TraerPorNombre(),200);
    });

    
});


$app->group('/pedido', function () {

    $this->post('/alta', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $token=($request->getHeader("token"))[0];

        $mesa = $json["mesa"];
        $productos = $json["productos"];
        $productos = explode(",", $productos);
        // $codigo;

        // $pedido;
        // $producto;
        // $comienzo;
        // $fin;
        // $comanda;
        // $finEsperado;

        // $id=$json["mesa"];
        // $codigo='';
        // $cliente=$json["cliente"];
        // $estado='';
        
        try
        {
            $todo= JWT::decode($token,"clave",array('HS256'));
            $mozo=$todo->nombre;
            $pedido = new Pedido("", $mesa);
            $respuesta_pedido = $pedido->Agregar();
            $respuesta_pedido=json_decode($respuesta_pedido);
            if($respuesta_pedido->execute){
                $cantidad_agregada = 0;
                for ($i=0; $i < sizeof($productos); $i++) { 
                    $pp = new PedidoProducto("",$respuesta_pedido->id,$productos[$i]);
                    if($pp->Agregar()){
                        $cantidad_agregada = $cantidad_agregada + 1;
                    }
                }
                return $response->withJson($respuesta_pedido->codigo,200);
            }
            return $response->withJson(false,400);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    
    return $response;
    })->add(\Usuario::class . ':verificarMozo');


    $this->post('/tomar/sector/libres', function ($request, $response) 
    {   
        $token=($request->getHeader("token"))[0];

        //bwXpx mesa 2
        try
        {
            $pp = new PedidoProducto();
            $todo= JWT::decode($token,"clave",array('HS256'));
            return $response->withJson($pp->TraerParaHacer($todo->tipo),200);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    
    return $response;
    })->add(\Usuario::class . ':verificarToken');




    $this->post('/tomar/aceptados', function ($request, $response) 
    {   
        $token=($request->getHeader("token"))[0];

        //bwXpx mesa 2
        try
        {
            $todo= JWT::decode($token,"clave",array('HS256'));
            $pp = new PedidoProducto("","","","", $todo->nombre);
            return $response->withJson($pp->TraerAceptados(),200);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    
    return $response;
    })->add(\Usuario::class . ':verificarToken');

    $this->post('/aceptar', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $token=($request->getHeader("token"))[0];

        $pedidos = $json["pedidos"];
        $finEsperado = $json["finEsperado"];
        try
        {
            $todo= JWT::decode($token,"clave",array('HS256'));
            $comienzo = date("o-m-d H:i:s");
            $pp = new PedidoProducto($pedidos,"","",$finEsperado, $todo->nombre, "",$comienzo);
            return $response->withJson($pp->AceptarPedido(),200);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    
    return $response;
    })->add(\Usuario::class . ':verificarToken');

    $this->post('/pagar', function ($request, $response) 
    {   
        $json = $request->getParsedBody();

        $pedidos = explode(",",$json["pedidos"]);
        $cantidad = 0;
        $pp = new PedidoProducto();
        foreach ($pedidos as $pedido) {
            $pp->id = $pedido;
            if($pp->Pagar()){
                $cantidad = $cantidad +1;
            }
        }
        return $response->withJson($cantidad,200);
    })->add(\Usuario::class . ':verificarSocio');

    $this->post('/entregar', function ($request, $response) 
    {   
        $json = $request->getParsedBody();

        $pedido = $json["pedido"];
        $pp = new PedidoProducto($pedido);
            if($pp->Pagar()){
                return $response->withJson(true,200);
            }
            return $response->withJson(false,200);
        });

    $this->post('/terminar', function ($request, $response) 
    {   
        $json = $request->getParsedBody();

        $pedido = $json["pedidos"];
        $fin = date("o-m-d H:i:s");
        $cantidad = 0;
        $pp = new PedidoProducto("","","","","","","",$fin);
            $pp->id = $pedido;
            if($pp->TerminarPedido()>0){
                return $response->withJson(true,200);
            }
            return $response->withJson(false,200);
    })->add(\Usuario::class . ':verificarToken');

    $this->get('/mios', function ($request, $response) 
    {   
        $token=($request->getHeader("token"))[0];

        try
        {
            $todo= JWT::decode($token,"clave",array('HS256'));
            $pp = new PedidoProducto("","","","", $todo->nombre);
            return $response->withJson($pp->TraerMios(),200);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    })->add(\Usuario::class . ':verificarToken');

    $this->post('/cliente', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $mesa = $json["mesa"];
        $pedido = $json["pedido"];
        $pedido = new Pedido("","", $pedido);
        return $response->withJson($pedido->TraerClientePedido($mesa),200);
    });

    $this->get('/todo', function ($request, $response) 
    {   
        $pedido = new PedidoProducto();
        return $response->withJson($pedido->TraerTodos(),200);
    });

});




$app->group('/factura', function () {

    $this->post('/generar', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        // $id="",$descripcion="", $sector="",$precio=""
        $mesa=$json["mesa"];

        $p = new Pedido("", $mesa);
        $total = $p->ContarPrecio();
        $factura = new Factura("", $total[0]["precio"], $mesa);
        if($factura->Agregar()){
            return $response->withJson($total[0]["precio"],200);
        }
        return $response->withJson(false,200);
    })->add(\Usuario::class . ':verificarSocio');

    
});


$app->group('/encuesta', function () {

    $this->post('/generar', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        // $id="",$descripcion="", $sector="",$precio=""
        $mesa=$json["mesa"];
        $mozo=$json["mozo"];
        $restaurant=$json["restaurant"];
        $cocinero=$json["cocinero"];
        $idMesa=$json["idMesa"];
        $idMozo=$json["idMozo"];
        $comentario=$json["comentario"];


        $e = new Encuesta($mesa,$mozo, $restaurant,$cocinero,$comentario,$idMesa,$idMozo);
        if($e->Agregar()){
            return $response->withJson(true,200);
        }
        return $response->withJson(false,200);
    });

    
});



// lo nuevo  date("o-m-d H:i:s")

/*$app->post('/{mail}/{clave}', function ($request, $response,$args) 
{
    $mail=$args["mail"];
    $clave=$args["clave"];



    try
    {
        $empleado=new Empleado($mail,"","",$clave);
        $usuariosObtenidos=$empleado->TraerEste();
        if($usuariosObtenidos>0)
        {
            $array=array("mail"=>$usuariosObtenidos["mail"],"nombre"=> $usuariosObtenidos["nombre"]/*,"exp"=>time(),"iat"=>time());
            $token=JWT::encode($array,"clave");
            return $response->withJson($token,200);
        }
        return $response->withJson(false,200);   
    }
    catch(Exception $e)
    {
        throw $e;

    }
    
});*/

$app->get('[/]', function ($request, $response) 
{  
    return $response->withJson("hola",200);
 
});

$app->run();

?>