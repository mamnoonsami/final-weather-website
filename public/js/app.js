console.log('Client side javascript is loaded')


const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const result = document.querySelector('.result')
const temp = document.querySelector('#temp')
    //messageone.textContent = 'From JS'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // this prevent the browser to reaload immidiately after clicking search button

    const location = searchValue.value

    messageOne.textContent = "Laoding ..."
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.style.color = 'red'
                result.style['-webkit-box-shadow'] = 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                messageOne.textContent = data.error
            } else {
                result.style['-webkit-box-shadow'] = 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
                temp.textContent = data.forecast.temperature + "° C"
                messageOne.style.color = "rgb(44, 161, 197)"
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weather_description + ". It feels like " + data.forecast.feels_like + "° C."
            }
        })
    })

})