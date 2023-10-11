/**
 *
 * A utility used in asynchronous tests that don't use async/await.
 * A good example of that is a external layer controlling something like
 * a notification system, something that doesn't require the thread to be
 * blocked.
 *
 * @param assertions any type of assertion needed for the test
 * @param maxDuration max duration expected for the assertion
 */
export async function waitFor(
  assertions: () => void,
  maxDuration = 1000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let elapsedTime = 0

    const interval = setInterval(() => {
      elapsedTime += 10

      try {
        assertions()
        clearInterval(interval)
        resolve()
      } catch (error) {
        if (elapsedTime >= maxDuration) reject(error)
      }
    }, 10)
  })
}
