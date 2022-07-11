//Q1
const itemsObject = [
  { quantity: 1, price: 200 },
  { quantity: 3, price: 350 },
  { quantity: 5, price: 400 },
];

//Doubles the quantity and price in each object.
const doubleItemsObject = itemsObject.map((ele) => {
  return { quantity: ele.quantity * 2, price: ele.price * 2 };
});
console.log(doubleItemsObject);

//generating a new array which contains item quantity > 2 and price > 300 only.
const itemsObject2 = itemsObject.filter((ele) => {
  return ele.quantity > 2 && ele.price > 300;
});
console.log(itemsObject2);

// calculate the total value of the items
const val = itemsObject.reduce((accumulator, ele) => {
  return (accumulator += ele.quantity * ele.price);
}, 0);
console.log(val);

//Q2 implement a function to remove all the non-alphabet characters and extra space in the string and convert the string to all lowercase
const string =
  "Perhaps The Easiest-to-understand  Case   For Reduce Is   To Return The Sum Of  All The Elements In  An Array  ";

//Method 1:
const strs2 = string.trim().split(/[ -]+/).join(" ").toLowerCase();
console.log(strs2);

//Method 2
const strs = string
  .replace(/\s+/g, "-")
  .split(/[^A-Za-z]/)
  .join(" ")
  .toLowerCase();
console.log(strs);

//Q3 merge two arrays of objects on uuid, but first has uuid and name, second has uuid and role. With the not existing property, fill with null. Sort according to uuid after merge.
const first = [
  { uuid: 2, name: "test" },
  { uuid: 5, name: "test5" },
  { uuid: 3, name: "test3" },
];

const second = [
  { uuid: 6, role: "pm" },
  { uuid: 4, role: "engineer" },
  { uuid: 1, role: "manager" },
  { uuid: 2, role: "associate" },
];

//Method 1
const map = {};
const mergedArray = [...first, ...second];
mergedArray.forEach((ele) => {
  if (!map[ele.uuid]) {
    map[ele.uuid] = {
      uuid: ele.uuid,
      name: !ele.name ? null : ele.name,
      role: !ele.role ? null : ele.role,
    };
  } else {
    map[ele.uuid] = { ...map[ele.uuid], ...ele };
  }
});

const sortedArray = Object.values(map).sort((left, right) => {
  return left.uuid - right.uuid;
});
console.log(sortedArray);

//Method 2:
const merged = [];
first
  .map((user1) => {
    if (second.find((user2) => user2.uuid === user1.uuid) === undefined) {
      merged.push({ uuid: user1.uuid, name: user1.name, role: null });
    }
  })
  .concat(
    second.map((user2) => {
      if (first.find((user1) => user1.uuid === user2.uuid) === undefined) {
        merged.push({ uuid: user2.uuid, name: null, role: user2.role });
      } else {
        const user = first.find((id) => {
          id.uuid === user2.uuid;
          return id;
        });

        merged.push({ uuid: user2.uuid, name: user.name, role: user2.role });
      }
    })
  );

merged.sort((a, b) => parseInt(a.uuid) - parseInt(b.uuid));
console.log(merged);
