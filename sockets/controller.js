const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl()

const socketController = (socket) => {

    // When the client is online
    socket.emit('ultimo-ticket', ticketControl.ultimo)
    socket.emit('estado-actual', ticketControl.ultimos4)
    socket.emit('tickets-pendientes', ticketControl.tickets.length)

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente()
        callback(siguiente)
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
        
    })

    socket.on('atender-ticket', ({escritorio}, callback) => {
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'The desktop is mandatory'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio)

        // Notify changes in ultimos4 array
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4)
        socket.emit('tickets-pendientes', ticketControl.tickets.length)
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)

        if(!ticket){
            callback({
                ok: false,
                msg: 'There arent more tickets remaining'
            }) 
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })

}

module.exports = {
    socketController
}

