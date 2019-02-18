<?php
class Mesa
{
    public $id;
    public $cliente;
    public $estado;
    public $mozo;
    public $codigo;
    public function __construct($id="",$codigo="",$cliente="",$estado="", $mozo="")
    {
        $this->estado=$estado;
        $this->mozo=$mozo;
        $this->cliente=$cliente;
        $this->codigo=$codigo;
        $this->id=$id;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "INSERT into mesa (codigo)values(:codigo)"
        );
        $consulta->bindValue(':codigo',$this->codigo,  PDO::PARAM_STR);

        return $consulta->execute()>0;
    }

    // 
    public function TraerTodas()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from mesa");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
// 
    public function TraerDisponibles()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from mesa WHERE estado = 'libre'");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

//
    public function GetCodigo()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT codigo from mesa WHERE id = :id");
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }
//
    public function CerrarMesa()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE mesa SET estado = 'libre', cliente = NULL, mozo = NULL where id = :id"
        );
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        
		return $consulta->execute()>0;
    }

//
    public function AltaMesa()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE mesa SET estado = 'ocupada', cliente = :cliente, mozo = :mozo where id = :id"
        );
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        $consulta->bindValue(':cliente',$this->cliente,  PDO::PARAM_STR);
        $consulta->bindValue(':mozo',$this->mozo,  PDO::PARAM_STR);
        
        
		return $consulta->execute()>0;
    }


    public function EsperandoPedido()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE mesa SET estado = 'con cliente esperando pedido' where id = :id"
        );
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->execute()>0;
    }

    public function ClientesComiendo()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE mesa SET estado = 'con clientes comiendo' where id = :id"
        );
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        
        
		return $consulta->execute()>0;
    }

    public function MesaPagar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE mesa SET estado = 'con clientes pagando' where id = :id"
        );
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        
		return $consulta->execute()>0;
    }


}





?>