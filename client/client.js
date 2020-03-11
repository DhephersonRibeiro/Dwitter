
const form = document.querySelector('form')
const loading = document.querySelector('.loading')

loading.style.display = 'none'
form.addEventListener('submit' , (event) => {
    event.preventDefault();
    // pegando dados do formulário e transformando tudo em objeto 
    const formData = new FormData(form)
    const name = formData.get('name');
    const content = formData.get('content');

    const Dweet = {
        name,
        content
    }
    form.style.display = 'none'
    loading.style.display = 'block'
    console.log(Dweet)
})
