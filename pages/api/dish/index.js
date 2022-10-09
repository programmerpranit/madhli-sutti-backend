import Dish from "../../../model/Dish";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {

    if (req.method == 'GET') {

        try {
            let dishes = await Dish.find({});
            return res.status(200).json({message: "Dish Fetched", dishes});
        } catch (error) {
            return res.status(500).json({message: "Some Internal error occured"});
        }

    } else if (req.method == 'POST') {

        const { name, price, score } = req.body

        try {
            let dish = await Dish.create({name, price, score});
            return res.status(201).json({message: "Dish Created Successfully", dish});   
        } catch (error) {
            return res.status(500).json({message: "Some Internal error occured"});
        }

    } else if (req.method == 'PUT') {

        const { name, price, score, id } = req.body

        try {
            let dish = await Dish.findByIdAndUpdate(id, {name, price, score});
            return res.status(201).json({message: "Dish Updated Successfully", dish});   
        } catch (error) {
            return res.status(500).json({message: "Some Internal error occured"});
        }

    } else if (req.method == 'DELETE') {

        const { id } = req.body

        try {
            await Dish.findByIdAndDelete(id);
            return res.status(200).json({message: "Dish Deleted Successfully"});   
        } catch (error) {
            return res.status(500).json({message: "Some Internal error occured"});
        }

    } else {
        return res.status(405).json({ message: "This method is not allowed" });
    }

}

export default connectDb(handler);