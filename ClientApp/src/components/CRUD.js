import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class CRUD extends Component {
    static displayName = CRUD.name;
    
    /* Orientado a Categories */

    ////////metodo para agregar una categoria, Ya es funcional
    static agregarC = async () => {
    //agregarC = async () => {
        //var categName = document.getElementById("categName").value;
        //var categDescrip = document.getElementById("categDescrip").value;
        //const { categName, categDescrip } = this.state;
        const categName = prompt('Nombre de la nueva categoria:', 'Nuevo Nombre');
        const categDescrip = prompt('Añade una pequeña descripción:', 'Descripción');
        //var contenido = document.getElementById("categoName").value;
        //alert(contenido);

        //const categName = categoName;
        //const categDescrip = categoDescrip;
        ////debugger;
        if (categName !== "" && categDescrip !== "" && categName !== null && categDescrip !== null) {
            if (categName !== "" && categDescrip !== "" && categName !== null && categDescrip !== null) {
                try {
                    const response = await fetch('category/Crear', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            categoryName: categName,
                            description: categDescrip
                        })
                    });
                    if (response.ok) {

                        this.populateCategoriesData();
                        // Actualiza el estado para reflejar la nueva categoría
                        //this.setState(prevState => ({
                        //    categories: [...prevState.categories,
                        //    { categoryName: categName, description: categDescrip }],
                        //    loading: false
                        //}));
                    } else {
                        alert("Error al mostrar la tabla actualizada");
                    }
                } catch (error) {
                    alert("Error al agregarla");
                }

            } else {
                alert("Error al ingresar categoría");
            }
        }
        
    };

    ////metodo para editar una categoria//Funcional
     editC = async (id) => {
        //const categId = prompt('Ingresa id:', '');
        const categId = id;
        if (categId !== "" && categId !== null) {
            try {
                const categName = prompt('Nombre de la categoria:', '');
                const categDescrip = prompt('Añade  descripción:', '');
                debugger;
                if (categName !== "" && categDescrip !== "" && categName !== null && categDescrip !== null) {
                    try {
                        //const response = await fetch('category/Edit/${categId}', {
                        const response = await fetch('category/Edit', {
                            //const response = await fetch(`category/Edit/${categId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                categoryId: categId,
                                categoryName: categName,
                                description: categDescrip
                            })
                        });
                        
                        if (response.ok) {
                            debugger;
                            //this.populateCategoriesData();
                            this.forceUpdate();
                            debugger;
                            //this.renderCategoriesTable();
                             //Actualiza el estado para reflejar la nueva categoría(la editada)
                            
                            //this.setState(prevState => ({
                            //    categories: [...prevState.categories,
                            //    { categoryName: categName, description: categDescrip }],
                            //    loading: false
                            //}));
                            
                        } else {
                            alert("Error al mostrar la tabla actualizada");
                        }
                    } catch (error) {
                        debugger 
                        alert("Error al editarla");
                    }

                } else {
                    alert("Error al editar categoría");
                }
            } catch (error) {
                alert("Error al editarla");
            }
        } else {
            alert("Error al ingresar ID");
        }
        
    };

    ////metodo para eliminar una categoria///Ya es funcional
    static eliminarC = async (id) => {
        const categId = id;
        //debugger;
        if (categId !== "" && categId !== null) {
            if (window.confirm("¿Eliminar categoria?")) {
                try {
                    const response = await fetch(`category/Catego/${categId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            categoryId: categId
                        })
                    });
                    console.log(response);
                    if (response.ok) {
                        this.populateCategoriesData();
                        //prevState o State
                        this.setState(prevState => ({
                            categories: prevState.categories.
                                filter(category => category.id !== categId),
                            loading: false
                        }));
                        //this.renderCategoriesTable();//
                        alert("¡Se elimino exitosamente!");
                    } else {
                        alert("Error al mostrar la tabla actualizada");
                    }
                } catch (error) {
                    alert("Error al eliminarla");
                }
            } else {
                alert("Eliminación de categoria CANCELADA");
            }
        } else {
            alert("Error al ingresar ID");
        }

    };

    static modal() {
        debugger;
        return (
            <div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Lanzar demo de modal
                </button>
                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Título del modal</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="button" className="btn btn-primary">Guardar cambios</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
           
        );
    }


    

    //Constructor
    constructor(props) {
        super(props);
        //Actualizacion de estado
        this.state = {
            categories: [], loading: true
            , modal: false
        };
        //this.state = {
        //    categories: [],
        //    loading: true,
        //    categName: "",
        //    categDescription: "",
        //    modal: false
        //};
      
        this.toggle = this.toggle.bind(this);
    }
    //handleNameChange = (event) => {
    //    this.setState({ categName: event.target.value });
    //};

    //handleDescriptionChange = (event) => {
    //    this.setState({ categDescription: event.target.value });
    //};


    
    componentDidMount() {
        this.populateCategoriesData();
    }
    //

    //metodo que muestra las categorias en una tablita
    static renderCategoriesTable(categories) {
        return (
            <div>
                {/*<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">*/}
                {/*    Lanzar demo de modal*/}
                {/*</button>*/}
                <button className="btn btn-dark btn-lg" onClick={this.agregarC}>Crear nueva</button>
                {/*<button className="btn btn-dark btn-lg" onClick={this.modal}>C na</button>*/}
                {/*<Button color="danger" onClick={this.toggle}>N</Button>*/}
                {/*<a href="#">Ir home</a>*/}
            <table className='table table-striped' aria-labelledby="tabelLabel">
                {/* Presentamos los datitos */}
                <thead>
                    <tr>
                        <th>CategoryID</th>
                        <th>CategoryName</th>
                        <th>Description</th>
                    </tr>
                </thead>
                    <tbody>
                        {
                        categories.map(category =>
                        <tr key={category.categoryId}>
                            <td>{category.categoryId}</td>
                            <td>{category.categoryName}</td>
                            <td>{category.description}</td>
                                <td>
                                <button className="btn btn-dark" onClick={() => this.editC(category.categoryId)}>Editar</button>
                                <button className="btn btn-secondary" onClick={() => this.eliminarC(category.categoryId)}>Eliminar</button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
                
            </div>
        );
    }

 
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        //
        //Aqui se carga la tabla definida arriba,aparece un letrero en lo que se carga(estado de cargando)
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CRUD.renderCategoriesTable(this.state.categories);

        //Retorna texto(nuestra presentación)
        return (
            <div>
                <Button color="btn btn-dark btn-lg" onClick={this.toggle}>{this.props.buttonLabel}Crear Nueva</Button>

                <h1 id="tabelLabel">Crea, Lee, Actualiza y Elimina!</h1>
                <p>Bienvenido, aquí podrás hacer uso de un CRUD, con una pequeña base de datos</p>
                {contents}

                
                
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Crear nueva categoria</ModalHeader>
                    <ModalBody>
                        <label>Nombre de la categoria: </label>
                        <input type="text" className="" id="categName"></input>
                        <label>Añade una pequeña descripcion: </label>
                        <input type="text" className="" id="categDescrip"></input>
                    </ModalBody>
                    <ModalFooter>
                      {/*<Button color="primary" onClick={this.toggle}>Agregar</Button>*/}
                        <Button color="primary" onClick={() => this.agregarC()}>Agregar</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                    
                </Modal>
                

                
            </div>
             
        );
        //
    }
    
    async  populateCategoriesData() {
        //debugger;
        const response = await fetch('category');
        const data = await response.json();
        this.setState({ categories: data, loading: false });
    }



}


