const Libro = require('./subclase');

class clasePrincipal {
  constructor() {
    this.libros = [];
  }

  async iniciar() {
    let opcion;
    do {
      opcion = await this.mostrarMenu();
      await this.procesarOpcion(opcion);
    } while (opcion !== '5');
  }

  async mostrarMenu() {
    console.log(`
      Menú de opciones:
      1. Crear libro
      2. Leer libros
      3. Actualizar libro
      4. Eliminar libro
      5. Salir
    `);
    return await Libro.pedirInput('Seleccione una opción:');
  }

  async procesarOpcion(opcion) {
    switch (opcion) {
      case '1':
        const nuevoLibro = await Libro.crearLibro();
        this.libros.push(nuevoLibro);
        console.log('Libro creado:', nuevoLibro);
        break;
      case '2':
        const listaLibros = await Libro.leerLibros();
        console.log('Lista de libros:');
        listaLibros.forEach(libro => console.log(libro));
        break;
      case '3':
        if (this.libros.length === 0) {
          console.log('No hay libros para actualizar.');
          break;
        }
        const libroActualizar = await this.seleccionarLibro();
        if (libroActualizar) {
          const nuevoTitulo = await Libro.pedirInput(`Ingrese el nuevo título para ${libroActualizar.titulo}:`);
          const nuevoAutor = await Libro.pedirInput(`Ingrese el nuevo autor para ${libroActualizar.titulo}:`);
          const nuevoGenero = await Libro.pedirInput(`Ingrese el nuevo género para ${libroActualizar.titulo}:`);
          await libroActualizar.actualizar(nuevoTitulo, nuevoAutor, nuevoGenero);
          console.log('Libro actualizado:', libroActualizar);
        }
        break;
      case '4':
        if (this.libros.length === 0) {
          console.log('No hay libros para eliminar.');
          break;
        }
        const libroEliminar = await this.seleccionarLibro();
        if (libroEliminar) {
          const resultado = await Libro.eliminarLibro(libroEliminar);
          if (resultado === null) {
            this.libros = this.libros.filter(libro => libro !== libroEliminar);
            console.log('Libro eliminado correctamente.');
          } else {
            console.log('No se eliminó el libro.');
          }
        }
        break;
      case '5':
        console.log('Saliendo del programa.');
        break;
      default:
        console.log('Opción no válida.');
    }
  }

  async seleccionarLibro() {
    console.log('Lista de libros:');
    this.libros.forEach((libro, index) => {
      console.log(`${index + 1}. ${libro.titulo}`);
    });
    const indice = await Libro.pedirInput('Ingrese el índice del libro que desea seleccionar:');
    const index = parseInt(indice) - 1;
    if (index >= 0 && index < this.libros.length) {
      return this.libros[index];
    } else {
      console.log('Índice inválido.');
      return null;
    }
  }
}

// Instanciar y ejecutar el gestor de libros
const gestor = new clasePrincipal();
gestor.iniciar();
