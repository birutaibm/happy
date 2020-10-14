import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'

import Orphanage from '../models/Orphanage';
import orphanagesView from '../views/orphanagesView';

export default {
  async index(request: Request, response: Response) {
    const repository = getRepository(Orphanage);
    const orphanages = await repository.find({
      relations: ['images']
    });
    return response.json(orphanagesView.render(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const repository = getRepository(Orphanage);
    const orphanage = await repository.findOneOrFail(id, {
      relations: ['images']
    });
    return response.json(orphanagesView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends,
      opening_hours,
    } = request.body;
    const files = request.files as Express.Multer.File[];
    const images = files.map(image => ({ path: image.filename }))

    const repository = getRepository(Orphanage);
    const orphanageData = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      open_on_weekends: open_on_weekends === 'true' || open_on_weekends === true,
      opening_hours,
      images,
    };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      opening_hours: Yup.string().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required(),
      })),
    });
    await schema.validate(orphanageData, {
      abortEarly: false,
    });
    const orphanage = repository.create(orphanageData);
    await repository.save(orphanage);
    return response.status(201).json(orphanage);
  }
}