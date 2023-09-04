using AccesoDatos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modelo;
using System.Net;

namespace ASP.NET_Core_con_React.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {

        [HttpGet]
        public IEnumerable<Category> Get()
        {
            var categories = new CategoryDAO().obtenerTodas();
            return categories;
            //return _categoryD.obtenerTodas();
        }

        //////Nos permite usar el dao,traemos el metodo:int agregar(Category categoria)
        ////agregar,crear nueva
        //Ya es funcional
        [HttpPost]
        [Route("Crear")]
        public IActionResult Crear(Category categoriaNueva)
        {
            var categoriaN = new CategoryDAO();
            if (categoriaNueva != null)
            {
                categoriaN.agregar(categoriaNueva);
                return CreatedAtAction(nameof(Crear), new { id = categoriaNueva.CategoryId }, categoriaNueva);
            }
            else
            {
                //throw new HttpResponseException(HttpStatusCode.NotFound);
                throw new Exception("HttpStatusCode.NotFound");
            }
        }
        //Nos permite usar el dao,traemos el metodo:bool editar(Category categoria)
        ////editar,actualizar
        [HttpPut]
        [Route("Edit")]
        public IActionResult Edit( Category categoria)
        {
            var categoriaAct = new CategoryDAO();
            //var categoriaExistente = categoriaAct.obtenerUna(id);
            /*if (id != categoria.CategoryId) {
                return BadRequest();
            }*/
            if (categoriaAct.editar(categoria)== false)
            {
                return NotFound();
            }
            return NoContent();
        }



        //Nos permite usar el dao,traemos el metodo:bool eliminar(int id)
        //eliminar
        //Es funcional
        [HttpDelete]
        [Route("Catego/{id}")]
        public ActionResult DeleteCatego(int id)
        {
            var categoriaDel = new CategoryDAO();
            Category item = categoriaDel.obtenerUna(id);
            if (item != null)
            {
                categoriaDel.eliminar(id);
                return Ok("Categoría eliminada exitosamente");
            }
            else 
            { 
                //throw new HttpResponseException(HttpStatusCode.NotFound);
                //throw new Exception("HttpStatusCode.NotFound");
                return BadRequest();

            }
        }


    }
}
