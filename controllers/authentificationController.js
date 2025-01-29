import { login, register } from "../models/authentificationModel.js";

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, role_id, email, password } = req.body;
        await register(first_name, last_name, role_id, email, password);

        res.status(200).json("Utilisateur crée avec succès !");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        await login(email, password);
        res.status(200).json({ message: "Vous êtes bien connécté -> Clé JWT soon !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

