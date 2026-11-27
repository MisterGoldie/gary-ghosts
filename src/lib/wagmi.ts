import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { walletConnectProjectId } from "./config";

const chains = [mainnet] as const;

export const wagmiConfig = createConfig({
  chains,
  // ssr: false keeps the client simple: connector state hydrates from
  // localStorage after mount, behind a mounted guard in the UI.
  ssr: false,
  connectors: [
    injected({ shimDisconnect: true }),
    coinbaseWallet({ appName: "Gary Ghost" }),
    ...(walletConnectProjectId
      ? [
          walletConnect({
            projectId: walletConnectProjectId,
            showQrModal: true,
            metadata: {
              name: "Gary Ghost",
              description: "Two collections. One ghost.",
              url: "https://garyghost.example",
              icons: [],
            },
          }),
        ]
      : []),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});

// OG minting is pinned to Ethereum mainnet.
export const targetChain = mainnet;

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
