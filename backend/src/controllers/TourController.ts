import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import TourService from '../services/TourService';
import upload from '../utils/ImageUpload';

class TourController {

  private tourService: TourService;

  constructor() {
    this.tourService = new TourService();
  }

  getAllTours = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tours = await this.tourService.getAllTours();
      res.json(tours);
    } catch (error) {
      next(error);
    }
  }

  getTourById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tour = await this.tourService.getTourById(req.params.id);
      res.json(tour);
    } catch (error) {
      next(error);
    }
  }

  // createTour = async (req: Request, res: Response, next: NextFunction) => {
  //   upload(req, res, async (err) => {
  //     if (err) {
  //       return next(createError(400, err.message));
  //     }

  //     try {
  //       const imagePaths = (req.files as Express.Multer.File[]).map(file => file.path);
  //       const newTour = await this.tourService.createTour(req.body, imagePaths);
  //       res.status(201).json(newTour);
  //     } catch (error) {
  //       next(error);
  //     }
  //   });
  // }

  
 createTour = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body)
  upload(req, res, async (err) => {
    if (err) {
      return next(createError(400, err.message));
    }

    // Check if req.files is defined and contains files
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return next(createError(400, 'No files uploaded'));
    }

    try {
      const imagePaths = (req.files as Express.Multer.File[]).map(file => file.path);
      const newTour = await this.tourService.createTour(req.body, imagePaths);
      res.status(201).json(newTour);
    } catch (error) {
      console.error('Error creating tour:', error);
      next(createError(500, 'Failed to create tour'));
    }
  });
}

  updateTour = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    upload(req, res, async (err) => {
      if (err) {
        return next(createError(400, err.message));
      }

      try {
        const imagePaths = (req.files as Express.Multer.File[]).map(file => file.path);
        const updatedTour = await this.tourService.updateTour(req.params.id, req.body, imagePaths);
        res.json(updatedTour);
      } catch (error) {
        next(error);
      }
    });
  }

  deleteTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.tourService.deleteTour(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  getTourByCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tours = await this.tourService.getTourByCategoryId(req.params.id);
      res.json(tours);
    } catch (error) {
      next(error);
    }
  }

  searchTours = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tours = await this.tourService.searchTours(req.query.q as string);
      res.json(tours);
    } catch (error) {
      next(error);
    }
  }
}

export default new TourController();
