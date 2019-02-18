<?php
class LogEmpleado
{
    public $id;
    public $empleado;
    public $fecha;
    public function __construct($id="",$empleado="",$fecha="")
    {
        $this->empleado=$empleado;
        $this->fecha=$fecha;
        $this->id=$id;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "INSERT into logempleado (empleado) values (:empleado)"
        );
        $consulta->bindValue(':empleado',$this->empleado,  PDO::PARAM_STR);
        		
        return $consulta->execute()>0;
    }

    
    public function TraerTodoCantidad()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT count(*) from logempleado GROUP BY empleado");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }


}





?>