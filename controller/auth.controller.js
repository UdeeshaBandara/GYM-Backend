exports.welcome = (req, res) => {
    try {

        res.status(200).send({"message": "Gym backend up and running!!!"});
    } catch (err) {
        res.status(200).send({status: false, errors: err});
    }
};
