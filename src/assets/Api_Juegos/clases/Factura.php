<?php
class Factura
{
    public $id;
    public $total;
    public $mesa;
    public $fecha;
    public function __construct($id="",$total="",$mesa="",$fecha="")
    {
        $this->total=$estado;
        $this->mesa=$mesa;
        $this->fecha=$fecha;
        $this->id=$id;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "INSERT into factura (total,mesa)values(:total,:mesa)"
        );
        $consulta->bindValue(':total',$this->total,  PDO::PARAM_STR);
        $consulta->bindValue(':mesa',$this->mesa,  PDO::PARAM_STR);

        return $consulta->execute()>0;
    }

    
    public function TraerTodas()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from factura");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }



}





?>