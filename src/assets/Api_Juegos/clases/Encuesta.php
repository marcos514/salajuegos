<?php
class Encuesta
{
    public $mesa;
    public $mozo;
    public $restaurant;
    public $cocinero;
    public $comentario;
    public function __construct($mesa=0,$mozo=0, $restaurant=0,$cocinero=0,$comentario="")
    {
        $this->mesa=$mesa;
        $this->mozo=$mozo;
        $this->restaurant=$restaurant;
        $this->cocinero=$cocinero;
        $this->comentario=$comentario;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "INSERT into encuesta (mesa,mozo,restaurant,cocinero,comentario) values (:mesa,:mozo,:restaurant,:cocinero,:comentario)"
        );
        $consulta->bindValue(':mesa',$this->mesa,  PDO::PARAM_STR);
        $consulta->bindValue(':mozo',$this->mozo,  PDO::PARAM_STR);
        $consulta->bindValue(':restaurant',$this->restaurant,  PDO::PARAM_STR);
        $consulta->bindValue(':cocinero',$this->cocinero,  PDO::PARAM_STR);
        $consulta->bindValue(':comentario',$this->comentario,  PDO::PARAM_STR);
        		
        return $consulta->execute()>0;
    }

    
    public function TraerTodas()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from encuesta");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }


}





?>