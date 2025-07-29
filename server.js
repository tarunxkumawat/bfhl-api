const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Defines the POST route at /bfhl [cite: 31, 30]
app.post('/bfhl', (req, res) => {
    try {
        // The API accepts an array in the request body [cite: 6]
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
            // Check if item is a number (handles string numbers like "334") [cite: 42]
            if (!isNaN(item) && !isNaN(parseFloat(item))) {
                const num = parseInt(item, 10);
                total_sum += num;
                // Separates numbers into odd and even arrays [cite: 11, 12]
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            // Check if item contains only alphabetic characters
            } else if (/^[a-zA-Z]+$/.test(item)) {
                // Converts alphabets to uppercase [cite: 13]
                alphabets.push(item.toUpperCase());
                alpha_str += item;
            } else {
                 // Separates special characters [cite: 14]
                special_characters.push(item);
            }
        });

        // Creates a reversed, alternately-cased string from alphabets [cite: 16]
        const reversed_alpha = alpha_str.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversed_alpha.length; i++) {
            concat_string += (i % 2 === 0) ? reversed_alpha[i].toUpperCase() : reversed_alpha[i].toLowerCase();
        }

        const response = {
            "is_success": true, // [cite: 27]
            "user_id": "john_doe_17091999", // [cite: 24]
            "email": "john@xyz.com", // [cite: 9]
            "roll_number":"ABCD123", // [cite: 10]
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": total_sum.toString(), // [cite: 15, 42]
            "concat_string": concat_string
        };

        // Returns a 200 status code for successful requests [cite: 32]
        return res.status(200).json(response);

    } catch (error) {
        // Gracefully handles exceptions [cite: 28]
        return res.status(500).json({ is_success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});