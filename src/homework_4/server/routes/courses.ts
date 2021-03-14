import express from 'express';
 
const privateRoute = express.Router();

privateRoute.get('/courses', (req, res) => {
    return res.status(200).send({ status: 'SUCCESS' });
});

export default privateRoute;