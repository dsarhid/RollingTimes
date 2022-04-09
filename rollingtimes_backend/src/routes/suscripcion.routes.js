import { Router } from "express";
import suscripcionCtrl from "../controllers/suscripcion.controllers";

const router = Router();

router
  .route("/")
  .get(suscripcionCtrl.listarSuscripcion)
  .post(suscripcionCtrl.nuevaSuscripcion);

router.route('/:id').delete(suscripcionCtrl.eliminarSuscripcion)

export default router;
