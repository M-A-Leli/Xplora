import { Router } from 'express';
import ClientController from '../controllers/ClientController';

const router = Router();

router.get('/', ClientController.getAllClients); // Get all clients
router.get('/:id', ClientController.getClientById); // Get client by id
router.post('/', ClientController.createClient); // Create client
router.put('/:id', ClientController.updateClient); // Update client
router.delete('/:id', ClientController.deleteClient); // Delete client

export default router;
