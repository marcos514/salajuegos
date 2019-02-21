import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


const CONFIG={headers:new HttpHeaders({token:localStorage.getItem("Token")})};
@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http:HttpClient) { }
  public LogIn(usuario,clave)
  {
    return this.http.post("../../assets/Api_Juegos/usuario/login",{nombre:usuario, clave: clave});
  }

  //Mesa api
  public MesaAlta(id,cliente)
  {
    return this.http.post("../../assets/Api_Juegos/mesa/alta",{id:id, cliente: cliente},CONFIG);
  }
  public MesasLibres()
  {
    return this.http.get("../../assets/Api_Juegos/mesa/libres",CONFIG);
  }
  public MesasTodas()
  {
    return this.http.get("../../assets/Api_Juegos/mesa/todas",CONFIG);
  }
  public MesaClave(mesa)
  {
    return this.http.post("../../assets/Api_Juegos/mesa/clave",{id:mesa},CONFIG);
  }
  public MesaCerrar(mesa)
  {
    return this.http.post("../../assets/Api_Juegos/mesa/cerrar",{id:mesa},CONFIG);
  }
  public MesaEsperar(mesa)
  {
    return this.http.post("../../assets/Api_Juegos/mesa/esperarPedido",{id:mesa},CONFIG);
  }
  public MesaComiendo(mesa)
  {
    return this.http.post("../../assets/Api_Juegos/mesa/clienteComiendo",{id:mesa},CONFIG);
  }
  public MesaPagando(mesa)
  {
    return this.http.post("../../assets/Api_Juegos/mesa/clientePagando",{id:mesa},CONFIG);
  }

//PRODUCTOS API
  public ProductoTodas()
  {
    return this.http.get("../../assets/Api_Juegos/productos/traerTodos",CONFIG);
  }
  //capaz que anulo estos 2 (BUSCAR POR LA TABLA)
  public ProductoId(id)
  {
    return this.http.post("../../assets/Api_Juegos/productos/traer/id",{id:id},CONFIG);
  }
  public ProductoNombre(nombre)
  {
    return this.http.post("../../assets/Api_Juegos/productos/traer/nombre",{descripcion:nombre},CONFIG);
  }


  //pedido
  public PedidoAlta(mesa,productos)
  {
    console.log(productos);
    console.log(mesa);
    return this.http.post("../../assets/Api_Juegos/pedido/alta",{mesa:mesa, productos: productos},CONFIG);
  }
  public PedidoLibres()
  {
    console.log(CONFIG);
    return this.http.post("../../assets/Api_Juegos/pedido/tomar/sector/libres",{},CONFIG);
  }
  public PedidoAceptados()
  {
    return this.http.post("../../assets/Api_Juegos/pedido/tomar/aceptados", {} ,CONFIG);
  }
  public PedidoAceptar(finEsperado,pedidos)
  {
    return this.http.post("../../assets/Api_Juegos/pedido/aceptar",{pedidos:pedidos,finEsperado:finEsperado},CONFIG);
  }
  public PedidoPagar(pedidos)
  {
    return this.http.post("../../assets/Api_Juegos/pedido/pagar",{pedidos:pedidos},CONFIG);
  }
  public PedidoTerminar(pedidos)
  {
    return this.http.post("../../assets/Api_Juegos/pedido/terminar",{pedidos:pedidos},CONFIG);
  }
  public PedidoMios()
  {
    console.log(CONFIG);
    //MOZO
    return this.http.get("../../assets/Api_Juegos/pedido/mios",CONFIG);
  }
  public PedidoCliente(mesa,pedido)
  {
    return this.http.post("../../assets/Api_Juegos/pedido/cliente",{mesa:mesa,pedido:pedido},CONFIG);
  }


  public Factura(mesa)
  {
    return this.http.post("../../assets/Api_Juegos/factura/generar",{mesa:mesa},CONFIG);
  }
  public Encuesta(mesa,mozo, restaurant,cocinero,comentario, idMesa, idMozo)
  {
    return this.http.post("../../assets/Api_Juegos/encuesta/generar",{mesa:mesa,mozo:mozo, restaurant:restaurant,cocinero:cocinero,comentario:comentario, idMesa:idMesa, idMozo:idMozo},CONFIG);
  }

  public SignUp(nombre:string,apellido:string,email:string,pass:string)
  {
    let datos= "{'mail':'"+email+"','clave':'"+pass+"','nombre':'"+nombre+"','apellido':'"+apellido+"'}";
    return this.http.post("../../assets/Api_Juegos/usuario/signup",{mail:email, clave: pass, nombre: nombre, apellido: apellido});
  }

  public AgregarPuntuacion(juego:string, puntuacion:string)
  {

    return this.http.post("../../assets/Api_Juegos/puntuacion",{juego:juego,puntuacion:puntuacion},CONFIG);
  }

  public TomarPuntuacion()
  {
    return this.http.get("../../assets/Api_Juegos/puntuacion",CONFIG);
  }
}
