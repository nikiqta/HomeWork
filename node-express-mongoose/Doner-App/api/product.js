const Doner = require('mongoose').model('Doner');

const allowedToppings = [
    'pickle',
    'tomato',
    'onion',
    'lettuce',
    'hot sauce',
    'extra sauce'
];

const categoryLabels = {
    'chicken': 'Chicken doner',
    'beef': 'Beef doner',
    'lamb': 'Lamb doner'
};

function getName(category, size){
    return `${categoryLabels[category]}, ${size}cm`
}

async function create(data) {
    const {
        category,
        size,
        imageUrl,
    } = data;

    const toppings = data.toppings
        .split(',')
        .map(e => e.trim())
        .filter(e => e.length > 0 && allowedToppings.includes(e));

    try {

    } catch (err) {

    }

   return await Doner.create({
        category,
        imageUrl,
        size: Number(size),
        toppings
    });
}

async function getAll() {
    const doners = await Doner.find({});
    const chicken = doners.filter(p => p.category === 'chicken');
    const beef = doners.filter(p => p.category === 'beef');
    const lamb = doners.filter(p => p.category === 'lamb');
    return {
        chicken,
        beef,
        lamb
    }
}

async function getById(id) {
   const doner = await Doner.find({_id: id});
   if (!doner) {
       throw new Error(`Product not found: ${id}`);
   }
   doner[0].productName = getName(doner[0].category, doner[0].size);
   return doner;
}

module.exports = {
    create,
    getAll,
    getById,
    getName
};