import { useConnection, useEnsAvatar, useEnsName } from 'wagmi'
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from '../config/wagmi'

export function Connection() {
  const { address } = useConnection()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return (
    <div>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect(wagmiConfig)}>Disconnect</button>
    </div>
  )
}