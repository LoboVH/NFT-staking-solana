import { createContext, useContext } from "react"
import {
  Program,
  AnchorProvider,
  Idl,
  setProvider,
} from "@project-serum/anchor"
import { NftStaking, IDL } from "../utils/anchor_nft_staking"
import { Connection } from "@solana/web3.js"
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react"
import MockWallet from "./MockWallet"
import { PROGRAM_ID } from "../utils/constants"

const WorkspaceContext = createContext({})
const programId = PROGRAM_ID

interface Workspace {
  connection?: Connection
  provider?: AnchorProvider
  program?: Program<NftStaking>
}

const WorkspaceProvider = ({ children }: any) => {
  const wallet = useAnchorWallet() || MockWallet
  const { connection } = useConnection()

  const provider = new AnchorProvider(connection, wallet, {})
  setProvider(provider)

  const program = new Program(IDL as Idl, programId)
  const workspace = {
    connection,
    provider,
    program,
  }

  return (
    <WorkspaceContext.Provider value={workspace}>
      {children}
    </WorkspaceContext.Provider>
  )
}

const useWorkspace = (): Workspace => {
  return useContext(WorkspaceContext)
}

export { WorkspaceProvider, useWorkspace }
