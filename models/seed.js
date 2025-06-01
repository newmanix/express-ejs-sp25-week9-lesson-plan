// seed.js
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const Category = require('./models/Category');

// Default categories
const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Salad', 'Side Dish'];

// Default recipes
const recipes = [
  {
    name: 'Green Eggs and Ham',
    author: 'Dr. Seuss',
    description: 'A classic dish from a classic book',
    ingredients: 'Eggs, Ham, Food coloring',
    instructions: 'Cook the eggs and ham. Add green food coloring for fun!',
    rating: 5.0,
    category_name: 'Breakfast'
  },
  {
    name: 'Spaghetti Ice Cream',
    author: 'Chef Playful',
    description: 'Sweet and cold spaghetti-inspired ice cream',
    ingredients: 'Vanilla ice cream, Strawberry sauce, White chocolate shavings, Gummy worms',
    instructions: 'Scoop vanilla ice cream, drizzle with strawberry sauce, sprinkle with white chocolate shavings, and top with gummy worms.',
    rating: 4.5,
    category_name: 'Dessert'
  },
  {
    name: 'Invisible Sandwich',
    author: 'The Vanishing Chef',
    description: "A sandwich that's so good, it's almost invisible",
    ingredients: 'Two slices of imaginary bread, secret sauce, mystery meat, lettuce pray',
    instructions: 'Assemble the sandwich with the imaginary ingredients.',
    rating: 4.2,
    category_name: 'Lunch'
  },
  {
    name: 'Banana Dolphin',
    author: 'Fruit Artist',
    description: 'Turn a banana into a fun and edible dolphin',
    ingredients: 'Banana, Chocolate chips, Blueberries',
    instructions: 'Peel the banana, add chocolate chips for eyes, and blueberries for water splashes.',
    rating: 4.8,
    category_name: 'Dessert'
  },
  {
    name: 'Pancake Art',
    author: 'Creative Cook',
    description: 'Create your own pancake masterpiece',
    ingredients: 'Pancake batter, Food coloring, Toppings like syrup, Whipped cream, Sprinkles',
    instructions: 'Pour pancake batter into creative shapes, add food coloring, and decorate with toppings.',
    rating: 4.6,
    category_name: 'Breakfast'
  },
  {
    name: 'Rainbow Grilled Cheese',
    author: 'Colorful Chef',
    description: 'Add a burst of color to your grilled cheese sandwich',
    ingredients: 'Bread, Various colors of food coloring, Favorite cheese',
    instructions: 'Dye the bread with different colors, assemble the sandwich, and grill until the cheese melts.',
    rating: 4.4,
    category_name: 'Lunch'
  },
  {
    name: 'Bubblegum Soup',
    author: 'Bazooka Joe',
    description: "A soup that's as fun to chew as it is to eat",
    ingredients: 'Chicken broth, Vegetables, Surprise bubblegum treat',
    instructions: 'Prepare chicken broth with vegetables and surprise your guests with a hidden bubblegum treat in each bowl.',
    rating: 4.7,
    category_name: 'Dinner'
  }
];

async function seed() {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/funnyrecipes';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`✅ Connected to MongoDB at ${mongoURI}`);

    await Category.deleteMany({});
    await Recipe.deleteMany({});
    console.log('🧹 Cleared existing data');

    const categoryDocs = await Category.insertMany(categories.map(name => ({ name })));
    console.log('📂 Inserted categories');

    const categoryMap = {};
    categoryDocs.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    const recipeDocs = recipes.map(recipe => ({
      ...recipe,
      category: categoryMap[recipe.category_name]
    }));

    await Recipe.insertMany(recipeDocs);
    console.log('🍽️ Inserted recipes');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  }
}

seed();
