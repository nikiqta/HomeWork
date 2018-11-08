const fs = require('fs');
const file = fs.createWriteStream('./file.txt');

for (let i = 0; i <= 1e4 ; i++) {
    file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad culpa dignissimos distinctio dolorum earum eos esse fugiat ipsum, laboriosam magnam modi nam nostrum omnis perferendis quia quisquam. Aliquam,nesciunt!');
}

file.end();