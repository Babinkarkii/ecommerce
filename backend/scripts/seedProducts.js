require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
console.log('ENV:', process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);
const db = require('../config/db');

const companies = ['Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance', 'ASICS', 'Converse'];
const colors = ['red', 'blue', 'green', 'black', 'white', 'yellow', 'gray'];
const sizes = ['6', '7', '8', '9', '10', '11', '12'];
const categories = [
  { value: 'men', label: "Men's" },
  { value: 'women', label: "Women's" },
  { value: 'kids', label: "Kids" },
];
const images = [
  'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517263904808-5dc0d6d3fa5c?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519748771451-a94c596fad67?q=80&w=1974&auto=format&fit=crop',
];

function getRandom(arr, n = 1) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

const products = [];
let id = 1;
for (let i = 0; i < 100; i++) {
  let catIdx = i < 34 ? 0 : i < 67 ? 1 : 2;
  let category = categories[catIdx].value;
  let name = `${categories[catIdx].label} Shoe ${i + 1}`;
  let company = getRandom(companies);
  let price = Math.floor(Math.random() * 150) + 50; // 50-200
  let description = `High quality ${category} shoe, perfect for all occasions. Model #${i + 1}`;
  let colorArr = getRandom(colors, Math.floor(Math.random() * 3) + 1);
  let sizeArr = getRandom(sizes, Math.floor(Math.random() * 3) + 1);
  let colorList = colorArr.join(',');
  let sizeList = sizeArr.join(',');
  let quantity = Math.floor(Math.random() * 20) + 5;
  let image = getRandom(images);
  products.push([
    name,
    price,
    description,
    category,
    company,
    colorList,
    sizeList,
    quantity,
    image
  ]);
}

const sql = `INSERT INTO products (name, price, description, category, company, colors, sizes, quantity, image) VALUES ?`;
db.query(sql, [products], (err, result) => {
  if (err) {
    console.error('Error inserting products:', err);
  } else {
    console.log(`Inserted ${result.affectedRows} products!`);
  }
  db.end();
}); 