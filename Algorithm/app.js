const size = document.getElementById("size");
const generateArrayBtn = document.querySelector("#generateArray");
let bars;
console.log("javascript enabled");
function generateArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 100) + 1;
    array.push(value);
  }
  return array;
}


function displayArray(array) {
  const container = document.getElementById("array-container");
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.classList.add("array-bar");
    bar.style.height = `${array[i] * 4}px`;
    container.appendChild(bar);
  }
  bars = document.querySelectorAll(".array-bar");
}

async function bubbleSort() {
  let n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      let bar1 = bars[j];
      let bar2 = bars[j + 1];
      let height1 = bar1.style.height;
      let height2 = bar2.style.height;
      if (parseInt(height1) > parseInt(height2)) {
        await swap(bar1, bar2);
        bars = document.querySelectorAll(".array-bar");
      }
    }
    bars[n - i - 1].classList.add("sorted"); // Add sorted class to the last bar in each iteration
  }

  let isSorted = true;
  for (let i = 0; i < n - 1; i++) {
    let height1 = parseInt(bars[i].style.height);
    let height2 = parseInt(bars[i + 1].style.height);
    if (height1 > height2) {
      isSorted = false;
      break;
    }
  }

  if (isSorted) {
    // Display message
    document.getElementById("message").innerText = "Array is sorted!";
    // Change color of bars
    bars.forEach(bar => bar.style.backgroundColor =  rgb(17, 15, 15));
  }
}




function swap(bar1, bar2) {
  return new Promise((resolve) => {
    let temp = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = temp;
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

async function selectionSort() {
  let n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    let min_idx = i;
    for (let j = i + 1; j < n; j++) {
      let bar1 = bars[j];
      let bar2 = bars[min_idx];
      let height1 = parseInt(bar1.style.height);
      let height2 = parseInt(bar2.style.height);
      if (height1 < height2) {
        min_idx = j;
      }
    }
    if (min_idx !== i) {
      swapSelection(bars, i, min_idx);
      bars[i].classList.add("sorted"); // Add sorted class to the selected bar in each iteration
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  let isSorted = true;
  for (let i = 0; i < n - 1; i++) {
    let height1 = parseInt(bars[i].style.height);
    let height2 = parseInt(bars[i + 1].style.height);
    if (height1 > height2) {
      isSorted = false;
      break;
    }
  }

  if (isSorted) {
    // Display message
    document.getElementById("message").innerText = "Array is sorted!";
    // Change color of bars
    bars.forEach(bar => bar.style.backgroundColor = rgb(17, 15, 15));
  }
}




async function swapSelection(bars, i, j) {
  let temp = bars[i].style.height;
  bars[i].style.height = bars[j].style.height;
  bars[j].style.height = temp;

  await new Promise(resolve => setTimeout(resolve, 1000));
}




async function insertionSort() {
  let n = bars.length;
  for (let i = 1; i < n; i++) {
    let key = parseInt(bars[i].style.height);
    let j = i - 1;
    while (j >= 0 && parseInt(bars[j].style.height) > key) {
      bars[j + 1].style.height = bars[j].style.height;
      j = j - 1;
    }
    bars[j + 1].style.height = `${key}px`;
    bars[i].classList.add("sorted"); // Add sorted class to the inserted bar in each iteration
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  let isSorted = true;
  for (let i = 0; i < n - 1; i++) {
    let height1 = parseInt(bars[i].style.height);
    let height2 = parseInt(bars[i + 1].style.height);
    if (height1 > height2) {
      isSorted = false;
      break;
    }
  }

  if (isSorted) {
    // Display message
    document.getElementById("message").innerText = "Array is sorted!";
    // Change color of bars
    bars.forEach(bar => bar.style.backgroundColor =rgb(17, 15, 15) );
  }
}



async function merge(start, mid, end) {
  let i = start;
  let j = mid + 1;

  let tempArr = [];

  while (i <= mid && j <= end) {
    let height1 = bars[i].style.height;
    let height2 = bars[j].style.height;

    if (parseInt(height1) < parseInt(height2)) {
      tempArr.push(height1);
      i++;
    } else {
      tempArr.push(height2);
      j++;
    }
  }

  while (i <= mid) {
    tempArr.push(bars[i].style.height);
    i++;
  }

  while (j <= end) {
    tempArr.push(bars[j].style.height);
    j++;
  }

  for (let k = start; k <= end; k++) {
    bars[k].style.height = tempArr[k - start];
    bars[k].classList.add("sorted");
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}



async function mergeSort() {
  await merge_sort_recursive(0, bars.length - 1);
  await mergeSort();

  
}

async function merge_sort_recursive(start, end) {
  if (start >= end) {
    return;
  }
  let mid = Math.floor((start + end) / 2);

  await merge_sort_recursive(start, mid);
  await merge_sort_recursive(mid + 1, end);

  await merge(start, mid, end);

}


async function quickSort() {
  async function partition(start, end) {
    const pivotValue = parseInt(bars[end].style.height);
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      if (parseInt(bars[i].style.height) < pivotValue) {
        await swap(bars[i], bars[pivotIndex]);
        pivotIndex++;
      }
    }

    await swap(bars[pivotIndex], bars[end]);
    bars[pivotIndex].classList.add("sorted");
    bars = document.querySelectorAll(".array-bar");
    return pivotIndex;
  }

  async function quickSortRecursive(start, end) {
    if (start >= end) return;

    let index = await partition(start, end);
    await Promise.all([
      quickSortRecursive(start, index - 1),
      quickSortRecursive(index + 1, end)
    ]);
  }

  await quickSortRecursive(0, bars.length - 1);

  for (let i = 0; i < n - 1; i++) {
    let height1 = parseInt(bars[i].style.height);
    let height2 = parseInt(bars[i + 1].style.height);
    if (height1 > height2) {
      isSorted = false;
      break;
    }
  }
}

async function quick_sort() {
  async function partition(start, end) {
    const pivotValue = parseInt(bars[end].style.height);
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      if (parseInt(bars[i].style.height) < pivotValue) {
        await swap(bars[i], bars[pivotIndex]);
        pivotIndex++;
      }
    }

    await swap(bars[pivotIndex], bars[end]);
    bars = document.querySelectorAll(".array-bar");
    return pivotIndex;
  }

  async function quickSortRecursive(start, end) {
    if (start >= end) return;

    let index = await partition(start, end);
    await Promise.all([
      quickSortRecursive(start, index - 1),
      quickSortRecursive(index + 1, end)
    ]);
  }

  await quickSortRecursive(0, bars.length - 1);
}

generateArrayBtn.addEventListener("click", () => {

  const size = document.querySelector("#size").value;
  const array = generateArray(size);
  displayArray(array);
});

const BubblesortBtn = document.querySelector("#bubbleSort");
BubblesortBtn.addEventListener("click", bubbleSort);

const selectionSortBtn = document.querySelector("#selectionSort");
selectionSortBtn.addEventListener("click", selectionSort);

const insertionSortBtn = document.querySelector("#insertionSort");
insertionSortBtn.addEventListener("click", insertionSort);

const mergeSortBtn = document.querySelector("#mergeSort");
mergeSortBtn.addEventListener("click", mergeSort);

const quickSortBtn = document.querySelector("#quickSort");
quickSortBtn.addEventListener("click", quickSort);