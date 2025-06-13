import { Router } from 'express';
import * as reportCtrl from '../controllers/report-controller';

const router = Router();
router.get('/class/:id', reportCtrl.classReport);
router.get('/student/:id', reportCtrl.studentReport);
export default router;