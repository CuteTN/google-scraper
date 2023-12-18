import { Router } from "express";

export interface IController {
  createRouter: () => Router
}