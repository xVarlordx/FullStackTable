import { all, call, delay, put, takeEvery } from 'redux-saga/effects'
import types from '../actions/types'

export function* incrementAsync() {
  yield delay(1000)
  yield put({type: types.INCREMENT})
}

export function* watchIncrementAsync() {
  yield takeEvery(types.INCREMENT_ASYNC, incrementAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    call(watchIncrementAsync),
  ])
}
