const nomadList = document.getElementById('nom_list');
let nomList =[];

const loadNomad = async () =>{
    try{
        const res = await fetch("data.json");
        let nomList = await res.json();
        displayList(nomList);
        console.log(nomList);
        const searchBar = document.getElementById('searchwrapper');
        searchBar.addEventListener('keyup', (e)=>{
        const searchValue = e.target.value.toLowerCase();
        const filterSearch = nomList.filter((data)=> {
            return (data.name.toLowerCase().includes(searchValue) || 
            data.city.toLowerCase().includes(searchValue) ||
            data.country.toLowerCase().includes(searchValue)
            );
            
        });
        displayList(filterSearch)
        
    });
} catch (err){
    console.log(err)
}
if(searchValue.length === 0){
 nomList =[];
}
};

const displayList = (data) =>{
    let htmlString = data
    .map((data)=>{
        return ` 
        <li class="locations" >
        <div class="conta" style="background:rgba(255, 255, 255, 0.9) url(${data.cover}) no-repeat;">
        <a href="${data.site}" target="_blank" rel="noopener noreferrer"> <img src="${data.logo}" alt="" /></a>
        <h2>${data.name}</h2>
        <h3>${data.city}</h3>   
        <p>${data.country}</p>
        </div>
        <div class="foot">
        <a href="${data.site}" target="_blank" rel="noopener noreferrer">Our Webpage</a>
        <ul id="contact">
        <li><i class="fab fa-facebook"></i></li>
        <li><i class="fab fa-linkedin"></i></li>
        <li><i class="fab fa-instagram"></i></li>
        </ul>
        </div>
        </li> `
        ;
    })
    .join('');
    nomadList.innerHTML = htmlString;
};

loadNomad();

// fetch("data.json")
// .then(function(res){
//     return res.json()
    
// })

// .then(function(data){
//     let htmlString = (data)
//     .map((data)=>{
        
        
//         return ` 
//         <li class="locations" >
//         <div class="conta" style="background:rgba(255, 255, 255, 0.9) url(${data.cover}) no-repeat;">
//         <a href="${data.site}" target="_blank" rel="noopener noreferrer"> <img src="${data.logo}" alt="" /></a>
//         <h2>${data.name}</h2>
//         <h3>${data.city}</h3>   
//         <p>${data.country}</p>
//         </div>
//         <div class="foot">
//         <a href="${data.site}" target="_blank" rel="noopener noreferrer">Our Webpage</a>
//         <ul id="contacts">
//         <li><i class="fab fa-facebook"></i></li>
//         <li><i class="fab fa-linkedin"></i></li>
//         <li><i class="fab fa-instagram"></i></li>
//         </ul>
//         </div>
//         </li> `
//         ;
//     })
//     .join('');
//     nomadList.innerHTML = htmlString;
// });