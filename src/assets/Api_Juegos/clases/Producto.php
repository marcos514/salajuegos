<?php
class Producto
{
    public $precio;
    public $descripcion;
    public $id;
    public $sector;
    public function __construct($id="",$descripcion="", $sector="",$precio="")
    {
        $this->descripcion=$descripcion;
        $this->sector=$sector;
        $this->precio=$precio;
        $this->id=$id;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO producto(precio, descripcion, sector)VALUES(:precio,:descripcion,:sector)");
        $consulta->bindValue(':precio',$this->precio,PDO::PARAM_STR);
        $consulta->bindValue(':descripcion',$this->descripcion,PDO::PARAM_STR);
        $consulta->bindValue(':sector',$this->sector,PDO::PARAM_STR);
        return $consulta->execute();
    }

    public function Borrar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "DELETE FROM producto WHERE id = :id"
        );
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        var_dump($consulta);
        return $consulta->execute()>0;
    }

    public function TraerTodos()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from producto");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function TraerPorNombre()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from producto WHERE descripcion LIKE :descripcion");
        $consulta->bindValue(':descripcion','%'.$this->descripcion.'%',  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function TraerPorId()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from producto WHERE id = :id");
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }


}





?>