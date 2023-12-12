import { GetContext } from 'fuse'

export const getContext = ({
  request,
  params: _params,
}): GetContext<{ ua: string | null }> => {
  return {
    ua: request.headers.get('user-agent'),
  }
}
