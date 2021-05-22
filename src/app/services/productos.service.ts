import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 

    this.cargarProductos();

  }


  private cargarProductos(){

    return new Promise((resolve, reject) => {
      
    this.http.get('https://angular-udemy-65350-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp: any) => {
      console.log(resp);
      this.productos = resp;
      this.cargando = false;
      resolve(resolve);
/*    
      setTimeout(() => {

      }, 2000);
*/
    });

    })
  }

  getProducto (id: string){

    return this.http.get(`https://angular-udemy-65350-default-rtdb.firebaseio.com/productos/${id}.json`);

  }

  buscarProducto( termino: string){

    if(this.productos.length === 0){
      //cargar producto
      this.cargarProductos().then( ()=>{
        //ejecutar después de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      })
    }else {
      //aplicar filtro
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string){

    console.log(this.productosFiltrado);

    this.productosFiltrado = [];
    this.productos.forEach(producto => {

      if( producto.categoria!.toLowerCase().indexOf(termino.toLowerCase()) >=0 || producto.titulo!.toLowerCase().indexOf(termino.toLowerCase())>=0){
        this.productosFiltrado.push(producto);
      }
    })
  }

}
