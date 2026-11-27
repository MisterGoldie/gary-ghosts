import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import { chainId, walletConnectProjectId } from "./config";

const chains = [mainnet, sepolia] as const;

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
    [sepolia.id]: http(),
  },
});

export const targetChain = chains.find((c) => c.id === chainId) ?? mainnet;

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
