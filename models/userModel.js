

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await connexion.query('SELECT * FROM users');
        res.status(200).send(allUsers);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
