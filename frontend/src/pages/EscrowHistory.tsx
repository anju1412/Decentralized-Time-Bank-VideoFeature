import { useEffect, useState } from 'react'
import { useAccount, usePublicClient } from 'wagmi'
import { CONTRACTS } from '../lib/contracts'

export default function EscrowHistory() {
  useAccount()
  const client = usePublicClient()
  const escrow = CONTRACTS.sepolia.timeEscrow as `0x${string}`

  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    let ignore = false
    async function run() {
      try {
        if (!client) return

        if (!ignore) {
          setLogs([])
        }
      } catch (e) {
        console.error(e)
      }
    }
    run()
    return () => { ignore = true }
  }, [client, escrow])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Escrow History</h2>
      <div className="card">
        {logs.length === 0 ? (
          <div className="text-neutral-400 text-sm">No events yet.</div>
        ) : (
          <div className="space-y-2">
            {logs.map((l) => (
              <div key={`${l.blockHash}-${l.transactionHash}-${l.logIndex}`} className="text-sm flex items-center justify-between gap-3">
                <div className="font-mono truncate">{l.topics[0].slice(0,10)}…</div>
                <a className="link-nav" target="_blank" href={`https://sepolia.etherscan.io/tx/${l.transactionHash}`}>View on Etherscan</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


