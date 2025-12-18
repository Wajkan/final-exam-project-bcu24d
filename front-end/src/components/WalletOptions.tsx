import { useState, useEffect } from 'react'
import { useConnectors } from 'wagmi'
import type { Connector } from 'wagmi'
import { connect } from '@wagmi/core'
import { wagmiConfig } from '../config/wagmi'


export function WalletOptions() {

  const connectors = useConnectors()
  
  return connectors.map((connector) => (
    <WalletOption
      key={connector.uid}
      connector={connector}
      onClick={() => connect(wagmiConfig, { connector })}
    />
  ))
  
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) {
  const [ready, setReady] = useState(false)
  
  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])
  
  return (
    <button disabled={!ready} onClick={onClick}>
      {connector.name}
    </button>
  )
}