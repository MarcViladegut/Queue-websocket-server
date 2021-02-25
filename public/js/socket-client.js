
// Html references
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')


const socket = io()

socket.on('connect', () => {
    console.log('Client connected')
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
})


socket.on('disconnect', () => {
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
})

socket.on('send-message', (payload) => {
    console.log(payload)
})


btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    socket.emit('send-message', payload, (id) => {
        console.log(id)
    })

})