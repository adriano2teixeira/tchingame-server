import { Request, Response } from "express";
import Woocommerce from "../utils/woocommerce";
import { PrismaClient } from "@prisma/client";
import { json } from "body-parser";
import { WooOrder } from "../utils/WooOrder";

const prisma = new PrismaClient();

interface iUser {
  user_firebase: string;
  fullname: string;
  photo_url: string;
  password: string;
  email: string;
}

class UserController {
  async index(request: Request, response: Response) {
    try {
      const data = await prisma.user.findMany();
      return response.json(data);
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const data = request.body;
      const createdUser = await prisma.user.create({ data });
      return response.json(createdUser);
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async findOne(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await prisma.user.findUnique({
        where: { user_firebase: id },
      });

      if (!user) {
        return response.status(404).json({ error: "user not found " });
      }
      return response.json(user);
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async updateOne(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const data = request.body;
      const user = await prisma.user.update({
        where: { id: Number(id) },
        data,
      });

      return response.json(user);
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async vouchers(request: Request, response: Response) {
    try {
    
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }
}

export default new UserController();
