<?php
include "AccesoDatos.php";
class Puntuacion
{
    private $mail;
    private $juego;
    private $id;
    private $puntuacion;
    public function __construct($id="",$mail="",$juego="",$puntuacion="")
    {
        $this->mail=$mail;
        $this->juego=$juego;
        $this->puntuacion=$puntuacion;
        $this->id=$id;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT into puntuaciones (mail,juego,puntuacion)values(:mail,:juego,:puntuacion)");
        $consulta->bindValue(':mail',$this->mail,  PDO::PARAM_STR);
        $consulta->bindValue(':juego',$this->juego,  PDO::PARAM_STR);
        $consulta->bindValue(':puntuacion',$this->puntuacion,  PDO::PARAM_STR);
        		
        return $consulta->execute()>0;
    }

    
    public function Traer()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from puntuaciones where mail= :mail order by juego");
        $consulta->bindValue(':mail',$this->mail,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }


}





?>