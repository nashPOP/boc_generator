"use client";

import { useState } from 'react';
import { mnemonicToPrivateKey, sign } from '@ton/crypto';
import {
    beginCell,
    Builder,
    external,
    internal,
    OutActionSendMsg,
    SendMode,
    storeMessage,
    storeOutList,
    TonClient,
    WalletContractV5R1,
} from '@ton/ton';
import { storeWalletIdV5R1 } from '@ton/ton/dist/wallets/WalletContractV5R1';

function storeW5Action(action: OutActionSendMsg) {
    return (builder: Builder) => {
        builder.storeMaybeRef(
            beginCell().store(storeOutList([action])).endCell()
        );
        builder.storeBit(false);
    }
}

export default function Home() {
    const [mnemonic, setMnemonic] = useState('');
    const [isTestnet, setIsTestnet] = useState(false);
    const [result, setResult] = useState<{ address: string; boc: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const generateBoc = async () => {
        try {
            setError(null);
            const client = new TonClient({ 
                endpoint: isTestnet 
                    ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
                    : 'https://toncenter.com/api/v2/jsonRPC'
            });

            const mnemonicArray = mnemonic.trim().split(' ');
            if (mnemonicArray.length !== 24) {
                throw new Error("請確認助記詞格式是否正確（需要24個詞）");
            }

            const keyPair = await mnemonicToPrivateKey(mnemonicArray);
            const wallet = {
                mnemonics: mnemonicArray,
                keyPair: keyPair,
                contract: client.open(
                    WalletContractV5R1.create({
                        workchain: 0,
                        publicKey: keyPair.publicKey,
                        walletId: { networkGlobalId: isTestnet ? -3 : -239 },
                    })
                ),
            };

            const intMsg = internal({
                to: wallet.contract.address,
                value: 1n,
                bounce: true,
            });

            const w5Action = {
                type: 'sendMsg',
                mode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS,
                outMsg: intMsg
            };

            const signedMsg = await (async () => {
                const msg = beginCell()
                    .storeUint(0x7369676E, 32)
                    .store(storeWalletIdV5R1(wallet.contract.walletId))
                    .storeUint(0xffffffff, 32)
                    .storeUint(await wallet.contract.getSeqno(), 32)
                    .store(storeW5Action(w5Action as OutActionSendMsg));
                return { builder: msg, cell: msg.endCell() };
            })();

            const extMsgBody = beginCell()
                .storeBuilder(signedMsg.builder)
                .storeBuffer(sign(signedMsg.cell.hash(), wallet.keyPair.secretKey))
                .endCell();

            const extMsg = external({
                to: wallet.contract.address,
                body: extMsgBody,
            });

            const boc = beginCell().store(storeMessage(extMsg)).endCell();

            setResult({
                address: wallet.contract.address.toString(),
                boc: boc.toBoc().toString('base64'),
            });

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <main className="p-8 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">TON BOC 產生器</h1>
            
            <div className="space-y-4">
                <div>
                    <label className="block mb-2">
                        請輸入24個助記詞（以空格分隔）：
                    </label>
                    <textarea
                        className="w-full p-2 border rounded bg-white text-black"
                        rows={3}
                        value={mnemonic}
                        onChange={(e) => setMnemonic(e.target.value)}
                    />
                </div>

                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isTestnet}
                            onChange={(e) => setIsTestnet(e.target.checked)}
                            className="mr-2 bg-white text-black"
                        />
                        使用測試網
                    </label>
                </div>

                <button
                    onClick={generateBoc}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    產生 BOC
                </button>

                {error && (
                    <div className="text-red-500 mt-4">
                        錯誤：{error}
                    </div>
                )}

                {result && (
                    <div className="mt-4 p-4 bg-white text-black rounded border">
                        <h2 className="font-bold mb-2">結果：</h2>
                        <div className="mb-2">
                            <div className="font-semibold">地址：</div>
                            <div className="break-all">{result.address}</div>
                        </div>
                        <div>
                            <div className="font-semibold">BOC：</div>
                            <div className="break-all">{result.boc}</div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
