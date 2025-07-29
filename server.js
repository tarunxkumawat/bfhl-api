const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Input data must be an array." });
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let total_sum = 0;
        let alpha_str = "";

        data.forEach(item => {
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                total_sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alpha_str += item;
            } else {
                special_characters.push(item);
            }
        });

        const reversed_alpha = alpha_str.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversed_alpha.length; i++) {
            concat_string += (i % 2 === 0) ? reversed_alpha[i].toUpperCase() : reversed_alpha[i].toLowerCase();
        }

        const response = {
            "is_success": true,
            "user_id": "john_doe_17091999",
            "email": "john@xyz.com", 
            "roll_number":"ABCD123", 
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": total_sum.toString(),
            "concat_string": concat_string
        };

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({ is_success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
