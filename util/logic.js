
export const knapsack = async (budget, dishes) => {
    
    var mat = new Array(dishes.length + 1);

    for (let i = 0; i <= dishes.length; i++) {
        mat[i] = new Array(budget + 1);
    }

    for (let i = 0; i <= dishes.length; i++) {
        for (var j = 0; j <= budget; j++) {
            mat[i][j] = 0;
        }
    }
    

    for (let i = 1; i <= dishes.length; i++) {
        
        let dish = dishes[i-1];

        for (let j = 1; j <= budget; j++) {

            let price = dish.price;
            let value = dish.score;

            // Previous cost
            let withoutDish = mat[i-1][j];

            if (price<=j) {
                let withDish = value + mat[i-1][j-price];
                if(withDish > withoutDish) {
                    mat[i][j] = withDish;
                } else {
                    mat[i][j] = withoutDish;
                }
            } else {
                mat[i][j] = withoutDish;
            }

        }
        
    }

    let ans = [];

    let i = dishes.length;
    let k = budget;

    while(i>0 && k>0) {
        let curr = mat[i][k];
        // top element
        if(mat[i-1][k] != curr) {
            let dish = dishes[i-1];

            let obj = {
                id: dish._id,
                name: dish.name,
                price: dish.price,
                score: dish.score
            }
            ans.push(obj);
            let prevDish = dishes[i-1]
            i--;
            k = k - prevDish.price;
        } else {
            i--;
        }
    }

    return ans;

}