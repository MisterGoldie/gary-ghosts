require('./load-typescript.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {encodeEventTopics,parseAbi,zeroAddress}=require('viem');
const {createMintRequest,assertExactOgCode,confirmedMintToken,OG_MAINNET_ADDRESS,OG_MINT_PRICE}=require('../src/lib/mint-target.ts');
const account='0x0000000000000000000000000000000000001234';
const other='0x0000000000000000000000000000000000005678';
const eventAbi=parseAbi(['event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)']);
const event=(overrides={})=>({address:OG_MAINNET_ADDRESS,data:'0x',topics:encodeEventTopics({abi:eventAbi,eventName:'Transfer',args:{from:zeroAddress,to:account,tokenId:42n}}),...overrides});
const receipt=(overrides={})=>({status:'success',chainId:1,to:OG_MAINNET_ADDRESS,from:account,logs:[event()],...overrides});

test('live request pins the real OG contract, mainnet, GhostMint, signer and exact price',()=>{
 const request=createMintRequest(account,OG_MINT_PRICE);
 assert.equal(request.address,OG_MAINNET_ADDRESS);assert.equal(request.chainId,1);assert.equal(request.functionName,'GhostMint');assert.equal(request.value,50000000000000000n);assert.equal(request.account,account);
});
test('zero, underpayment and overpayment are rejected',()=>{
 for(const value of [0n,OG_MINT_PRICE-1n,OG_MINT_PRICE+1n])assert.throws(()=>createMintRequest(account,value));
});
test('zero or invalid signer is rejected',()=>{
 for(const value of [zeroAddress,'not-an-address'])assert.throws(()=>createMintRequest(value,OG_MINT_PRICE));
});
test('empty or different contract code blocks minting',()=>{
 for(const code of [undefined,'0x','0x60006000'])assert.throws(()=>assertExactOgCode(code));
});
test('a successful mint requires its NFT Transfer event',()=>{
 assert.equal(confirmedMintToken(receipt(),account),42n);assert.equal(confirmedMintToken(receipt({logs:[]}),account),undefined);
});
test('reverted or wrong-network transactions cannot show success',()=>{
 for(const overrides of [{status:'reverted'},{chainId:11155111}])assert.equal(confirmedMintToken(receipt(overrides),account),undefined);
});
test('unrelated contract logs and ordinary NFT transfers cannot confirm a mint',()=>{
 assert.equal(confirmedMintToken(receipt({logs:[event({address:other})]}),account),undefined);
 const topics=encodeEventTopics({abi:eventAbi,eventName:'Transfer',args:{from:other,to:account,tokenId:42n}});assert.equal(confirmedMintToken(receipt({logs:[event({topics})]}),account),undefined);
});
test('a mint to a different recipient cannot show success',()=>{
 const topics=encodeEventTopics({abi:eventAbi,eventName:'Transfer',args:{from:zeroAddress,to:other,tokenId:42n}});assert.equal(confirmedMintToken(receipt({logs:[event({topics})]}),account),undefined);
});
test('malformed or duplicate mint events cannot show success',()=>{
 assert.equal(confirmedMintToken(receipt({logs:[event(),event()]}),account),undefined);assert.equal(confirmedMintToken(receipt({logs:[event({topics:[],data:'0xbad0'})]}),account),undefined);
});
test('security headers prevent framing, MIME sniffing and base-tag replacement',async()=>{
 const config=require('../next.config.ts').default;const groups=await config.headers();const headers=Object.fromEntries(groups[0].headers.map(h=>[h.key,h.value]));
 assert.equal(headers['X-Frame-Options'],'DENY');assert.equal(headers['X-Content-Type-Options'],'nosniff');assert.match(headers['Content-Security-Policy'],/frame-ancestors 'none'/);assert.match(headers['Content-Security-Policy'],/base-uri 'self'/);
});

test('smart-wallet entry points can confirm the matching NFT mint event',()=>{
 assert.equal(confirmedMintToken(receipt({from:other,to:other}),account),42n);
});
