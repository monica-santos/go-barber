import { all, call, put, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import api from '~/services/api'
import { sigInSuccess, signFailure } from './actions'
import history from '~/services/history'

export const rehydrate = ({ payload }) => {
  if (!payload) return

  const {
    auth: { token },
  } = payload

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload

    const {
      data: { token, user },
    } = yield call(api.post, '/session', { email, password })

    if (!user.provider) {
      toast.error('O usuário não é do tipo provider')
      return
    }

    api.defaults.headers.Authorization = `Bearer ${token}`

    yield put(sigInSuccess(token, user))
    history.push('/dashboard')
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados')
    yield put(signFailure())
  }
}

export function* signUp({ payload }) {
  try {
    const { email, name, password } = payload

    yield call(api.post, '/user', { email, name, password, provider: true })

    history.push('/')
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados')
    yield put(signFailure())
  }
}

export default all([
  takeLatest('persist/REHYDRATE', rehydrate),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
])
