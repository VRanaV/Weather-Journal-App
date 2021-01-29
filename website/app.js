/* Global Variables */
const APIkey ="can't share for security policy";
const APIname= "weather";
const ZipCode=document.querySelector('#zip');
const CountryCode = document.querySelector('#code');
const userResponse = document.querySelector('#feelings');
const button = document.querySelector('#generate');
const dateUI=document.querySelector('#date');
const tempUI=document.querySelector('#temp');
const contentUI=document.querySelector('#content');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
let today ="Today is ";
let temp="The temprature is ";
  
button.addEventListener('click',callback);
function callback(){
    getDataFromAPI()
    .then((data)=>{
       
        postData('/',{temprature :temp+data.main.temp+'°C' ,date:today+newDate ,userResponse: userResponse.value});
        updateUI();
    });
}

const getDataFromAPI= async()=>{
 const request = await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+ZipCode.value+','+CountryCode.value+'&units=metric'+'&appid='+APIkey);

 try{
     const data =request.json();
      return data; }
 catch(err){
     console.log(err);
 }
};

const postData = async(url,data)=>{
 const response = await fetch(url,{
     method: 'POST',
     credentials: 'same-origin',
     headers:{
         'Content-Type':'application/json'
     },
     body: JSON.stringify(data)
 })
 try{
     const newData= await response.json();
     return newData;
 }
 catch(err){
    console.log(err);
}
};

const updateUI = async ()=>{
    const response = await fetch('/all')
  
    try{
        const allData = await response.json()
      
        dateUI.innerHTML =allData.date;
        tempUI.innerHTML=allData.temprature;
        contentUI.innerHTML=allData.userResponse;
    }
    catch(error){
        console.log(error);
    }
};
