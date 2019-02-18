<?php
class Pedido
{
    public $id;
    public $mesa;
    public $codigo;
    public $estado;

    public function __construct($id="",$mesa="", $codigo="", $estado="")
    {
        $this->id=$id;
        $this->mesa=$mesa;
        $this->codigo=$codigo;
        $this->estado=$estado;
    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "INSERT into pedido ( mesa, codigo)values(:mesa, :codigo)"
        );

        $pool = array_merge(range(0,9), range('a', 'z'),range('A', 'Z'));
        $codigo  = "";
        for($i=0; $i < 5; $i++) {
            $codigo .= $pool[mt_rand(0, count($pool) - 1)];
        }

        $consulta->bindValue(':mesa',$this->mesa,  PDO::PARAM_STR);
        $consulta->bindValue(':codigo',$codigo,  PDO::PARAM_STR);
        $arr = array('execute' => $consulta->execute(), 'codigo' => $codigo);

        $consulta =$objetoAccesoDato->RetornarConsulta(
            "SELECT * FROM pedido ORDER BY id desc limit 1 "
        );
        $consulta->execute();
        $arr["id"] = $consulta->fetchAll(PDO::FETCH_ASSOC)[0]["id"];
        return json_encode($arr);
    }

    
    public function TraerTodos()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from pedido");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function TraerNoEntregados()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from pedido WHERE entregado IS NULL");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function TraerEntregados()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * from pedido WHERE entregado IS NOT NULL");
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    // public function TraerParaEntregar()
    // {
    //     $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    //     $consulta =$objetoAccesoDato->RetornarConsulta("SELECT p.*, pp.* 
    //         from pedido p
    //         LEFT JOIN pedido_producto pp ON pp.pedido = p.id
    //         WHERE p.estado IS NULL AND pp.hora_fin IS NOT NULL AND
    //         p.mesa in :mesa
    //         ");
    //     $consulta->bindValue(':mesa',$this->mesa,  PDO::PARAM_STR);
    //     $consulta->execute();
        
	// 	return $consulta->fetchAll(PDO::FETCH_ASSOC);
    // }

    public function TraerClientePedido($codigoMesa)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "SELECT pp.id id, pp.pedido pedido, pr.descripcion descripcion, pp.comienzo comienzo ,pp.finEsperado finEsperado
            from pedidoproducto pp 
            LEFT JOIN producto pr ON pr.id = pp.producto 
            LEFT JOIN pedido p ON p.id = pp.pedido
            LEFT JOIN mesa m ON m.id = p.mesa 
            WHERE p.codigo = :codigo AND m.codigo = :codigoMesa and pp.fin is null");
        $consulta->bindValue(':codigo',$this->codigo,  PDO::PARAM_STR);
        $consulta->bindValue(':codigoMesa',$codigoMesa,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function EntregadoTodo()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE pedido SET entregado = 'true' where id = :id"
        );
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->execute()>0;
    }

    public function ContarPrecio()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT SUM(pr.precio) as precio 
            from pedido p 
            Left Join pedidoproducto pp ON pp.pedido = p.id 
            Left Join mesa m ON m.id = p.mesa 
            Left Join producto pr ON pr.id = pp.producto 
            WHERE p.mesa = :mesa AND pp.estado != 'pagado' ");
        $consulta->bindValue(':mesa',$this->mesa,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }


}





?>