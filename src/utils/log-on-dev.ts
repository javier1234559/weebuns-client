/* eslint-disable @typescript-eslint/no-explicit-any */
export default function logOnDev(message: any, ...args: any[]) {
  if (import.meta.env.DEV) {
    console.log(`✅`)
    console.log(message, ...args)
    console.log('%c => message, ...args ', 'background: #0095FF; color: #fff')
    console.log(new Date())
  }
}
