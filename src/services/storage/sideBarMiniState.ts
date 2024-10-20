export const getSideBarMini = () => {
  const savedState = localStorage.getItem('isSideBarMini')
  return savedState ? JSON.parse(savedState) : true
}

export const setSideBarMini = (value: boolean) => {
  localStorage.setItem('isSideBarMini', JSON.stringify(value))
}
