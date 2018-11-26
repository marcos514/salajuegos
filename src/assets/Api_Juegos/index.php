<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once "./vendor/autoload.php";
require_once "./clases/Usuario.php";
require_once "./clases/Puntuacion.php";



use Firebase\JWT\JWT as JWT;


$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$config['determineRouteBeforeAppMiddleware'] = true;

$app = new Slim\App(["settings" => $config]);

$app->group('/usuario', function () {

    $this->post('/login', function ($request, $response,$arg) 
    {  
        $json = $request->getParsedBody();
        $mail= $json["mail"];
        $clave=$json["clave"];

        $usuario=new Usuario($mail,"","",$clave);
        if($usuario->TraerEste())
        {
            $array=array("mail"=>$usuario->mail);
            $token=JWT::encode($array,"clave");
            $ret = array('token' =>  $token);
            return $response->withJson($ret,200);
        }
        else
        {
            return $response->withJson("Errir",404);
        }  
    });

    $this->post('/signup', function ($request, $response,$arg) 
    {   
        $decode = $request->getParsedBody();
        // $decode = json_decode($json['datos']);
        // var_dump($decode);
        // die();
        // return $response->withJson($decode,200);
        $mail= $decode["mail"];
        $clave=$decode["clave"];
        $nombre=$decode["nombre"];
        $apellido=$decode["apellido"];
        // var_dump($mail);
        // die();
        try
        {
            $usuario=new Usuario($mail,$nombre,$apellido,$clave);
            // return $response->withJson($usuario->Agregar(),200);
            if($usuario->Agregar())
            {
                $array=array("mail"=>$usuario->mail,"nombre"=> $usuario->nombre,"apellido"=> $usuario->apellido);
                $token=JWT::encode($array,"clave");
                $ret = array('token' =>  $token);
                return $response->withJson($ret,200);
            }
            return $response->withJson("Error",404);   
        }
        catch(Exception $e)
        {
            throw $e;

        }
    });
    
    
});



$app->group('/puntuacion', function () {

    $this->post('[/]', function ($request, $response) 
    {   
        $json = $request->getParsedBody();
        $juego= $json["juego"];
        $puntuacion=$json["puntuacion"];
        $token=($request->getHeader("token"))[0];

        try
        {
            $todo= JWT::decode($token,"clave",array('HS256'));
            $puntuacion=new Puntuacion("",$todo->mail,$juego,$puntuacion);
            if($puntuacion->Agregar()>0)
            {
                return $response->withJson(true,200);
            }
            return $response->withJson(false,404);   
        }
        catch(Exception $e)
        {
            throw $e;

        }
    
    return $response;
    })->add(\Usuario::class . ':verificarToken');



    $this->get('[/]', function ($request, $response,$arg) 
    {   

        $token=($request->getHeader("token")[0]);
        try
        {         
            $todo= JWT::decode($token,"clave",array('HS256'));        
            $puntuacion = new Puntuacion("",$todo->mail);
            $ret =new stdClass();     
            $ret->puntuacion=$puntuacion->Traer();
            return $response->withJson($ret,200);
        }
        catch(Exception $e)
        {
            throw $e;

        }
    })->add(\Usuario::class . ':verificarToken');
     
});














// lo nuevo 

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











































/*
$app->post('[/]', function ($request, $response) {   
    $cd=new cd();
    $json=$request->getParsedBody();
    $cd->titulo=$json["titulo"];
    $cd->cantante=$json["cantante"];
    $cd->año=$json["año"];
    try
        {
            $todo= JWT::decode($json["token"],"clave",["HS256"]);
            $response->getBody()->write("token valido");
        }
        catch(Exception $e)
        {
            throw $e;

        }

    
    $response->getBody()->write($cd->InsertarElCd());

    
    return $response;
    
});
$app->get('[/]', function (Request $request, Response $response) { 
    $header=($request->getHeader("token"));
    try
    {
        $todo= JWT::decode($header[0],"clave",["HS256"]);
    }
    catch(Exception $e)
    {
        throw $e;
    }   
    $cd=new cd();
    $todo=cd::TraerTodoLosCds();
    
    
    //$response=$response->withJson($todo, 200);
   return $response->withJson($todo, 200);
});
$app->put('[/]', function (Request $request, Response $response) { 
    $header=($request->getHeader("token"));
    try
    {
        $todo= JWT::decode($header[0],"clave",["HS256"]);
    }
    catch(Exception $e)
    {
        throw $e;
    }   
    $cd=new cd();
    $todo=cd::TraerTodoLosCds();
    
    
    //$response=$response->withJson($todo, 200);
   return $response->withJson($todo, 200);
});
$app->delete('[/]', function (Request $request, Response $response) { 
    $header=($request->getHeader("token"));
    try
    {
        $todo= JWT::decode($header[0],"clave",["HS256"]);
    }
    catch(Exception $e)
    {
        throw $e;
    }   
    $cd=new cd();
    $todo=cd::TraerTodoLosCds();
    
    
    //$response=$response->withJson($todo, 200);
   return $response->withJson($todo, 200);
});

//$app->add(\Verificadora::class."::VerificarUsuario");*/
$app->run();

?>