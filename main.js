//get total
//creat product
//save data at localstorage
//clear inputs
//read
//count
//delete
//update
//search
//clean data
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit');
let mod = 'creat';
let temp;
// ******************************** get total *******************************************
function getTotal()
{
    if ( price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else
    {
        total.innerHTML = '';
        total.style.background = '#df1515ff';
    }
}
// ******************************** creat product *******************************************
let dataProduct;
if (localStorage.product != null)
{
    dataProduct = JSON.parse(localStorage.product)
}
else
{
    dataProduct = [];
}
submit.onclick = function ()
{
    if (title.value.trim() === "" || price.value.trim() === "" || category.value.trim() === "")
    {
        alert('ابو الشوء بيسلم عليك وبيقولك دخل البيانات كلها يسطا 🙈');
        return;
    }
    let newProduct = {
        title: title.value.toLowerCase() ,
        price: +price.value,
        taxes: +taxes.value,
        ads: +ads.value,
        discount: +discount.value,
        total: +total.innerHTML,
        count: +count.value,
        category: category.value.toLowerCase(),
    }  
    // ******************************** count *******************************************
    let productCount = +count.value;
    if (mod === 'creat')
    {
        if (productCount > 1)
        {
            for (let i = 0; i < productCount; i++)
            {
                dataProduct.push(newProduct);
            }
        }
        else
        {
            dataProduct.push(newProduct);
        }
    }
    else
    {
        dataProduct[temp] = newProduct;
        mod = 'creat';
        submit.innerHTML = 'creat';
        count.style.display = 'block';

    }
 
   
 // ******************************** save data at localstorage *******************************
    localStorage.setItem('product', JSON.stringify(dataProduct));
    clearData();
    showData();
}
// ********************************* clear inputs ********************************************
function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// ********************************* read ********************************************
function showData()
{
    getTotal();
    let table = '';
    for (let i =0 ; i < dataProduct.length; i++)
    {
        table += `
    <tr>
         <td>${i+1}</td>
         <td>${dataProduct[i].title}</td>
         <td>${dataProduct[i].price}</td>
         <td>${dataProduct[i].taxes}</td>
         <td>${dataProduct[i].ads}</td>
         <td>${dataProduct[i].discount}</td>
         <td>${dataProduct[i].total}</td>
         <td>${dataProduct[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
    </tr>
    `
    }
    document.getElementById('tbody').innerHTML = table;
    let delBtn = document.getElementById('delete');
    if (dataProduct.length > 0)
    {
        delBtn.innerHTML = `
        <button id="bttn" onclick="deletaAll()">Delete All(${dataProduct.length})</button>
        `
    }
    else
    {
        delBtn.innerHTML = ''; 
    }
}
showData();
// ********************************* delete ********************************************
function deleteData (id)
{
    dataProduct.splice(id, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
    
}
// ********************************* delete All ********************************************
function deletaAll()
{
    localStorage.clear();
    dataProduct.splice(0);
    clearData();
    showData();
}
// ********************************* update ********************************************
function updateData(i)
{
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price ;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProduct[i].category;
    mod = 'update';
    submit.innerHTML = 'update';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}
// ********************************* search ********************************************
let searchMood = 'title';
function getSearchMood(id)
{
    let search = document.getElementById('search');
    if (id == 'searchTitle')
    {
        searchMood = 'title';
        search.placeholder = 'search by title';
    }
    else
    {
        search.placeholder = 'search by category';
        searchMood = 'category';
    }
    search.focus();
    search.value = '';
    showData();
}
function searchData(value)
{
    let table = '';
    if (searchMood == 'title')
    {
        for (let i = 0; i < dataProduct.length; i++)
        {
            if (dataProduct[i].title.includes(value.toLowerCase()))
            {
                table +=
                `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                    </tr>
                `
            }
        }
    }
    else
    {
        for (let i = 0; i < dataProduct.length; i++) {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table +=
                `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData (${i})" id="delete">delete</button></td>
                    </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
