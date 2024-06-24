import { Request, Response, NextFunction } from 'express';
import ClientService from '../services/ClientService';

class ClientController {

  private clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  getAllClients = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clients = await this.clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      next(error);
    }
  }

  getClientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await this.clientService.getClientById(req.params.id);
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }

  createClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await this.clientService.createClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  }

  updateClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const client = await this.clientService.updateClient(req.params.id, req.body);
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }

  deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.clientService.deleteClient(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ClientController();
