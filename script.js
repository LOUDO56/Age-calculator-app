function setError(element, i, text){

    element[i].lastElementChild.textContent = text;
    element[i].children[0].classList.add("error-input-date")
    element[i].children[1].classList.add("error-input")
}

const getAge = document.getElementById('submit-button');
getAge.addEventListener('click', () => {
    let error = false;
    const day = Number(document.getElementById('getDay').value);
    const month = Number(document.getElementById('getMonth').value);
    const year = Number(document.getElementById('getYear').value);

    //Verify error first
    const input = document.querySelectorAll("input");
    const input_date = document.querySelectorAll(".input-date");
    for(let i = 0; i < input.length; i++){
        input_date[i].lastElementChild.textContent = "";
        input_date[i].children[0].classList.remove("error-input-date")
        input_date[i].children[1].classList.remove("error-input")
        if(input[i].value  === ""){
            setError(input_date, i, "This field is required")
            error = true;
        }
    }
    const todayTime = new Date();
    const timeRequest = new Date(`${year}-${month}-${day}`)
    if(isNaN(timeRequest) === true){
        setError(input_date, 0, "Must be a valid date")
        error = true;
    }

    if(day > 31 || day === 0){
        setError(input_date, 0, "Must be a valid day")
        error = true;
    }
    if (month > 12 || month === 0){
        setError(input_date, 1, "Must be a valid month")
        error = true;
    }
    if (year > todayTime.getFullYear()){
        setError(input_date, 2, "Must be in the past")
        error = true;
    }
    if (year === 0){
        setError(input_date, 2, "Must be a valid year")
        error = true;
    }
    if(error === true){
        return;
    }
    let day_result = todayTime.getDate() - day;
    let month_result = todayTime.getMonth() - month;
    let year_result = todayTime.getFullYear() - year;

    if(day_result < 0){
        month_result--;
        let last_day_month = new Date(todayTime.getFullYear(), todayTime.getMonth()+1, 0)
        day_result = day_result + last_day_month.getDate();
    }

    if(month_result < 0){
        year_result--;
        month_result = 12 + month_result;
    }

    document.getElementById('year-result').textContent = year_result;
    document.getElementById('month-result').textContent = month_result;
    document.getElementById('day-result').textContent = day_result;

})