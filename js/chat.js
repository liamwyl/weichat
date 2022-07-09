// $(function () {
//   // 初始化右侧滚动条
//   // 这个方法定义在scroll.js中

//   //  resetui()当发送完信息后，页面自动滚动到最底部
//   resetui()

//   // 为发送按钮绑定鼠标点击事件
//   $('#btnSend').on('click', function () {
//     var text = $('#ipt').val().trim()
//     if (text.length <= 0) {
//       return $('#ipt').val('')
//     }
//     // 如果用户输入了聊天内容，则将聊天内容追加到页面上显示
//     $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
//     $('#ipt').val('')
//     // 重置滚动条的位置
//     resetui()
//     // 发起请求，获取聊天内容
//     getMsg(text)
//   })

//   // 获取聊天机器人发送回来的消息
//   function getMsg(text) {
//     $.ajax({
//       method: 'GET',
//       url: 'http://ajax.frontend.itheima.net:3006/api/robot',
//       data: {
//         spoken: text
//       },
//       success: function (res) {
//         // console.log(res)
//         if (res.message === 'success') {
//           // 接收聊天消息
//           var msg = res.data.info.text
//           $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
//           // 重置滚动条的位置
//           resetui()
//           // 调用 getVoice 函数，把文本转化为语音
//           getVoice(msg)
//         }
//       }
//     })
//   }

//   // 把文字转化为语音进行播放
//   function getVoice(text) {
//     $.ajax({
//       method: 'GET',
//       url: 'http://ajax.frontend.itheima.net:3006/api/synthesize',
//       data: {
//         text: text
//       },
//       success: function (res) {
//         // console.log(res)
//         if (res.status === 200) {
//           // 播放语音
//           $('#voice').attr('src', res.voiceUrl)
//         }
//       }
//     })
//   }

//   // 为文本框绑定 keyup 事件
//   $('#ipt').on('keyup', function (e) {
//     // console.log(e.keyCode)
//     if (e.keyCode === 13) {
//       // console.log('用户弹起了回车键')
//       $('#btnSend').click()
//     }
//   })
// })




$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中

  // resetui()当发送完信息后，页面自动滚动到最底部
  resetui()


  // 1.用户消息渲染页面功能

  // 为底部按钮绑定点击事件
  $('#btnSend').click(function () {
    // 获取输入框中用户输入信息
    var text = $('#ipt').val().trim()
    // 判断输入框中是否为有效信息
    if (text.length <= 0) {
      // 返回清空输入框非有效信息
      return $('#ipt').val('')
    } else {
      // 如果输入有效信息，将聊天内容添加到页面中显示
      $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
      // 清空输入框
      $('#ipt').val('')
      // 重置滚动条位置
      resetui()

      // 发起请求，获取聊天内容
      getMsg(text)

    }
  })



  // 2.机器人返回消息展示页面功能

  // 获取聊天机器人发送的消息
  function getMsg(text) {
    $.ajax({
      methods: 'GET',
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text

      },
      success: function (res) {
        console.log(res)
        if (res.message === 'success') {
          // 接收聊天消息
          var msg = res.data.info.text

          // 将机器人回复信息渲染到页面
          $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
          // 重置滚动条位置
          resetui()

          // 将机器人消息转换为语音
          getVoice(msg)
        }
      }

    })
  }


  // 3.机器人返回消息转换为语音功能

  // 把文字转化为语音
  function getVoice(text) {
    $.ajax({
      method: 'GET',
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: text
      },
      success: function (res) {
        console.log(res)

        // 判断接口链接成功
        if (res.message == 'success') {
          // 播放语音
          $('#voice').attr('src', res.voiceUrl)
        }
      }

    })
  }



  // 4.按下回车发送消息功能

  // 为文本框添加按键事件
  $('#ipt').on('keyup', function (res) {
    console.log(res.keyCode)
    // 确定回车键编码  13
    if (res.keyCode == 13) {
      // 调用按钮元素的click函数，通过编程的形式触发按钮事件
      $('#btnSend').click()
    }
  })
})