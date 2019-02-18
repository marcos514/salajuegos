<?php
use Firebase\JWT\JWT as JWT;
include_once "AccesoDatos.php";

class Usuario
{
    public $nombre;
    public $clave;
    public $tipo;

    public function __construct($nombre="",$clave="",$tipo="")
    {
        $this->tipo=$tipo;
        $this->nombre=$nombre;
        $this->clave=$clave;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuario (nombre,clave,tipo)values(:nombre,:clave,:tipo)");
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':clave',$this->clave, PDO::PARAM_STR);
        $consulta->bindValue(':tipo',$this->tipo, PDO::PARAM_STR);
        return $consulta->execute();
    }

    public function Borrar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE usuario
            SET activo = false where nombre = :nombre"
        );
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
		$consulta->execute();
		return $consulta->rowCount();
    }
    
    public function TraerEste()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from usuario where nombre=:nombre and clave=:clave LIMIT 1");
        $consulta->bindValue(':nombre',$this->nombre, PDO::PARAM_STR);
        $consulta->bindValue(':clave',$this->clave, PDO::PARAM_STR);
        $consulta->execute();
        // $var=$consulta->fetch(PDO::FETCH_ASSOC);
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function verificarToken($request, $response, $next) {
        $token = ($request->getHeader("token")[0]);

        try {
            $todo= JWT::decode($token,"clave",array('HS256'));

        }
        catch(Exception $e) {
            $json = '{ "Error" : "Token inválido" }';
            return $response->withJson(json_decode($json), 409);
        }

        return $next($request, $response);
    }

    public function verificarMozo($request, $response, $next) {
        $token = ($request->getHeader("token")[0]);
        $json = '{ "Error" : "Token inválido" }';

        try {
            $todo= JWT::decode($token,"clave",array('HS256'));
            if($todo->tipo != 'mozo'){
                return $response->withJson(json_decode($json), 409);
            }
        }
        catch(Exception $e) {
            return $response->withJson(json_decode($json), 409);
        }

        return $next($request, $response);
    }


    public function verificarSocio($request, $response, $next) {
        $token = ($request->getHeader("token")[0]);
        $json = '{ "Error" : "Token inválido" }';

        try {
            $todo= JWT::decode($token,"clave",array('HS256'));
            if($todo->tipo != 'socio'){
                return $response->withJson(json_decode($json), 409);
            }
        }
        catch(Exception $e) {
            return $response->withJson(json_decode($json), 409);
        }

        return $next($request, $response);
    }


}





?>