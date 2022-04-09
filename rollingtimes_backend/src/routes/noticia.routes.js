import { Router } from "express";
import noticiaCtrl from "../controllers/noticia.controllers";

const router = Router();

router
  .route("/")
  .get(noticiaCtrl.listarNoticias)
  .post(noticiaCtrl.nuevaNoticia);

router
  .route("/:id")
  .delete(noticiaCtrl.eliminarNoticia)
  .put(noticiaCtrl.editarNoticia)
  .get(noticiaCtrl.obtenerNoticia);

  router
    .route("/destacar/:id")
    .put(noticiaCtrl.destacarNoticia);

  router
  .route("/categoria/:nombreCategoria")
  .get(noticiaCtrl.obtenerNoticiasPorNombreCategoria);

  router
  .route("/buscar/:terminoBusqueda")
  .get(noticiaCtrl.buscarNoticiasPorTituloSubtitulo);

export default router;
