import { sendTransaction } from '../src/core/bridge';
import { calculateGasFee } from '../src/core/gasManager';

async function main() {
  const tx = {
    sender: '0xSenderAddress',
    receiver: '0xReceiverAddress',
    amount: 100,
    token: 'USDC',
  };

  const gasFee = await calculateGasFee({
    token: tx.token,
    network: 'optimism',
  });

  console.log('Gas fee calculado:', gasFee);

  const result = await sendTransaction({ ...tx, gasFee });
  console.log('Resultado de la transacción:', result);
}

main();
