
const form = document.querySelector('form')
const loading = document.querySelector('.loading')
const DweetsElement = document.querySelector('.Dweets')

const API_URL = 'http://localhost:5000/Dweets'

loading.style.display = ' '

listAllDweets()

form.addEventListener('submit' , (event) => {
    event.preventDefault();

    const formData = new FormData(form)
    const name = formData.get('name');
    const content = formData.get('content');

    const Dweet = {
        name,
        content
    }
    form.style.display = 'none'

    loading.style.display = 'block'
    
    fetch(API_URL, {
        method: 'POST',
        body:JSON.stringify(Dweet),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(createdDweet => {
        form.reset()
        setTimeout(()=>{

            form.style.display = 'block' 
        
        },3000)
        listAllDweets()
    })
})

function listAllDweets(){
    DweetsElement.innerHTML = ''
    fetch(API_URL)
        .then(response => response.json())
        .then(Dweets => {
            console.log(Dweets)
            Dweets.reverse();

            Dweets.forEach(Dweet => {
                
                const div = document.createElement('div')

                const header = document.createElement('h3')
                header.textContent = Dweet.name

                const contents = document.createElement('p')
                contents.textContent = Dweet.content

                const date = document.createElement('small')
                date.textContent = new Date(Dweet.created)

                div.appendChild(header)
                div.appendChild(contents)
                div.appendChild(date)

                DweetsElement.appendChild(div)
            });
            loading.style.display = 'none'
        })
}