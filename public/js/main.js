const day = document.getElementById("day");
const date = document.getElementById("date");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.querySelector("#temp_real_val");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector('.middle_layer');
const submitBtn = document.getElementById("submitBtn");

const year = new Date();
const d = ['MON', 'TUE', 'WED', 'THRU', 'FRI', 'SAT', 'SUN'];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
day.innerHTML = d[year.getDay() - 1];
date.innerHTML = year.getDate() + " " + month[year.getMonth()];

const getInfo = async (event) => {
    event.preventDefault();
    let cityval = cityName.value;
    if (cityval === '') {
        city_name.innerText = `Plz Write The Name`;
        datahide.classList.add('data_hide');
    } else {
        try {
            const a = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=e2770f6c4c5f496af4ace6d3e0c74607`);
            const string = await a.json();
            const array = [string];
            temp.innerText = array[0].main.temp;
            city_name.innerText = `${array[0].name} , ${array[0].sys.country}`;

            const tempmod = array[0].weather[0].main;
            console.log(tempmod);

            if(tempmod === "Clear"){
                temp_status.innerHTML = "<i class = 'fas fa-sun' style='color : #eccc68;'></i>";
            } else if(tempmod === "Clouds"){
                temp_status.innerHTML = "<i class = 'fas fa-cloud' style='color : #f1f2f6;'></i>";
            } else if(tempmod === "Rain"){
                temp_status.innerHTML = "<i class = 'fas fa-cloud-rain' style='color : #a4b0be;'></i>";
            } else {
                temp_status.innerHTML = "<i class = 'fas fa-cloud' style='color : #f1f2f6;'></i>"; 
            }
            datahide.classList.remove('data_hide');
        }
        catch{
            city_name.innerText = `Plz Enter The City Name Properly`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener("click", getInfo);