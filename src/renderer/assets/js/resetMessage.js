/*
 * @Author: Letmeouted
 * @Email: 1002726239@qq.com
 * @Date: 2021-01-04 10:19:10
 * @LastEditTime: 2021-01-11 15:53:09
 * @FilePath: \AneuFilerVue\src\renderer\assets\js\resetMessage.js
 */

import { Message } from 'element-ui'
let messageInstance = null
const resetMessage = (options) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = Message(options)
}
;
['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
export default resetMessage
