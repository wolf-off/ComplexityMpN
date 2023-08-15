
function twoPointer(a, b) {
    let i = 0;
    let j = 0;
    while (i < a.length && j < b.length) {
        if (a[i] == b[j]) return a[i];
        if (a[i] < b[j]) i++
        else j++;
    }
    return null;
}

function binary(a, b) {
    for (let i = 0; i < a.length; i++) {
        let left = 0;
        let right = b.length - 1;
        while (left <= right) {
            middle = Math.floor((left + right) / 2);
            if (b[middle] == a[i]) return a[i];
            if (b[middle] < a[i]) left = middle + 1;
            else right = middle - 1;
        }
    }
}


function splite(a, b, a_start, a_finish, b_s, b_f) {
    let b_start = b_s;
    let b_finish = b_f;
    if (a_start > a_finish) return null;
    if (b_start >= b_finish) return null;
    let a_middle = Math.floor((a_start + a_finish) / 2);
    let target = a[a_middle];
    while (b_finish > b_start) {
        b_middle = Math.floor((b_start + b_finish) / 2);
        if (b[b_middle] == target) return target;
        if (b[b_middle] > target) b_finish = b_middle;
        else b_start = b_middle + 1;
    }
    let left_result = splite(a, b, a_start, a_middle - 1, b_s, b_middle);
    if (left_result !== null) return left_result;
    return splite(a, b, a_middle + 1, a_finish, b_middle, b_f);
}

function exponential(a, b) {
    let j = 0;
    let left;
    let right;
    let step;
    for (let i = 0; i < a.length; i++) {
        step = 1;
        left = j;
        while (left + step < b.length && b[left + step] <= a[i]) {
            left = left + step;
            step = step * 2;
        }
        right = Math.min(left + step, b.length);
        // console.log("left=" + left + "  right=" + right + "  a[i]==" + a[i]);
        while (left < right) {
            middle = Math.floor((left + right) / 2);
            if (b[middle] < a[i]) left = middle + 1;
            else right = middle;
        }
        if (b[left] == a[i]) return a[i];
        j = left;
    }
    return null;
}

let n = 100000000;
let m = 1;
let count = 20;

let b = [];

// for (let i = 0; i < n; i++) {
//     b.push(i * 2 + 2);
// }
// for (let i = 0; i < 8; i++) {
//     m = m * 10;

//     let a = [];
//     for (let i = 0; i < m; i++) {
//         a.push(i * 2 * n / m + 1);
//     }

for (let i = 0; i < n; i++) {
    b.push(Math.floor(i / 1000) * 2000 + i % 1000);
}
for (let i = 0; i < 8; i++) {
    m = m * 10;

    let a = [];
    for (let i = 0; i < m; i++) {
        a.push(Math.floor(i * n / m / 1000) * 2000 + 1000 + i % 1000);
    }


    console.log("Run M = " + m);

    const start = Date.now();
    for (let c = 0; c < count; c++) {
        splite(a, b, 0, a.length - 1, 0, b.length);
    }
    const end = Date.now();
    for (let c = 0; c < count; c++) {
        exponential(a, b)
    }
    const end2 = Date.now();
    for (let c = 0; c < count; c++) {
        twoPointer(a, b)
    }
    const end3 = Date.now();
    for (let c = 0; c < count; c++) {
        binary(a, b)
    }
    const end4 = Date.now();
    console.log(`${end - start}`);
    console.log(`${end2 - end}`);
    console.log(`${end3 - end2}`);
    console.log(`${end4 - end3}`);
}


