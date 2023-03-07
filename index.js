const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


var nguoiGui = []
io.on('connection', (socket) => {
  nguoiGui.push({id : socket.id ,soLanNoiBay: 0}) 
  socket.on('chat message', msg => {
    for( let i = 0; i < nguoiGui.length; i++){
      if(nguoiGui[i].id == socket.id) {
          let soLanNoiBayCuaNguoiHienTai = nguoiGui[i].soLanNoiBay
          if(soLanNoiBayCuaNguoiHienTai < 3){
            if(msg == 'fuckyou' || msg == 'fuck you' || msg == 'fuck'){
              soLanNoiBayCuaNguoiHienTai++
              io.emit('chat message','***');
              nguoiGui[i].soLanNoiBay = soLanNoiBayCuaNguoiHienTai;
            }else {
              io.emit('chat message', msg)
            }
          }else{
            io.emit('chat message', {thongBao: "Tai khoan cua ban da bi khoa", idNguoiBiKhoa: socket.id})
            nguoiGui[i].soLanNoiBay = 0
          }
        }
      }
    });

});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

 
// var nguoiGui = []
// io.on('connection', (socket) => {
//   nguoiGui.push({ id: socket.id, soLanNoiBay: 0 })
//   socket.on('chat message', msg => {
//     if (msg == 'fuckyou' || msg == 'fuck you') {
//       for (let i = 0; i < nguoiGui.length; i++) {
//         if (nguoiGui[i].id == socket.id) {
//           let soLanNoiBayCuaNguoiHienTai = nguoiGui[i].soLanNoiBay
//           soLanNoiBayCuaNguoiHienTai++
//           if (soLanNoiBayCuaNguoiHienTai > 3) {
//             io.emit('chat message', 'Tài  khoản có id : ' + socket.id + 'đã bị khóa!')
//           } else {
//             io.emit('chat message', '***')
//             nguoiGui[i].soLanNoiBay = soLanNoiBayCuaNguoiHienTai
//           }
//         }
//       }

//     } else {
//       io.emit('chat message', msg)
//     }
//   });

// });
// var nguoiGui = []
// io.on('connection', (socket) => {
//   nguoiGui.push({ id: socket.id, soLanNoiBay: 0 })
//   socket.on('chat message', msg => {
//     for (let i = 0; i < nguoiGui.length; i++) {
//       if (nguoiGui[i].id == socket.id) {
//         let soLanNoiBayCuaNguoiHienTai = nguoiGui[i].soLanNoiBay
//         if (soLanNoiBayCuaNguoiHienTai < 3) {
//           if (msg == 'fuckyou' || msg == 'fuck you') {
//             soLanNoiBayCuaNguoiHienTai++
//             io.emit('chat messsage', "***")
//             nguoiGui[i].soLanNoiBay = soLanNoiBayCuaNguoiHienTai
//           } else {
//             io.emit('chat message', msg)
//           }
//         } else {
//           io.emit('chat message', { thongBao: "Tai khoan cua ban bi khoa", idNguoiBiKhoa : socket.id })
//         }

//       }
//     }
//   })
// })

// var danhSachNguoiGui = []
// io.on('connection', (socket) => {
//   danhSachNguoiGui.push({id: socket.id, soLanNoiBay: 0})
//   socket.on('chat message', msg => {
//     if (msg == "fuck you") {
//       for (let i=0; i<danhSachNguoiGui.length; i++) {
//         if (danhSachNguoiGui[i].id == socket.id) {
//           let soLanNoiBayCuaNguoiHienTai = danhSachNguoiGui[i].soLanNoiBay
//           soLanNoiBayCuaNguoiHienTai++
//           console.log("so lan noi bay" +soLanNoiBayCuaNguoiHienTai)
//           if (soLanNoiBayCuaNguoiHienTai > 3) {
//             io.emit('chat message', "Tai khoan " + socket.id + " da bi khoa!")
//           } else {
//             io.emit('chat message', "***")
//             danhSachNguoiGui[i].soLanNoiBay = soLanNoiBayCuaNguoiHienTai
//           }
//         }
//       }
//     } else {
//       io.emit('chat message', msg)
//     }
//   });
// console.log(socket.id)
// var dem =0
// socket.on('chat message', msg =>{
//   if(msg=="fuck you"){
//     dem ++;
//     if(dem > 3){
//       io.emit('chat message','ban da bi khoa nick')
//     }
//    else {
//     io.emit('chat message', '****')

//   }
// }
// else {
//   io.emit('chat message',  msg)

// }


// });
// socket.on('chat message', msg => {
//   io.emit('chat message', 'ban co tin nhan moi la : ' + msg);
//   if(msg == "fuck you"){
//     io.emit('chat message', '*****' )
//   } else  {
//     io.emit('chat message', msg)
//   } 

// });
// });
