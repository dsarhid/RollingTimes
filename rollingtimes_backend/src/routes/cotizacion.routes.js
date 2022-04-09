import { Router } from "express";
import cotizacionCtrl from "../controllers/cotizacion.controllers";

const router = Router();

router
  .route("/dolar")
  .get(cotizacionCtrl.precioDolar);
  
router
.route("/euro")
.get(cotizacionCtrl.precioEuro);

router
  .route("/real")
  .get(cotizacionCtrl.precioReal);

export default router;
