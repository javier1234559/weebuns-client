export const replacePathId = (path: string | undefined, id: string): string => {
  if (!path) {
    return ''
  }
  return path.replace(':id', id)
}

// how to use replacePathId
// import { RouteNames } from '~/router/route-name'
// import { replacePathId } from '~/utils/replace-text'
// const path = replacePathId(RouteNames.PRODUCT_DETAIL, productId)
// navigate(path)
// or
// const path = replacePathId(RouteNames.PRODUCT_DETAIL, productId)
// router.push(path)

export const replacePathIdAndSubId = (path: string | undefined, id: string, subId: string): string => {
  if (!path) {
    return ''
  }
  return path.replace(':id', id).replace(':subId', subId)
}

// how to use replacePathIdAndSubId
// import { RouteNames } from '~/router/route-name'
// import { replacePathIdAndSubId } from '~/utils/replace-text'
// const path = replacePathIdAndSubId(RouteNames.PRODUCT_DETAIL, productId, subId)
// navigate(path)
// or
// const path = replacePathIdAndSubId(RouteNames.PRODUCT_DETAIL, productId, subId)
//RouteNames.PRODUCT_DETAIL = '/product/:id/:subId'

export const replacePathIdAndSubIdAndSubSubId = (
  path: string | undefined,
  id: string,
  subId: string,
  subSubId: string
): string => {
  if (!path) {
    return ''
  }
  return path.replace(':id', id).replace(':subId', subId).replace(':subSubId', subSubId)
}
