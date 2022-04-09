import Noticia from "../models/noticia";
const noticiaCtrl = {};

noticiaCtrl.nuevaNoticia = async (req, res) => {
  try {
    const nuevaNoticia = new Noticia({
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      categoria: req.body.categoria,
      texto: req.body.texto,
      autor: req.body.autor,
      fecha: req.body.fecha,
      imagen: req.body.imagen,
      destacar: req.body.destacar,
    });

    nuevaNoticia.fecha = new Date();

    const noticiaExistente = await Noticia.find({titulo: req.body.titulo}).collation({locale: "es", strength: 2});
    if (noticiaExistente.length > 0) {
      res.status(500).send({
        mensaje: "Noticia ya existe",
      });
      return;
    }

    await nuevaNoticia.save();
    res.status(201).json({
      mensaje: "Noticia creada correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al agregar noticia",
    });
  }
};

noticiaCtrl.listarNoticias = async (req, res) => {
  try {
    const arregloNoticias = await Noticia.find();
    res.status(200).json(arregloNoticias);
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo obtener las noticias",
    });
    console.log(error);
  }
};

noticiaCtrl.eliminarNoticia = async (req, res) => {
  try {
    await Noticia.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "Se elimnino la noticia correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar la noticia",
    });
    console.log(error);
  }
};

noticiaCtrl.editarNoticia = async (req, res) => {
  try {
    const noticiaExistente = await Noticia.find({
        $and: [
          {_id:  { $ne: req.params.id } }
        ],
      }).collation({locale: "es", strength: 2});
    if (noticiaExistente.length === 0) {
      res.status(500).send({
        mensaje: "Noticia no existe",
      });
      return;
    }
    await Noticia.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "Se edito la noticia correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al editar la noticia",
    });
    console.log(error);
  }
};

noticiaCtrl.destacarNoticia = async (req, res) => {
  try {
    await Noticia.findByIdAndUpdate(req.params.id, {destacar: req.body.destacar});
    res.status(200).json({
      mensaje: "Se destaco la noticia correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al editar la noticia",
    });
    console.log(error);
  }
};

noticiaCtrl.obtenerNoticia = async (req, res) => {
  try {
    const noticiaBuscada = await Noticia.findById(req.params.id);
    res.status(200).json(noticiaBuscada);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la noticia",
    });
    console.log(error);
  }
};

noticiaCtrl.obtenerNoticiasPorNombreCategoria = async (req, res) => {
  try {
    const arregloNoticias = await Noticia.find({categoria: req.params.nombreCategoria}).collation({locale: "es", strength: 2});
    res.status(200).json(arregloNoticias);
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo obtener las noticias",
    });
    console.log(error);
  }
};

noticiaCtrl.buscarNoticiasPorTituloSubtitulo = async (req, res) => {
  try {
    const arregloNoticias = await Noticia.find({
      $or: [
        {'titulo': {'$regex': req.params.terminoBusqueda, '$options': 'i'}},
        {'subtitulo': {'$regex': req.params.terminoBusqueda, '$options': 'i'}},
      ],
    }).collation({locale: "es", strength: 2});
    res.status(200).json(arregloNoticias);
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo obtener las noticias",
    });
    console.log(error);
  }
};

export default noticiaCtrl;
