import {shell} from 'electron'
import _ from 'lodash'
const GITHUB_ISSUES_URL = 'https://github.com/NTLx/AneuFiler/issues'
const QQ_CONTACT = 'tencent://message/?Menu=yes&uin=1002726239& Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45'
export function openExternal (uri) {
  if (typeof uri === 'undefined' || uri === null) {
    return
  }
  if (_.isString(uri) && uri.trim() !== '') {
    switch (uri.toLowerCase()) {
      case 'issues': shell.openExternal(GITHUB_ISSUES_URL); break
      case 'developer': shell.openExternal(QQ_CONTACT); break
    }
  }
}
