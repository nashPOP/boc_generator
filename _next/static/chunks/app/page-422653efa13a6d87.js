(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{5024:()=>{},6302:(e,t,s)=>{Promise.resolve().then(s.bind(s,8212))},8212:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>o});var l=s(7437),a=s(2265),n=s(8287),r=s(8665),c=s(1652);function o(){let[e,t]=(0,a.useState)(""),[s,o]=(0,a.useState)(!1),[i,d]=(0,a.useState)(null),[b,h]=(0,a.useState)(null),m=async()=>{try{h(null);let t=new r.TonClient({endpoint:s?"https://testnet.toncenter.com/api/v2/jsonRPC":"https://toncenter.com/api/v2/jsonRPC"}),l=e.trim().split(" ");if(24!==l.length)throw Error("請確認助記詞格式是否正確（需要24個詞）");let a=await (0,n.mnemonicToPrivateKey)(l),o={mnemonics:l,keyPair:a,contract:t.open(r.WalletContractV5R1.create({workchain:0,publicKey:a.publicKey,walletId:{networkGlobalId:s?-3:-239}}))},i=(0,r.internal)({to:o.contract.address,value:BigInt(1),bounce:!0}),b={type:"sendMsg",mode:r.SendMode.PAY_GAS_SEPARATELY+r.SendMode.IGNORE_ERRORS,outMsg:i},m=await (async()=>{let e=(0,r.beginCell)().storeUint(0x7369676e,32).store((0,c.storeWalletIdV5R1)(o.contract.walletId)).storeUint(0xffffffff,32).storeUint(await o.contract.getSeqno(),32).store(e=>{e.storeMaybeRef((0,r.beginCell)().store((0,r.storeOutList)([b])).endCell()),e.storeBit(!1)});return{builder:e,cell:e.endCell()}})(),u=(0,r.beginCell)().storeBuilder(m.builder).storeBuffer((0,n.sign)(m.cell.hash(),o.keyPair.secretKey)).endCell(),x=(0,r.external)({to:o.contract.address,body:u}),f=(0,r.beginCell)().store((0,r.storeMessage)(x)).endCell();d({address:o.contract.address.toString(),boc:f.toBoc().toString("base64")})}catch(e){h(e instanceof Error?e.message:"An unknown error occurred")}};return(0,l.jsxs)("main",{className:"p-8 max-w-2xl mx-auto",children:[(0,l.jsx)("h1",{className:"text-2xl font-bold mb-6",children:"TON BOC 產生器"}),(0,l.jsxs)("div",{className:"space-y-4",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("label",{className:"block mb-2",children:"請輸入24個助記詞（以空格分隔）："}),(0,l.jsx)("textarea",{className:"w-full p-2 border rounded bg-white text-black",rows:3,value:e,onChange:e=>t(e.target.value)})]}),(0,l.jsx)("div",{children:(0,l.jsxs)("label",{className:"flex items-center",children:[(0,l.jsx)("input",{type:"checkbox",checked:s,onChange:e=>o(e.target.checked),className:"mr-2 bg-white text-black"}),"使用測試網"]})}),(0,l.jsx)("button",{onClick:m,className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600",children:"產生 BOC"}),b&&(0,l.jsxs)("div",{className:"text-red-500 mt-4",children:["錯誤：",b]}),i&&(0,l.jsxs)("div",{className:"mt-4 p-4 bg-white text-black rounded border",children:[(0,l.jsx)("h2",{className:"font-bold mb-2",children:"結果："}),(0,l.jsxs)("div",{className:"mb-2",children:[(0,l.jsx)("div",{className:"font-semibold",children:"地址："}),(0,l.jsx)("div",{className:"break-all",children:i.address})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"font-semibold",children:"BOC："}),(0,l.jsx)("div",{className:"break-all",children:i.boc})]})]})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[665,130,215,744],()=>t(6302)),_N_E=e.O()}]);