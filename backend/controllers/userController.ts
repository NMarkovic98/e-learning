import { Request, Response } from "express";

exports.getAllUsers = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      results: "results number",
      data: {
        users: "list of users",
      },
    });
  } catch (error) {
    res.status(404).json({ staus: "failed", message: error });
  }
};

exports.getUser = async (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};

exports.createUser = async (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};

exports.updateUser = async (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};

exports.deleteUser = async (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "This rout is not yet defined",
  });
};
