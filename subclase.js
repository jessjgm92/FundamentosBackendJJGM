class Libro {
  constructor(titulo, autor) {
    this.titulo = titulo;
    this.autor = autor;
  }

  static async crearLibro() {
    const titulo = await this.pedirInput('Ingrese el título del libro:');
    const autor = await this.pedirInput('Ingrese el autor del libro:');
    return new Libro(titulo, autor);
  }

  static async leerLibros() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const libros = [
          new Libro('Cien años de soledad', 'Gabriel García Márquez', 'Realismo mágico'),
          new Libro('El principito', 'Antoine de Saint-Exupéry', 'Fábula'),
          new Libro('1984', 'George Orwell', 'Distopía')
        ];
        resolve(libros);
      }, 1000);
    });
  }

  async actualizar(nuevoTitulo, nuevoAutor) {
    this.titulo = nuevoTitulo;
    this.autor = nuevoAutor;
  }


  static async eliminarLibro(libro) {
    const confirmacion = await this.pedirConfirmacion(`¿Está seguro que desea eliminar ${libro.titulo}? (yes/no)`);
    if (confirmacion) {
      return null; 
    } else {
      return libro; 
    }
  }

  // Método estático para mostrar mensajes y obtener entrada del usuario
  static async pedirInput(mensaje) {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    return new Promise((resolve) => {
      readline.question(`${mensaje} `, (input) => {
        readline.close();
        resolve(input.trim());
      });
    });
  }

  // Método estático para pedir confirmación al usuario
  static async pedirConfirmacion(mensaje) {
    const respuesta = await this.pedirInput(mensaje);
    return respuesta.toLowerCase() === 'yes';
  }
}

module.exports = Libro;
