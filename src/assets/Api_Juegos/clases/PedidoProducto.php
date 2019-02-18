<?php
class PedidoProducto
{
    public $id;
    public $pedido;
    public $producto;
    public $comienzo;
    public $fin;
    public $comanda;
    public $finEsperado;
    public $estado;
    public function __construct($id="",$pedido="",$producto="", $finEsperado="", $comanda = "", $estado="", $comienzo = '', $fin='')
    {
        $this->id=$id;
        $this->pedido=$pedido;
        $this->comienzo=$comienzo;
        $this->fin=$fin;
        $this->producto=$producto;
        $this->finEsperado=$finEsperado;
        $this->comanda=$comanda;
        $this->estado=$estado;

    }

    public function Agregar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "INSERT into pedidoproducto (pedido, producto)values(:pedido,:producto)"
        );
        $consulta->bindValue(":pedido",$this->pedido,PDO::PARAM_STR);
        $consulta->bindValue(":producto",$this->producto,PDO::PARAM_STR);
        return $consulta->execute();
    }

    
    public function TraerAceptados()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT pp.id id, pp.pedido pedido, pr.descripcion descripcion, m.mozo mozo, m.cliente cliente 
            from pedidoproducto pp
            LEFT JOIN producto pr ON pr.id = pp.producto
            LEFT JOIN pedido p ON p.id = pp.pedido
            LEFT JOIN mesa m ON m.id = p.mesa
            WHERE  pp.comanda = :comanda AND pp.fin IS NULL");
        $consulta->bindValue(':comanda',$this->comanda,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function TraerMios()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT  pp.pedido pedido, pp.estado estado, p.codigo codigo, pr.descripcion descripcion, m.mozo mozo, m.cliente cliente, m.id
            from pedidoproducto pp
            LEFT JOIN producto pr ON pr.id = pp.producto
            LEFT JOIN pedido p ON p.id = pp.pedido
            LEFT JOIN mesa m ON m.id = p.mesa
            WHERE  m.mozo = :mozo and p.estado is null");
        $consulta->bindValue(':mozo',$this->comanda,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function TraerParaHacer($sector)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT pp.id id, pp.pedido pedido, pr.descripcion descripcion, m.mozo mozo, m.cliente cliente 
            from pedidoproducto pp 
            LEFT JOIN producto pr ON pr.id = pp.producto 
            LEFT JOIN pedido p ON p.id = pp.pedido
            LEFT JOIN mesa m ON m.id = p.mesa 
            WHERE pr.sector = :sector and pp.comanda IS NULL
        ");
        $consulta->bindValue(':sector',$sector,  PDO::PARAM_STR);
        $consulta->execute();
        
		return $consulta->fetchAll(PDO::FETCH_ASSOC);
    }

    public function AceptarPedido()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE pedidoproducto 
            SET comanda = :comanda, comienzo = :comienzo, finEsperado = :finEsperado, estado = 'en preparacion'
            where id = :id");
        $consulta->bindValue(':comanda',$this->comanda,  PDO::PARAM_STR);
        $consulta->bindValue(':comienzo',$this->comienzo,  PDO::PARAM_STR);
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        $consulta->bindValue(':finEsperado',$this->finEsperado,  PDO::PARAM_STR);
        
        
		return $consulta->execute()>0;
    }

    // public function TerminarPedidoCompleto()
    // {
    //     $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
    //     $consulta =$objetoAccesoDato->RetornarConsulta(
    //         "UPDATE pedidoproducto 
    //         SET estado = 'listo para servir', fin =:fin
    //         where pedido = :pedido");
    //     $consulta->bindValue(':pedido',$this->pedido,  PDO::PARAM_STR);
    //     $consulta->bindValue(':fin',$this->fin,  PDO::PARAM_STR);
        
	// 	return $consulta->execute();
    // }

    public function TerminarPedido()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE pedidoproducto 
            SET estado = 'listo para servir', fin =:fin
            where id = :id");
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        $consulta->bindValue(':fin',$this->fin,  PDO::PARAM_STR);
        
		return $consulta->execute();
    }


    public function Pagar()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta =$objetoAccesoDato->RetornarConsulta(
            "UPDATE pedidoproducto 
            SET estado = 'pagado'
            where id = :id");
        $consulta->bindValue(':id',$this->id,  PDO::PARAM_STR);
        
		return $consulta->execute();
    }
}





?>