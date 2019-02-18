<?php
class LogMesa
{
    public $id;
    public $mesa;
    public $fecha;
    public function __construct($id="",$mesa="",$fecha="")
    {
        $this->mesa=$mesa;
        $this->fecha=$fecha;
        $this->id=$id;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "INSERT into logMesa (mesa)values(:mesa)"
        );
        $consulta->bindValue(':mesa',$this->mesa,  PDO::PARAM_STR);
        		
        return $consulta->execute()>0;
    }

    
    public function TraerTodoCantidad()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT mesa, count(*) from logMesa GROUP BY mesa");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }


}





?>