import Dish from "../../../model/Dish";
import connectDb from "../../../middleware/mongoose";
import { knapsack } from "../../../util/logic";

const handler = async (req, res) => {

    if (req.method == 'GET') {

        const budgetParam = req.query.budget;
        

        try {

            let budget =  parseInt(budgetParam) + 1;
            
            let dishes = await Dish.find({price: {$lt: budget}});

            let data = await knapsack(budget-1, dishes)

            // console.log(typeof(dishes))
            // console.log(dishes.length)

            return res.status(200).json(data);
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Some Internal error occured"});
        }
    } else {
        return res.status(405).json({ message: "This method is not allowed" });
    }

}

export default connectDb(handler);