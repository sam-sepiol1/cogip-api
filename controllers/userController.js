import { getAllUsers, getUserById, updateUser, deleteUser } from '../models/userModel.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        if (!users) {
            res.status(500).send('No users found.');
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, role_id, email, password } = req.body;
        await updateUser(id, first_name, last_name, role_id, email, password);
        res.status(200).json({ message: "Utilisateur mis à jour" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
