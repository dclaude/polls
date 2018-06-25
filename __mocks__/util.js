import waitForExpect from 'wait-for-expect'

export function wait(callback = () => {}, { timeout = 4500, interval = 50 } = {}) {
  return waitForExpect(callback, timeout, interval)
}


